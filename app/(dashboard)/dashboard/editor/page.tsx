"use client"

import React, { useState, useTransition } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { IQuizResponse } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { pickBy } from "lodash"
import { useForm } from "react-hook-form"
import { TypeOf, object, string, z } from "zod"

import { Icons } from "@/components/Icons"
import Question from "@/components/Question"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
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

  return (
    <form
      onSubmit={methods.handleSubmit(onSubmit)}
      className="grid w-full gap-4"
    >
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="coverImage">Cover Image</Label>
        <Input
          id="imgInp"
          className="flex relative h-[226px] w-[402px] shrink-0 items-center justify-center rounded-md border border-dashed border-slate-200 dark:border-slate-700"
          placeholder="Email"
          {...methods.register("coverImage", { required: true })}
          type="file"
        />
      </div>

      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="title">Title</Label>
        <Input placeholder="title" type="text" {...methods.register(`title`)} />
      </div>
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="category">Category</Label>
        <Input
          placeholder="category"
          type="text"
          {...methods.register(`category`)}
        />
      </div>
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="description">Description</Label>
        <Input type="text" {...methods.register(`description`)} />
      </div>

      <Question {...{ control, register, getValues, setValue }} />
      <Button type="submit">
        <span className="flex flex-row">
          {isFetching ? (
            <Icons.spinner className="h-4 w-4 animate-spin" />
          ) : (
            <Icons.trash className="h-4 w-4" />
          )}
          <span>Create quiz</span>
        </span>
      </Button>
    </form>
  )
}
