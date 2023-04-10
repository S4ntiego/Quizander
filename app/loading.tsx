import { Card } from "@/components/Card"
import { DashboardContainer } from "@/components/Dashboard/DashboardContainer"

export default function DashboardSettingsLoading() {
  return (
    <DashboardContainer>
      <div className="grid gap-10">
        <Card.Skeleton />
        <Card.Skeleton />
      </div>
    </DashboardContainer>
  )
}
