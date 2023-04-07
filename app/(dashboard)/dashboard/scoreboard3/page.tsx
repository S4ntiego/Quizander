import { redirect } from "next/navigation"
import { User } from "@prisma/client"
import { useSession } from "next-auth/react"

import prisma from "@/lib/prisma"
import { DashboardContainer } from "@/components/Dashboard/DashboardContainer"
import { DashboardHeader } from "@/components/Dashboard/DashboardHeader"
import Scoreboard from "@/components/Dashboard/Scoreboard"

async function getScoreboard(user: User["id"]) {
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

async function getAggregations(user: User["id"]) {
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

async function getUser() {
  const session = await fetch(
    "https://quizander-dqzb.vercel.app/api/users/get-user"
  )

  return session.json()
}

export default async function ScoreboardPage() {
  const session = await getUser()
  console.log(session)

  // if (!user) {
  //   redirect("/")
  // }

  // const scoreboard = await getScoreboard(user.id)
  // const aggregations = await getAggregations(user.id)

  return (
    <DashboardContainer>
      <DashboardHeader
        heading="User Scoreboard"
        text="View your historical results."
      />
      <div className="grid gap-10">
        {/* <Scoreboard scoreboard={scoreboard} aggregations={aggregations} /> */}
      </div>
    </DashboardContainer>
  )
}