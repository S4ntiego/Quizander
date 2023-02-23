import React, { cache } from "react"
import Link from "next/link"
import { redirect } from "next/navigation"

import prisma from "@/lib/prisma"
import { getCurrentUser } from "@/lib/session"
import { cn } from "@/lib/utils"
import { DashboardShell } from "@/components/Dashboard/DashboardContainer"
import { DashboardHeader } from "@/components/Dashboard/DashboardHeader"
import { DashboardQuizItem } from "@/components/Dashboard/DashboardQuizItem"
import { EmptyPlaceholder } from "@/components/Dashboard/EmptyPlaceholder"
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

  for (const quiz of quizzes) {
    quiz.coverImage = "https://d16toh0t29dtt4.cloudfront.net/" + quiz.coverImage
  }

  return quizzes
})

export default async function DashboardPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/login")
  }

  const quizzes = await getQuizzes()

  return (
    <DashboardShell>
      <DashboardHeader heading="Quizzes" text="Create and manage quizzes.">
        <Link
          className={cn(buttonVariants({ variant: "default" }))}
          href="/dashboard/editor"
        >
          Add quiz
        </Link>
      </DashboardHeader>
      <div>
        {quizzes?.length ? (
          <div className="grid grid-cols-3 gap-2">
            {quizzes.map((quiz) => (
              <DashboardQuizItem key={quiz.id} quiz={quiz} />
            ))}
          </div>
        ) : (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon name="post" />
            <EmptyPlaceholder.Title>No quizzes created</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              You don&apos;t have any quizzes yet. Click below to add quiz.
            </EmptyPlaceholder.Description>
            <Link
              className={cn(buttonVariants({ variant: "default" }))}
              href="/dashboard/editor"
            >
              Add quiz
            </Link>
          </EmptyPlaceholder>
        )}
      </div>
    </DashboardShell>
  )
}
