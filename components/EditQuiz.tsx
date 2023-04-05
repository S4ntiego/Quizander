"use client"

import React, { useEffect, useState, useTransition } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Question as Qs, Quiz } from "@prisma/client"
import { FormProvider, useForm } from "react-hook-form"
import { TypeOf, object, string, z } from "zod"

import { cn } from "@/lib/utils"
import Question from "@/components/Question"
import CategorySelect from "./CategorySelect"
import { Icons } from "./Icons"
import { Button, buttonVariants } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { toast } from "./ui/toast"

const AnswerObject = z.object({
  answer: z.string().min(1, "Answer is required."),
  isCorrect: z.boolean(),
})

const QuestionObject = z.object({
  question: z.string().min(1, "Question is required."),
  answers: z.array(AnswerObject).nonempty("At least one answer is required."),
})

const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
]

const updateQuizSchema = object({
  coverImage: z.optional(
    z
      .any()
      .refine((files) => files?.[0]?.size <= 5000000, `Max file size is 5MB.`)
      .refine(
        (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
        ".jpg, .jpeg, .png and .webp files are accepted."
      )
      .or(z.string())
  ),
  title: string().min(1, "Title is required"),
  description: string().min(1, "Description is required"),
  category: z
    .number()
    .min(1, "Please select a category from the dropdown list")
    .or(z.string().min(1, "Please select a category from the dropdown list")),
  questions: z.array(QuestionObject),
  lowScore: string().min(1, "Low quiz score result description is required"),
  mediumScore: string().min(
    1,
    "Medium quiz score result description is required"
  ),
  highScore: string().min(1, "High quiz score result description is required"),
}).partial()

type UpdateQuizForm = TypeOf<typeof updateQuizSchema>

interface Category {
  id: number
  name: string
}

interface QuizWithQuestions extends Quiz {
  questions: Qs[]
}

interface QuizEditorProps {
  quiz: QuizWithQuestions
  categories: Category[]
}

export default function QuizEditor({ quiz, categories }) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [isFetching, setIsFetching] = useState(false)
  const [selectedFile, setSelectedFile] = useState()
  const [preview, setPreview] = useState<string | undefined>()

  async function updateQuiz(quizId: number, formData: FormData) {
    setIsFetching(true)
    const response = await fetch(`/api/quiz/${quizId}`, {
      method: "PATCH",
      body: formData,
    })

    if (!response?.ok) {
      toast({
        title: "Something went wrong.",
        message: "Quiz could not be edited. Please try again.",
        type: "error",
      })
    }

    toast({
      title: "Quiz edited successfully",
      message: "Your quiz has been edited successfully.",
      type: "success",
    })

    startTransition(() => {
      setIsFetching(false)
      router.refresh()
    })
  }

  //object returned will have the same shape as UpdateQuizForm
  const methods = useForm<UpdateQuizForm>({
    resolver: zodResolver(updateQuizSchema),
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

    updateQuiz(quiz.id, formData)
  }

  console.log(quiz.categoryId)

  useEffect(() => {
    console.log(quiz.coverImage)
    if (quiz) {
      methods.reset({
        title: quiz.title,
        category: quiz.categoryId,
        description: quiz.description,
        questions: quiz.questions,
        coverImage: quiz.coverImage,
        lowScore: quiz.lowScore,
        mediumScore: quiz.mediumScore,
        highScore: quiz.highScore,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quiz])

  useEffect(() => {
    if (!selectedFile) {
      setPreview(quiz.coverImage)
      return
    }

    const objectUrl = URL.createObjectURL(selectedFile)
    setPreview(objectUrl)

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl)
  }, [selectedFile, quiz.coverImage])

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined)
      return
    }

    setSelectedFile(e.target.files[0])
  }

  return (
    <FormProvider {...methods}>
      <form className="grid gap-2" onSubmit={methods.handleSubmit(onSubmit)}>
        <Label htmlFor="coverImage">Cover Image</Label>
        <div className="grid w-full items-center gap-1.5">
          <Label
            htmlFor="coverImage"
            className={cn(
              "flex cursor-pointer relative items-center justify-center w-[320px] h-[320px] border border-slate-300 dark:border-slate-600 border-dashed overflow-hidden rounded-md hover:border-none  hover:ring-slate-300 hover:ring-2 dark:hover:border-none dark:hover:ring-slate-600",
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
            {preview && (
              <div className="h-full w-full group relative">
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
            placeholder="title"
            type="text"
            {...methods.register(`title`)}
          />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="description">Description</Label>
          <Input type="text" {...methods.register(`description`)} />
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
            <span>Update Quiz</span>
          </span>
        </Button>
      </form>
    </FormProvider>
  )
}
