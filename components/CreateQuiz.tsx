"use client"

import React, { useEffect, useState, useTransition } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { IQuizResponse } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormProvider, useForm } from "react-hook-form"
import { TypeOf, object, string, z } from "zod"

import { cn } from "@/lib/utils"
import CategorySelect from "@/components/CategorySelect"
import { Icons } from "@/components/Icons"
import Question from "@/components/Question"
import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/toast"

interface ICreateQuizProp {
  quiz: IQuizResponse
}

const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
]

const AnswerObject = z.object({
  answer: z.string().min(1, "Answer is required."),
  isCorrect: z.boolean(),
})

const QuestionObject = z.object({
  question: z.string().min(1, "Question is required."),
  answers: z.array(AnswerObject).nonempty("At least one answer is required."),
})

const createQuizSchema = object({
  coverImage: z
    .any()
    .refine((files) => files?.length == 1, "Image is required.")
    .refine((files) => files?.[0]?.size <= 5000000, `Max file size is 5MB.`)
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      ".jpg, .jpeg, .png and .webp files are accepted."
    ),
  title: string().min(1, "Title is required"),
  description: string().min(1, "Description is required"),
  category: z
    .string()
    .min(1, "Please select a category from the dropdown list"),
  questions: z.array(QuestionObject),
  lowScore: string().min(1, "Low quiz score result description is required"),
  mediumScore: string().min(
    1,
    "Medium quiz score result description is required"
  ),
  highScore: string().min(1, "High quiz score result description is required"),
})

type ICreateQuiz = TypeOf<typeof createQuizSchema>

const defaultValues = {
  title: "test",
  description: "test",
  questions: [
    {
      question: "test",
      answers: [
        { answer: "true", isCorrect: true },
        { answer: "false", isCorrect: false },
        { answer: "false", isCorrect: false },
        { answer: "false", isCorrect: false },
      ],
    },
  ],
}

interface CategoryProps {
  id: number
  name: string
}

interface QuizzesFormProps {
  categories: CategoryProps[]
}

