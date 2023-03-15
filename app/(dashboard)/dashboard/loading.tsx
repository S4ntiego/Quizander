import Link from "next/link"

import { cn } from "@/lib/utils"
import { DashboardContainer } from "@/components/Dashboard/DashboardContainer"
import { DashboardHeader } from "@/components/Dashboard/DashboardHeader"
import { Icons } from "@/components/Icons"
import { QuizItem } from "@/components/QuizItem"
import { buttonVariants } from "@/components/ui/button"

export default function DashboardLoading() {
  return (
    <DashboardContainer>
      <DashboardHeader heading="Quizzes" text="Create and manage quizzes.">
        <Link
          className={cn(buttonVariants({ variant: "default" }), "w-32")}
          href="/dashboard/editor"
        >
          <Icons.add className="w-4 h-4 mr-2" />
          Add Quiz
        </Link>
      </DashboardHeader>
      <div className="divide-y divide-neutral-200 rounded-md border border-slate-200">
        <QuizItem.Skeleton />
        <QuizItem.Skeleton />
        <QuizItem.Skeleton />
        <QuizItem.Skeleton />
        <QuizItem.Skeleton />
      </div>
    </DashboardContainer>
  )
}
