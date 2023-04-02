import React, { cache } from "react"
import Link from "next/link"

import prisma from "@/lib/prisma"
import { cn } from "@/lib/utils"

const getQuizzes = cache(async () => {
  const quizzes = await prisma.quiz.findMany({
    include: {
      category: {
        select: {
          name: true,
        },
      },
      questions: {
        select: {
          question: true,
          answers: { select: { answer: true, isCorrect: true } },
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  if (quizzes) {
    for (const quiz of quizzes) {
      quiz.coverImage =
        "https://d16toh0t29dtt4.cloudfront.net/" + quiz.coverImage
    }
  }

  return quizzes
})

const page = async () => {
  const quizzes = await getQuizzes()

  return (
    <div>
      {quizzes.map((quiz) => (
        <Link
          key={quiz.title}
          href={`/pepega/${quiz.id}`}
          className={cn(
            "mt-2 mr-2 rounded-lg px-3 py-1 text-sm font-medium bg-gray-700 text-gray-100 hover:bg-gray-500 hover:text-white"
          )}
        >
          Quiz 1
        </Link>
      ))}
      page
    </div>
  )
}

export default page
