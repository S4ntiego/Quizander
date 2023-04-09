import * as React from "react"
import { redirect } from "next/navigation"

import prisma from "@/lib/prisma"
import { getCurrentUser } from "@/lib/session"
import { Card } from "@/components/Card"
import { Scoreboard } from "./Dashboard/Scoreboard"

async function getScoreboard(user) {
  const scoreboard = await prisma.quizCategory.findMany({
    include: {
      quizzes: {
        where: {
          quizScores: {
            some: { userId: user },
          },
        },

        include: {
          quizScores: {
            where: {
              userId: user,
            },
            orderBy: { createdAt: "desc" },
          },
        },
      },
    },
  })

  return JSON.parse(JSON.stringify(scoreboard))
}

async function getAggregations(user) {
  const aggregations = await prisma.quizScore.groupBy({
    by: ["userId", "quizId"],
    where: {
      userId: user,
    },
    _count: {
      score: true,
    },
    _avg: {
      score: true,
    },
  })

  return JSON.parse(JSON.stringify(aggregations))
}

export const Scrb = async function UserNameForm2() {
  await new Promise((resolve) => setTimeout(resolve, 3000))
  const user = await getCurrentUser()

  if (!user) {
    redirect("/")
  }

  const scoreboard = await getScoreboard(user?.id)
  const aggregations = await getAggregations(user?.id)

  return (
    <Card>
      <Card.Header>
        <Card.Title>Your Name</Card.Title>
        <Card.Description>
          Please enter your full name or a display name you are comfortable
          with.
        </Card.Description>
      </Card.Header>
      <Card.Content>
        <Scoreboard scoreboard={scoreboard} aggregations={aggregations} />
      </Card.Content>
    </Card>
  )
} as unknown as () => JSX.Element
