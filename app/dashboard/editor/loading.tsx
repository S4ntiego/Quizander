import { DashboardContainer } from "@/components/Dashboard/DashboardContainer"
import { DashboardHeader } from "@/components/Dashboard/DashboardHeader"
import { Skeleton } from "@/components/Skeleton"

export default function DashboardLoading() {
  return (
    <DashboardContainer>
      <div className="divide-y divide-dark-200 rounded-md border border-dark-200">
        <div className="p-4">
          <Skeleton className="h-7 w-2/5" />
        </div>
        <div className="p-4">
          <Skeleton className="h-7 w-2/5" />
        </div>
      </div>
    </DashboardContainer>
  )
}
