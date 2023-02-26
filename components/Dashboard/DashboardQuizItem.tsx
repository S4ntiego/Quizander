import Link from "next/link"
import { Quiz } from "@prisma/client"

import { formatDate } from "@/lib/utils"
import { QuizOperations } from "@/components/Dashboard/QuizOperations"
import { Skeleton } from "@/components/ui/skeleton"

interface QuizItemProps {
  quiz: Pick<Quiz, "id" | "title" | "createdAt">
}

export function DashboardQuizItem({ quiz }: QuizItemProps) {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="grid gap-1">
        <Link
          href={`/dashboard/editor/${quiz.id}`}
          className="font-semibold hover:underline"
        >
          {quiz.title}
        </Link>
        <div>
          <p className="text-sm text-slate-600">{formatDate(quiz.createdAt)}</p>
        </div>
      </div>
      <QuizOperations quiz={{ id: quiz.id, title: quiz.title }} />
    </div>
  )
}

DashboardQuizItem.Skeleton = function PostItemSkeleton() {
  return (
    <div className="p-4">
      <div className="space-y-3">
        <Skeleton className="h-5 w-2/5" />
        <Skeleton className="h-4 w-4/5" />
      </div>
    </div>
  )
}
