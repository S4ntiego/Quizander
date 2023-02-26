import { notFound, redirect } from "next/navigation"
import { Quiz } from "@prisma/client"

import prisma from "@/lib/prisma"
import { getCurrentUser } from "@/lib/session"
import EditQuiz from "@/components/EditQuiz"

async function getQuiz(id: Quiz["id"]) {
  const quiz = await prisma.quiz.findFirst({
    where: {
      id: id,
    },
    include: {
      questions: {
        select: {
          question: true,
          answers: { select: { answer: true, isCorrect: true } },
        },
      },
    },
  })

  quiz.coverImage = "https://d16toh0t29dtt4.cloudfront.net/" + quiz.coverImage

  return JSON.parse(JSON.stringify(quiz))
}

interface EditorPageProps {
  params: { id: string }
}

export default async function EditorPage({ params }: EditorPageProps) {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/login")
  }

  const quiz = await getQuiz(params.id)

  if (!quiz) {
    notFound()
  }

  return <EditQuiz quiz={quiz} />
}
