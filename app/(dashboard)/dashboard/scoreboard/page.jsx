"use client"

import { redirect } from "next/navigation"
import { useSession } from "next-auth/react"

import { DashboardContainer } from "@/components/Dashboard/DashboardContainer"
import { DashboardHeader } from "@/components/Dashboard/DashboardHeader"
import Scoreboard from "@/components/Dashboard/Scoreboard"

export default function ScoreboardPage() {
  const session = useSession()
  if (session.status === "loading") {
    return <div>loading...</div>
  }

  if (session.status === "unauthenticated") {
    redirect("/")
  }

  const user = session?.data?.user

  return (
    <DashboardContainer>
      <DashboardHeader
        heading="User Scoreboard"
        text="View your historical results."
      />
      <div className="grid gap-10">
        <Scoreboard user={user} />
      </div>
    </DashboardContainer>
  )
}
