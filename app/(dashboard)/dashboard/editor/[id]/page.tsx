import { redirect } from "next/navigation"
import { Quiz } from "@prisma/client"

import prisma from "@/lib/prisma"
import { getCurrentUser } from "@/lib/session"
import EditQuiz from "@/components/EditQuiz"

function getQuiz(id: Quiz["id"]) {
  const quiz = prisma.quiz
    .findFirst({
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
    .then((quiz) => {
      if (quiz) {
        quiz.coverImage =
          "https://d16toh0t29dtt4.cloudfront.net/" + quiz.coverImage
      }
      return JSON.parse(JSON.stringify(quiz))
    })

  return quiz
}

function getCategories() {
  const categories = prisma.quizCategory.findMany()

  return categories
}

interface EditorPageProps {
  params: { id: string }
}

export default async function EditorPage({ params }: EditorPageProps) {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/")
  }

  const quizPromise = getQuiz(parseInt(params.id))
  const categoriesPromise = getCategories()
  const [quiz, categories] = await Promise.all([quizPromise, categoriesPromise])

  return <EditQuiz quiz={quiz} categories={categories} />
}
