"use client"

import React, { useEffect } from "react"
import { createQuizFn } from "@/api/quizApi"
import { IQuizResponse } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { pickBy } from "lodash"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { TypeOf, object, string, z } from "zod"

import Question from "@/components/Question"

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
  const queryClient = useQueryClient()
  const { isLoading, mutate: createQuiz } = useMutation(
    (formData: FormData) => createQuizFn(formData),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["quizzes"])
        toast.success("Quiz created successfully")
      },
      onError: (error: any) => {
        if (Array.isArray(error.response.data.error)) {
          error.data.error.forEach((el: any) =>
            toast.error(el.message, {
              position: "top-right",
            })
          )
        } else {
          toast.error(error.response.data.message, {
            position: "top-right",
          })
        }
      },
    }
  )

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
    <form onSubmit={methods.handleSubmit(onSubmit)}>
      <label htmlFor="coverImage">Cover Image</label>
      <br />
      <input
        {...methods.register("coverImage", { required: true })}
        type="file"
      />
      <br />
      <label htmlFor="title">Title</label>
      <br />
      <input type="text" {...methods.register(`title`)} />
      <br />
      <label htmlFor="category">Category</label>
      <br />
      <input type="text" {...methods.register(`category`)} />
      <br />
      <label htmlFor="description">Description</label>
      <br />
      <input type="text" {...methods.register(`description`)} />
      <hr />
      <Question {...{ control, register, getValues, setValue }} />
      <input type="submit" />
    </form>
  )
}
