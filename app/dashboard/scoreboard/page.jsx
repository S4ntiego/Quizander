import { Suspense } from "react"

import { DashboardContainer } from "@/components/Dashboard/DashboardContainer"
import { DashboardHeader } from "@/components/Dashboard/DashboardHeader"
import ScoreboardContainer from "@/components/Dashboard/ScoreboardContainer"

export default async function ScoreboardPage() {
  return (
    <DashboardContainer>
      <DashboardHeader
        heading="User Scoreboard"
        text="View your historical results."
      />
      <div className="grid gap-10">
        <Suspense fallback={<div>Loading Scoreboard...</div>}>
          <ScoreboardContainer />
        </Suspense>
      </div>
    </DashboardContainer>
  )
}