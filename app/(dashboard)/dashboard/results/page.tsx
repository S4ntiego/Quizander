import { redirect } from "next/navigation"
import { User } from "@prisma/client"

import prisma from "@/lib/prisma"
import { getCurrentUser } from "@/lib/session"
import { DashboardContainer } from "@/components/Dashboard/DashboardContainer"
import { DashboardHeader } from "@/components/Dashboard/DashboardHeader"
import Scoreboard from "@/components/Dashboard/Scoreboard"

async function getScoreboard(userId: User["id"]) {
  const scoreboard = await prisma.quizCategory.findMany({
    include: {
      quizzes: {
        include: {
          quizScores: {
            where: { userId: userId },
            orderBy: { createdAt: "desc" },
          },
        },
      },
    },
  })

  return JSON.parse(JSON.stringify(scoreboard))
}

export default async function ScoreboardPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/")
  }

  const scoreboard = await getScoreboard(user.id)

  return (
    <DashboardContainer>
      <DashboardHeader
        heading="User Scoreboard"
        text="View your historical quiz results."
      />
      <div className="grid gap-10">
        <Scoreboard scoreboard={scoreboard} />
      </div>
    </DashboardContainer>
  )
}
