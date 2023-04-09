import React, { cache } from "react"
import Link from "next/link"

import prisma from "@/lib/prisma"
import { cn } from "@/lib/utils"
import { DashboardContainer } from "@/components/Dashboard/DashboardContainer"
import { DashboardHeader } from "@/components/Dashboard/DashboardHeader"
import { DashboardQuizItem } from "@/components/Dashboard/DashboardQuizItem"
import { EmptyPlaceholder } from "@/components/Dashboard/EmptyPlaceholder"
import { Icons } from "@/components/Icons"
import { buttonVariants } from "@/components/ui/button"

const getQuizzes = cache(async () => {
  const quizzes = await prisma.quiz.findMany({
    include: {
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

export default async function DashboardPage() {
  const quizzes = await getQuizzes()

  return (
    <DashboardContainer>
      <DashboardHeader heading="Quizzes" text="Create and manage quizzes.">
        <Link
          className={cn(
            buttonVariants({ variant: "default" }),
            "w-32 dark:hover:text-dark-150"
          )}
          href="/dashboard/editor"
        >
          <Icons.add className="w-4 h-4 mr-2" />
          <span>Add Quiz</span>
        </Link>
      </DashboardHeader>

      <div>
        {quizzes?.length ? (
          <div className="divide-y dark:divide-dark-400 divide-dark-200 rounded-md border dark:border-dark-400 border-dark-200">
            {quizzes.map((quiz) => (
              <DashboardQuizItem key={quiz.id} quiz={quiz} />
            ))}
          </div>
        ) : (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon name="post" />
            <EmptyPlaceholder.Title>
              There are no quizzes yet
            </EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              Click below to start creating content.
            </EmptyPlaceholder.Description>
            <Link
              className={cn(buttonVariants({ variant: "default" }))}
              href="/dashboard/editor"
            >
              <Icons.add className="w-4 h-4 mr-2 dark:text-dark-700" />
              Add Quiz
            </Link>
          </EmptyPlaceholder>
        )}
      </div>
    </DashboardContainer>
  )
}
