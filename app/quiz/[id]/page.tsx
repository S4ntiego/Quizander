import { cache } from "react"

import prisma from "@/lib/prisma"
import { Quiz } from "@/components/Quiz"

const getQuiz = cache(async (quizId: string) => {
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
})

interface QuizPageProps {
  params: { id: string }
}

export default async function QuizPage({ params }: QuizPageProps) {
  const quiz = await getQuiz(params.id)

  return <Quiz quiz={quiz} />
}
