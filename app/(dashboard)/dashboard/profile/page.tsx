import React from "react"
import { redirect } from "next/navigation"

import { getCurrentUser } from "@/lib/session"
import { DashboardContainer } from "@/components/Dashboard/DashboardContainer"
import { DashboardHeader } from "@/components/Dashboard/DashboardHeader"
import { UserNameForm } from "@/components/Dashboard/UserNameForm"

export const metadata = {
  title: "User Profile",
  description: "View and manage your user account settings.",
}

const ProfilePage = async () => {
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
      <UserNameForm user={{ id: user.id, name: user.name || "" }} />
    </DashboardContainer>
  )
}

export default ProfilePage
