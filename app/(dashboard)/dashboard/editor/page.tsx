"use client"

import React, { useEffect, useState, useTransition } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { IQuizResponse } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { pickBy } from "lodash"
import { useForm } from "react-hook-form"
import { TypeOf, object, string, z } from "zod"

import { cn } from "@/lib/utils"
import { Icons } from "@/components/Icons"
import Question from "@/components/Question"
import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/toast"

interface ICreateQuizProp {
  quiz: IQuizResponse
}

const createQuizSchema = object({
  coverImage: z.any(),
  title: string().min(1, "Title is required"),
  description: string().min(1, "Description is required"),
  category: string().min(1, "Category is required"),
  questions: z.any(),
}).partial()

type ICreateQuiz = TypeOf<typeof createQuizSchema>

const defaultValues = {
  coverImage: "",
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

export default function QuizzesForm() {
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

    if (!response?.ok) {
      toast({
        title: "Something went wrong.",
        message: "Your quiz was not created. Please try again.",
        type: "error",
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

  const { register, control, getValues, setValue } = methods

  const onSubmit = (values: any) => {
    const formData = new FormData()
    const filteredFormData = pickBy(
      values,
      (value) => value !== "" && value !== undefined
    )
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
    <form
      onSubmit={methods.handleSubmit(onSubmit)}
      className="grid w-full gap-2"
    >
      <Label htmlFor="coverImage">Cover Image</Label>
      <div className="grid w-full items-center gap-1.5">
        <Label
          htmlFor="coverImage"
          className={cn(
            "flex cursor-pointer relative items-center justify-center w-[402px] h-[226px] border border-slate-300 dark:border-slate-600 border-dashed overflow-hidden rounded-md hover:border-none  hover:ring-slate-300 hover:ring-2 dark:hover:border-none dark:hover:ring-slate-600",
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
      </div>

      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          placeholder="title"
          type="text"
          {...methods.register(`title`)}
        />
      </div>
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="description">Description</Label>
        <Input
          id="description"
          type="text"
          {...methods.register(`description`)}
        />
      </div>
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="category">Category</Label>
        <Input
          id="category"
          placeholder="category"
          type="text"
          {...methods.register(`category`)}
        />
      </div>

      <Question {...{ control, register, getValues, setValue }} />
      <Button type="submit">
        <span className="flex flex-row justify-center items-center">
          {isFetching ? (
            <Icons.spinner className="h-4 w-4 animate-spin" />
          ) : null}
          <span>Create quiz</span>
        </span>
      </Button>
    </form>
  )
}