export default function QuizzesForm({ categories }: QuizzesFormProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [isFetching, setIsFetching] = useState(false)
  const [selectedFile, setSelectedFile] = useState()
  const [preview, setPreview] = useState<string | undefined>()

  async function createQuiz(formData: FormData) {
    setIsFetching(true)
    const response = await fetch(`/api/quiz/upload-quiz`, {
      method: "POST",
      body: formData,
    })

    if (!response?.ok && response.status !== 504) {
      toast({
        title: "Something went wrong.",
        message: "Your quiz was not created. Please try again.",
        type: "error",
      })
    } else {
      toast({
        title: "Quiz uploaded successfully",
        message: "Your quiz has been created successfully.",
        type: "success",
      })
    }

    startTransition(() => {
      setIsFetching(false)
      router.refresh()
    })
  }

  const methods = useForm<ICreateQuiz>({
    defaultValues: defaultValues,
    resolver: zodResolver(createQuizSchema),
  })

  const {
    register,
    control,
    getValues,
    setValue,
    formState: { errors },
  } = methods

  const onSubmit = (values: any) => {
    const formData = new FormData()
    const filteredFormData = values
    const { coverImage, ...quizBody } = filteredFormData
    if (typeof coverImage === "object") {
      formData.append("coverImage", filteredFormData.coverImage[0])
    }
    for (let [key, val] of Object.entries(quizBody)) {
      // append each item to the formData (converted to JSON strings)
      formData.append(key, JSON.stringify(val))
    }
    createQuiz(formData)
  }

  // create a preview as a side effect, whenever selected file is changed
  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined)
      return
    }

    const objectUrl = URL.createObjectURL(selectedFile)
    setPreview(objectUrl)

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl)
  }, [selectedFile])

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined)
      return
    }

    setSelectedFile(e.target.files[0])
  }

  return (
    <div className="flex flex-col">
      <div className="w-full rounded-md text-center flex items-center justify-center border-[0.25px] p-1 border-red-500 mb-4">
        Please note that, due to the code being open-sourced and the AWS
        restrictions, the &apos;Add quiz&apos; functionality is limited to the
        admin role as of today.
      </div>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="grid w-full gap-2 text-sm"
        >
          <Label htmlFor="coverImage">Cover Image</Label>
          <div className="grid w-full items-center gap-1.5">
            <Label
              htmlFor="coverImage"
              className={cn(
                "flex cursor-pointer relative items-center justify-center w-[320px] h-[320px] border border-slate-300 dark:border-dark-400 border-dashed overflow-hidden rounded-md hover:border-none  hover:ring-slate-300 hover:ring-2 dark:hover:border-none dark:hover:ring-slate-600",
                preview && "border-solid"
              )}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
                <div
                  className={cn(
                    "flex flex-col items-center justify-center gap-2",
                    preview && "border-none"
                  )}
                >
                  <Icons.addImage className="w-8 h-8" />
                  <span
                    className={cn(
                      buttonVariants({ variant: "default", size: "sm" }),
                      "text-xs mt-2"
                    )}
                  >
                    <Icons.add className="h-4 w-4 mr-1" />
                    Add image
                  </span>
                </div>
              </div>
              {selectedFile && preview && (
                <div className="h-full w-full group">
                  <div className="absolute flex-col h-full w-full flex items-center justify-center opacity-0 hover:opacity-100 z-40">
                    <Icons.fileEdit className="text-slate-50 w-8 h-8" />

                    <span
                      className={cn(
                        buttonVariants({ variant: "subtle", size: "sm" }),
                        "text-xs mt-2"
                      )}
                    >
                      Edit image
                    </span>
                  </div>
                  <Image
                    priority
                    src={preview}
                    alt={"quiz cover"}
                    fill
                    className="object-cover group-hover:brightness-50 "
                  />
                </div>
              )}

              <Input
                id="coverImage"
                onInput={(e) => onSelectFile(e)}
                {...methods.register("coverImage", { required: true })}
                type="file"
                className="hidden cursor-pointer top-1/2 left-1/2 border-none h-full w-full"
              />
            </Label>
            {errors.coverImage && (
              <p className="mb-3 text-red-600 dark:text-red-400">
                {errors.coverImage?.message?.toString()}
              </p>
            )}
          </div>

          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Title"
              type="text"
              {...methods.register(`title`)}
            />
            {errors.title && (
              <p className="mb-3 text-red-600 dark:text-red-400">
                {errors.title?.message}
              </p>
            )}
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="description">Description</Label>
            <Input
              placeholder="Description"
              id="description"
              type="text"
              {...methods.register(`description`)}
            />
            {errors.description && (
              <p className="mb-3 text-red-600 dark:text-red-400">
                {errors.description?.message}
              </p>
            )}
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="category">Quiz Category</Label>
            <CategorySelect
              categories={categories}
              name="category"
              id="category"
            />
            {errors.category && (
              <p className="mb-3 text-red-600 dark:text-red-400">
                {errors.category?.message}
              </p>
            )}
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="lowScore">Low Score Description</Label>
            <Input
              placeholder="Low Score"
              id="lowScore"
              type="text"
              {...methods.register(`lowScore`)}
            />
            {errors.lowScore && (
              <p className="mb-3 text-red-600 dark:text-red-400">
                {errors.lowScore?.message}
              </p>
            )}
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="mediumScore">Medium Score Description</Label>
            <Input
              placeholder="Medium Score"
              id="mediumScore"
              type="text"
              {...methods.register(`mediumScore`)}
            />
            {errors.mediumScore && (
              <p className="mb-3 text-red-600 dark:text-red-400">
                {errors.mediumScore?.message}
              </p>
            )}
          </div>

          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="highScore">High Score Description</Label>
            <Input
              placeholder="High Score"
              id="highScore"
              type="text"
              {...methods.register(`highScore`)}
            />
            {errors.highScore && (
              <p className="mb-3 text-red-600 dark:text-red-400">
                {errors.highScore?.message}
              </p>
            )}
          </div>
          <Question {...{ control, register, getValues, setValue }} />
          <Button type="submit">
            <span className="flex flex-row justify-center items-center">
              {isFetching ? (
                <Icons.spinner className="h-4 w-4 animate-spin" />
              ) : null}
              <span>Add Quiz</span>
            </span>
          </Button>
        </form>
      </FormProvider>
    </div>
  )
}
