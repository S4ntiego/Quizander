import React from "react"

import ChangeNameForm from "@/components/Dashboard/ChangeNameButton"
import { DashboardContainer } from "@/components/Dashboard/DashboardContainer"
import { DashboardHeader } from "@/components/Dashboard/DashboardHeader"

const SessionPage = () => {
  return (
    <DashboardContainer>
      <DashboardHeader
        heading="User Scoreboard"
        text="View your historical results."
      />
      <ChangeNameForm />
    </DashboardContainer>
  )
}

export default SessionPage
