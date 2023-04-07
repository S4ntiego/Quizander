"use client"

import React from "react"
import { useSession } from "next-auth/react"

import { DashboardContainer } from "@/components/Dashboard/DashboardContainer"
import { DashboardHeader } from "@/components/Dashboard/DashboardHeader"

const page = () => {
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
      <div className="grid gap-10">User is logged in</div>
    </DashboardContainer>
  )
}

export default page
