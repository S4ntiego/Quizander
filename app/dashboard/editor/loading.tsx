import { DashboardContainer } from "@/components/Dashboard/DashboardContainer"
import { Skeleton } from "@/components/Skeleton"

export default function DashboardLoading() {
  return (
    <DashboardContainer className="h-full w-full">
      <Skeleton className="h-full w-full" />
    </DashboardContainer>
  )
}
