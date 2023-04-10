import { Suspense } from "react"
import { redirect } from "next/navigation"

import { getCurrentUser } from "@/lib/session"
import { DashboardContainer } from "@/components/Dashboard/DashboardContainer"
import { DashboardHeader } from "@/components/Dashboard/DashboardHeader"
import { UserNameForm } from "@/components/Dashboard/UserNameForm"

export default async function ProfilePage() {
  return (
    <DashboardContainer>
      <DashboardHeader
        heading="User Profile"
        text="Manage your user profile."
      />
      <div className="grid gap-10">
        <Suspense fallback="loading user profile">
          <UserNameForm />
        </Suspense>
      </div>
    </DashboardContainer>
  )
}
