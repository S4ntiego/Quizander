import { Card } from "@/components/Card"
import { DashboardContainer } from "@/components/Dashboard/DashboardContainer"
import { DashboardHeader } from "@/components/Dashboard/DashboardHeader"

export default function DashboardSettingsLoading() {
  return (
    <DashboardContainer>
      <DashboardHeader
        heading="Scoreboard"
        text="View your historical results."
      />
      <div className="grid gap-10">
        <Card.Skeleton />
        <Card.Skeleton />
      </div>
    </DashboardContainer>
  )
}
