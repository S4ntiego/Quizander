import { Suspense, cache, useMemo } from "react"

import prisma from "@/lib/prisma"
import Landing from "@/components/Landing"
import QuizList from "@/components/QuizList"

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

export default async function IndexPage() {
  const quizzes = await getQuizzes()

  return (
    <div className="h-full w-full relative">
      <Landing />
      <QuizList quizzes={quizzes} />
    </div>
  )
}
