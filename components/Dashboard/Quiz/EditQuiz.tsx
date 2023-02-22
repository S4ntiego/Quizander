"use client"

import React, { useEffect } from "react"
import Image from "next/image"
import { updateQuizFn } from "@/api/quizApi"
import { IQuizResponse } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { pickBy } from "lodash"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { TypeOf, object, string, z } from "zod"

import Question from "@/components/Question"

interface IUpdateQuizProp {
  quiz: IQuizResponse
}

const updateQuizSchema = object({
  coverImage: z.any(),
  title: string().min(1, "Title is required"),
  description: string().min(1, "Description is required"),
  category: string().min(1, "Category is required"),
  questions: z.any(),
}).partial()

type IUpdateQuiz = TypeOf<typeof updateQuizSchema>

export default function QuizzesForm({ quiz }) {
  const queryClient = useQueryClient()
  const { isLoading, mutate: updateQuiz } = useMutation(
    ({ id, formData }: { id: string; formData: FormData }) =>
      updateQuizFn(id, formData),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["quizzes"])
        toast.success("Quiz updated successfully")
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

  const methods = useForm<IUpdateQuiz>({
    resolver: zodResolver(updateQuizSchema),
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

    updateQuiz({ id: quiz?._id!, formData })
  }

  useEffect(() => {
    if (quiz) {
      methods.reset({
        title: quiz.title,
        category: quiz.category,
        description: quiz.description,
        questions: quiz.questions,
        coverImage: quiz.coverImage,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quiz])

  return (
    <form onSubmit={methods.handleSubmit(onSubmit)}>
      <Image
        src={quiz?.coverImage}
        alt={quiz?.title}
        width={402}
        height={226}
        className="rounded-md border border-slate-200 bg-slate-200 transition-colors group-hover:border-slate-900"
      />
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
