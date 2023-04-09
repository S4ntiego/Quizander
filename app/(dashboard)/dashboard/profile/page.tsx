"use client"

import { Suspense } from "react"
import { redirect } from "next/navigation"
import { useSession } from "next-auth/react"

import { DashboardContainer } from "@/components/Dashboard/DashboardContainer"
import { DashboardHeader } from "@/components/Dashboard/DashboardHeader"
import { UserNameForm } from "@/components/Dashboard/UserNameForm"

export default async function ProfilePage() {
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
        heading="User Profile"
        text="View and manage your user account settings."
      />
      <div className="grid gap-10">
        <Suspense fallback={<div>Loading user form</div>}>
          <UserNameForm user={user} />
        </Suspense>
      </div>
    </DashboardContainer>
  )
}
