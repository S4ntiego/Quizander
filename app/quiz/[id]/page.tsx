import { cache } from "react"

import prisma from "@/lib/prisma"
import { getCurrentUser } from "@/lib/session"
import { Quiz } from "@/components/Quiz"

const getQuiz = cache(async (quizId: string) => {
  return new Promise((resolve, reject) => {
    prisma.quiz
      .findUnique({
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
      .then((quiz) => {
        resolve(JSON.parse(JSON.stringify(quiz)))
      })
      .catch((error) => {
        reject(error)
      })
  })
})

interface QuizPageProps {
  params: { id: string }
}

export default async function QuizPage({ params }: QuizPageProps) {
  const quiz = await getQuiz(params.id)
  const user = await getCurrentUser()

  return <Quiz quiz={quiz} user={user} />
}
