import { redirect } from "next/navigation"

import { getCurrentUser } from "@/lib/session"
import { DashboardContainer } from "@/components/Dashboard/DashboardContainer"
import { DashboardHeader } from "@/components/Dashboard/DashboardHeader"
import { UserNameForm } from "@/components/Dashboard/UserNameForm"

export const metadata = {
  title: "User Profile",
  description: "Manage your user profile.",
}

export default async function ProfilePage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/")
  }

  return (
    <DashboardContainer>
      <DashboardHeader
        heading="User Profile"
        text="Manage your user profile."
      />
      <div className="grid gap-10">
        {user?.name ? (
          <UserNameForm user={{ id: user.id, name: user.name }} />
        ) : null}
      </div>
    </DashboardContainer>
  )
}
