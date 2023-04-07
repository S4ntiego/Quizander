import { Suspense } from "react"
import { redirect } from "next/navigation"

import { getCurrentUser } from "@/lib/session"
import { DashboardContainer } from "@/components/Dashboard/DashboardContainer"
import { DashboardHeader } from "@/components/Dashboard/DashboardHeader"
import { UserNameForm2 } from "@/components/Dashboard/UserNameForm2"
import React from "react"

export default async function ProfilePage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/")
  }

  return (
    <DashboardContainer>
      <DashboardHeader
        heading="User Profile"
        text="View and manage your user account settings."
      />
      <div className="grid gap-10">
      <React.Suspense fallback={<div>Loading user insert</div>}>
        {/* @ts-expect-error Server Component */}
        <UserNameForm2 />
        <React.Suspense/>
      </div>
    </DashboardContainer>
  )
}
