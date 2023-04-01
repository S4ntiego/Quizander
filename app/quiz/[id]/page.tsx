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

  return (
    <Suspense
      fallback={
        <div className="container h-full max-h-[100%-20rem] grid grid-rows-12 pb-8 xs:max-w-[54rem] overflow-auto">
          <div className="grid grid-rows-[auto,1fr] row-span-4 justify-center text-center items-center xs:row-start-2">
            <span className="text-xs xs:text-base flex justify-center">
              <div className="w-12 h-4 rounded-md animate-pulse bg-slate-500"></div>
            </span>
            <span className="m-auto text-base xs:text-2xl break-words overflow-auto">
              <div className="w-96 h-16 rounded-md animate-pulse bg-slate-500"></div>
            </span>
          </div>
          <div className="grid grid-rows-4 row-span-8 gap-4 xs:mb-6 xs:row-span-6">
            <div className="w-full rounded-md h-full animate-pulse bg-slate-500"></div>
            <div className="w-full rounded-md h-full animate-pulse bg-slate-500"></div>
            <div className="w-full rounded-md h-full animate-pulse bg-slate-500"></div>
            <div className="w-full rounded-md h-full animate-pulse bg-slate-500"></div>
          </div>
        </div>
      }
    >
      <Quiz quiz={quiz} user={user} />
    </Suspense>
  )
}
