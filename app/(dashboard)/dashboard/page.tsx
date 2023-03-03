import React, { cache } from "react"
import Link from "next/link"
import { redirect } from "next/navigation"

import prisma from "@/lib/prisma"
import { getCurrentUser } from "@/lib/session"
import { cn } from "@/lib/utils"
import { DashboardContainer } from "@/components/Dashboard/DashboardContainer"
import { DashboardHeader } from "@/components/Dashboard/DashboardHeader"
import { DashboardQuizItem } from "@/components/Dashboard/DashboardQuizItem"
import { EmptyPlaceholder } from "@/components/Dashboard/EmptyPlaceholder"
import { Icons } from "@/components/Icons"
import { buttonVariants } from "@/components/ui/button"

async function getQuizzes() {
  const response = await fetch(`/api/quiz/get-quizzes`, {
    next: { revalidate: 60 },
    method: "GET",
  })

  const quizzes = await response.json()

  if (quizzes) {
    for (const quiz of quizzes) {
      quiz.coverImage =
        "https://d16toh0t29dtt4.cloudfront.net/" + quiz.coverImage
    }
  }

  return quizzes
}

export default async function DashboardPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/login")
  }

  const quizzes = await getQuizzes()

  return (
    <DashboardContainer>
      <DashboardHeader heading="Quizzes" text="Create and manage quizzes.">
        <Link
          className={cn(buttonVariants({ variant: "default" }))}
          href="/dashboard/editor"
        >
          <Icons.add className="w-4 h-4 mr-2" />
          Create Quiz
        </Link>
      </DashboardHeader>
      <div>
        {quizzes?.length ? (
          <div className="divide-y dark:divide-slate-600 divide-neutral-200 rounded-md border dark:border-slate-600 border-slate-200">
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
              <Icons.add className="w-4 h-4 mr-2" />
              Create Quiz
            </Link>
          </EmptyPlaceholder>
        )}
      </div>
    </DashboardContainer>
  )
}

export const revalidate = 60
