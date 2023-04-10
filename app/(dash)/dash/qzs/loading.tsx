import { Card } from "@/components/Card"
import { DashboardContainer } from "@/components/Dashboard/DashboardContainer"
import { DashboardHeader } from "@/components/Dashboard/DashboardHeader"

export default function DashboardSettingsLoading() {
  return (
    <DashboardContainer>
      <DashboardHeader heading="Quizzes" text="Manage and create quizzes." />
      <div className="grid gap-10">
        <Card.Skeleton />
        <Card.Skeleton />
      </div>
    </DashboardContainer>
  )
}
