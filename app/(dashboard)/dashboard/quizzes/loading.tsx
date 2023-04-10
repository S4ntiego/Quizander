import { DashboardContainer } from "@/components/Dashboard/DashboardContainer"
import { DashboardHeader } from "@/components/Dashboard/DashboardHeader"
import { QuizItem } from "@/components/QuizItem"

export default function DashboardLoading() {
  return (
    <DashboardContainer>
      <DashboardHeader
        heading="Quizzes"
        text="Create and manage quizzes."
      ></DashboardHeader>
      <div className="divide-y divide-neutral-200 rounded-md border border-slate-200">
        <QuizItem.Skeleton />
        <QuizItem.Skeleton />
        <QuizItem.Skeleton />
      </div>
    </DashboardContainer>
  )
}
