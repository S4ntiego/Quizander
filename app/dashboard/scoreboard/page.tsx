import { redirect } from "next/navigation"
import { User } from "@prisma/client"

import prisma from "@/lib/prisma"
import { getCurrentUser } from "@/lib/session"
import { DashboardContainer } from "@/components/Dashboard/DashboardContainer"
import { DashboardHeader } from "@/components/Dashboard/DashboardHeader"
import ScoreboardContainer from "@/components/Dashboard/ScoreboardContainer"

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

export default async function SettingsPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/")
  }

  const scoreboard = await getScoreboard(user?.id)
  const aggregations = await getAggregations(user?.id)

  return (
    <DashboardContainer>
      <DashboardHeader
        heading="Scoreboard"
        text="View your historical results."
      />
      <div className="grid gap-10">
        {user?.name ? (
          <ScoreboardContainer
            scoreboard={scoreboard}
            aggregations={aggregations}
          />
        ) : null}
      </div>
    </DashboardContainer>
  )
}
