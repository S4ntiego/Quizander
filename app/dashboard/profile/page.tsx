import { Suspense } from "react"

import { DashboardContainer } from "@/components/Dashboard/DashboardContainer"
import { DashboardHeader } from "@/components/Dashboard/DashboardHeader"
import { UserNameForm2 } from "@/components/Dashboard/UserNameForm2"

export default async function ProfilePage() {
  return (
    <DashboardContainer>
      <DashboardHeader
        heading="User Profile"
        text="Manage your user profile."
      />
      <div className="grid gap-10">
        <Suspense fallback="loading user profile">
          <UserNameForm2 />
        </Suspense>
      </div>
    </DashboardContainer>
  )
}
