"use client"

import Image from "next/image"
import Link from "next/link"
import { deleteQuizFn, getAllQuizzesFn } from "@/api/quizApi"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-toastify"

interface Quiz {
  _id: string
  title: string
  description: string
  category: string
  questions?: []
  coverImage: string
  createdBy: string
  createdAt: string
  updatedAt: string
}

export default function Quizzes() {
  const queryClient = useQueryClient()
  const { isLoading, data: quizzes } = useQuery(
    ["quizzes"],
    () => getAllQuizzesFn(),
    {
      select: (data) => data.data.quizzes,
      onError: (error) => {
        if (Array.isArray((error as any).data.error)) {
          ;(error as any).data.error.forEach((el: any) =>
            toast.error(el.message, {
              position: "top-right",
            })
          )
        } else {
          toast.error((error as any).data.message, {
            position: "top-right",
          })
        }
      },
    }
  )

  const { mutate: deleteQuiz } = useMutation(
    (_id: string) => deleteQuizFn(_id),
    {
      onSuccess(data) {
        //invalidate the "quizzes" query in the cache. This means that the next time the "quizzes" query is run, it will refetch the data from the server instead of returning the cached data
        queryClient.invalidateQueries(["quizzes"])
        toast.success("Quiz deleted successfully")
      },
      onError(error: any) {
        console.log(error.response.data.message)
        if (Array.isArray((error as any).response.data.error)) {
          ;(error as any).response.data.error.forEach((el: any) =>
            toast.error(el.message, {
              position: "top-right",
            })
          )
        } else {
          toast.error((error as any).response.data.message, {
            position: "top-right",
          })
        }
      },
    }
  )

  const onDeleteHandler = (_id: string) => {
    if (window.confirm("Are you sure?")) {
      deleteQuiz(_id)
    }
  }

  return (
    <div className="">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="flex-1 space-y-4">
          <h1 className="font-playfair font-black tracking-tight inline-block text-4xl text-slate-900 lg:text-5xl">
            Quizzes
          </h1>
        </div>
      </div>
      <hr className="my-8 border-slate-200" />
      {quizzes?.length ? (
        <div className="grid gap-10 sm:grid-cols-3">
          {quizzes.map((quiz, index) => (
            <article
              key={quiz._id}
              className="group relative flex flex-col space-y-2"
            >
              {quiz.coverImage && (
                <div className="relative">
                  <Image
                    src={quiz.coverImage}
                    alt={quiz.title}
                    width={804}
                    height={452}
                    className="rounded-md border border-slate-200 bg-slate-200 transition-colors group-hover:border-slate-900"
                    priority={index <= 1}
                  />
                  <div className="absolute bottom-0 w-full items-center justify-center grid grid-cols-2">
                    <button className="bg-slate-200 text-center ml-1 mb-1 mr-0.5 py-2 text-slate-900 rounded-md border">
                      <Link href={`/dashboard/editQuiz/${quiz._id}`}>
                        Edit
                        <span className="sr-only">Play Quiz</span>
                      </Link>
                    </button>
                    <button
                      onClick={() => onDeleteHandler(quiz._id)}
                      className="bg-slate-300 text-center py-2 ml-0.5 mr-1 mb-1 text-slate-900 rounded-md border"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}

              <h2 className="text-2xl font-playfair font-extrabold">
                {quiz.title}
              </h2>
              {quiz.description && (
                <p className="text-slate-600">{quiz.description}</p>
              )}
            </article>
          ))}
        </div>
      ) : (
        <p>No quizzes published.</p>
      )}
    </div>
  )
}
