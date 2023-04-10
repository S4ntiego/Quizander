import { redirect } from "next/navigation"

import { getCurrentUser } from "@/lib/session"
import { DashboardContainer } from "@/components/Dashboard/DashboardContainer"
import { DashboardHeader } from "@/components/Dashboard/DashboardHeader"
import { UserNameForm } from "@/components/Dashboard/UserNameForm"

export const metadata = {
  title: "Settings",
  description: "Manage account and website settings.",
}

export default async function SettingsPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/")
  }

  return (
    <DashboardContainer>
      <DashboardHeader
        heading="Settings"
        text="Manage account and website settings."
      />
      <div className="grid gap-10">
        {user?.name ? (
          <UserNameForm user={{ id: user.id, name: user.name }} />
        ) : null}
      </div>
    </DashboardContainer>
  )
}
