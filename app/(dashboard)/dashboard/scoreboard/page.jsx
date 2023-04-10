import { redirect } from "next/navigation"

import { getCurrentUser } from "@/lib/session"
import { DashboardContainer } from "@/components/Dashboard/DashboardContainer"
import { DashboardHeader } from "@/components/Dashboard/DashboardHeader"
import Scoreboard from "@/components/Dashboard/Scoreboard"

export default async function ScoreboardPage() {
  const user = getCurrentUser()

  if (!user) {
    redirect("/")
  }

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
