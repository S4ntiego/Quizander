import { Suspense } from "react"

import prisma from "@/lib/prisma"
import { getCurrentUser } from "@/lib/session"
import { Quiz } from "@/components/Quiz"

async function getQuiz(quizId) {
  const quiz = await prisma.quiz.findUnique({
    where: { id: parseInt(quizId) },
    include: {
      questions: {
        select: {
          question: true,
          answers: { select: { answer: true, isCorrect: true } },
        },
      },
    },
  })

  return JSON.parse(JSON.stringify(quiz))
}

interface QuizPageProps {
  params: { id: number }
}

export default async function QuizPage({ params }: QuizPageProps) {
  const quiz = await getQuiz(params.id)
  const user = await getCurrentUser()

  return <Quiz quiz={quiz} user={user} />
}
