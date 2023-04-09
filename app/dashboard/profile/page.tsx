"use client"

import React from "react"
import { redirect } from "next/navigation"
import { useSession } from "next-auth/react"

import { DashboardContainer } from "@/components/Dashboard/DashboardContainer"
import { DashboardHeader } from "@/components/Dashboard/DashboardHeader"
import { UserNameForm } from "@/components/Dashboard/UserNameForm"

const SessionPage = () => {
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
      <UserNameForm user={user} />
    </DashboardContainer>
  )
}

export default SessionPage
