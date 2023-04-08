"use client"

import React from "react"
import { useSession } from "next-auth/react"

import ChangeNameForm from "@/components/Dashboard/ChangeNameButton"
import { DashboardContainer } from "@/components/Dashboard/DashboardContainer"
import { DashboardHeader } from "@/components/Dashboard/DashboardHeader"

const SessionPage = () => {
  const { data: session } = useSession()

  if (!session) {
    // Handle unauthenticated state, e.g. render a SignIn component
    return <div>elo</div>
  }
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
