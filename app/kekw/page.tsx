import { DashboardContainer } from "@/components/Dashboard/DashboardContainer"
import { DashboardHeader } from "@/components/Dashboard/DashboardHeader"
import QuizList from "@/components/QuizList"

export default async function ProfilePage() {
  return (
    <DashboardContainer>
      <DashboardHeader
        heading="User Profile"
        text="View and manage your user account settings."
      />
      <div className="grid gap-10">
        {/* @ts-expect-error Server Component */}
        <QuizList />
      </div>
    </DashboardContainer>
  )
}
