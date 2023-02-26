"use client"

import React, { useEffect, useState, useTransition } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { pickBy } from "lodash"
import { useForm } from "react-hook-form"
import { TypeOf, object, string, z } from "zod"

import Question from "@/components/Question"
import { toast } from "./ui/toast"

const updateQuizSchema = object({
  coverImage: z.any(),
  title: string().min(1, "Title is required"),
  description: string().min(1, "Description is required"),
  category: string().min(1, "Category is required"),
  questions: z.any(),
}).partial()

type UpdateQuizForm = TypeOf<typeof updateQuizSchema>

export default function QuizEditor({ quiz }) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [isFetching, setIsFetching] = useState(false)

  async function updateQuiz(quizId: string, formData: FormData) {
    try {
      setIsFetching(true)
      const response = await fetch(`/api/quiz/${quizId}`, {
        method: "PATCH",
        body: formData,
      })

      if (!response?.ok) {
        toast({
          title: "Something went wrong.",
          message: "Your post was not deleted. Please try again.",
          type: "error",
        })
      }

      startTransition(() => {
        setIsFetching(false)
        router.refresh()
      })
    } catch (err) {
      console.log(err)
    }
  }

  //object returned will have the same shape as UpdateQuizForm
  const methods = useForm<UpdateQuizForm>({
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

    updateQuiz(quiz.id, formData)
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
        src={quiz.coverImage}
        alt={quiz.title}
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
