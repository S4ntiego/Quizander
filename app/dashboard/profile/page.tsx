import { Suspense } from "react"
import Link from "next/link"

import { DashboardContainer } from "@/components/Dashboard/DashboardContainer"
import { DashboardHeader } from "@/components/Dashboard/DashboardHeader"
import { UserNameForm2 } from "@/components/Dashboard/UserNameForm2"

export default async function ProfilePage() {
  return (
    <div className="card">
      <Link href="/dashboard" className="btn btn-back">
        Back To Repositories
      </Link>
      <Suspense fallback="loading profile">
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
      </Suspense>
    </div>
  )
}
