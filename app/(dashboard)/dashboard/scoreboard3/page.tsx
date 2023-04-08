"use client"

import React from "react"
import { redirect } from "next/navigation"
import { useSession } from "next-auth/react"

import ChangeNameForm from "@/components/Dashboard/ChangeNameButton"
import { DashboardContainer } from "@/components/Dashboard/DashboardContainer"
import { DashboardHeader } from "@/components/Dashboard/DashboardHeader"

const SessionPage = () => {
  const session = useSession()

  if (session.status === "loading") {
    return <div>loading</div>
  }

  if (session.status === "unauthenticated") {
    redirect("/")
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
