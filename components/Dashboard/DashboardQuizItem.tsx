import Image from "next/image"
import Link from "next/link"
import { Quiz } from "@prisma/client"

import { cn, formatDate } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"
import { AspectRatio } from "../ui/aspect-ratio"

interface QuizItemProps {
  quiz: Pick<Quiz, "id" | "coverImage" | "title" | "description" | "createdAt">
}

export function DashboardQuizItem({ quiz }: QuizItemProps) {
  return (
    <div
      className={cn(
        "p-2 rounded-md border dark:border-slate-600 flex flex-col"
      )}
    >
      <Link href={`/dashboard/editor/${quiz.id}`}>
        <AspectRatio ratio={4 / 3} className="overflow-hidden rounded-md">
          <Image
            priority
            src={quiz.coverImage}
            alt={quiz.title}
            fill
            className="object-cover transition-all hover:scale-105"
          />
        </AspectRatio>
      </Link>
      <div className="space-y-1 mt-2 h-full flex flex-col justify-between">
        <div className="">
          <Link href={`/dashboard/editor/${quiz.id}`}>
            <h3 className="font-semibold hover:underline">{quiz.title}</h3>
          </Link>
          <p className="text-slate-500 dark:text-slate-400 text-ellipsis line-clamp-2">
            {quiz.description}
          </p>
        </div>
        <div>
          {quiz.createdAt && (
            <p className="text-sm text-slate-600">
              {formatDate(quiz?.createdAt)}
            </p>
          )}
        </div>
      </div>
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
