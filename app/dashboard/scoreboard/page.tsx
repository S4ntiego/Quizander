import React, { Suspense } from "react"

import { DashboardContainer } from "@/components/Dashboard/DashboardContainer"
import { DashboardHeader } from "@/components/Dashboard/DashboardHeader"
import { Scoreboard } from "@/components/Dashboard/Scoreboard"

const SessionPage = () => {
  return (
    <DashboardContainer>
      <DashboardHeader
        heading="User Scoreboard"
        text="View your historical results."
      />
      <Suspense fallback={<div>Loading user form...</div>}>
        <Scoreboard />
      </Suspense>
    </DashboardContainer>
  )
}

export default SessionPage
