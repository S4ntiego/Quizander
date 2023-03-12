import { notFound, redirect } from "next/navigation"
import { Quiz, User } from "@prisma/client"

import prisma from "@/lib/prisma"
import { getCurrentUser } from "@/lib/session"
import { DashboardContainer } from "@/components/Dashboard/DashboardContainer"
import { DashboardHeader } from "@/components/Dashboard/DashboardHeader"
import Scoreboard from "@/components/Dashboard/Scoreboard"

async function getScoreboard(userId: User["id"]) {
  const scoreboard = await prisma.quizScore.findMany({
    where: {
      userId: userId,
    },
    include: {
      quiz: {
        select: {
          category: true,
          description: true,
        },
      },
    },
  })

  return JSON.parse(JSON.stringify(scoreboard))
}

export default async function ScoreboardPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/login")
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
