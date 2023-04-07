import React, { Suspense } from "react"
import Link from "next/link"
import { redirect } from "next/navigation"

import { getCurrentUser } from "@/lib/session"
import { DashboardContainer } from "@/components/Dashboard/DashboardContainer"
import { DashboardHeader } from "@/components/Dashboard/DashboardHeader"
import { UserNameForm2 } from "@/components/Dashboard/UserNameForm2"

export default async function ProfilePage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/")
  }

  return (
    <DashboardContainer>
      <Link href="/profeil/elo">Elo</Link>
      <DashboardHeader
        heading="User Profile"
        text="View and manage your user account settings."
      />
      <div className="grid gap-10">
        <Suspense fallback={<div>loading profeil</div>}>
          <UserNameForm2 />
        </Suspense>
      </div>
    </DashboardContainer>
  )
}
