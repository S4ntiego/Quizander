import Image from "next/image"
import Link from "next/link"
import { Quiz } from "@prisma/client"

import { cn, formatDate } from "@/lib/utils"
import { AspectRatio } from "./ui/aspect-ratio"
import { Skeleton } from "./ui/skeleton"

interface QuizItemProps extends React.HTMLAttributes<HTMLDivElement> {
  quiz: Quiz
  aspectRatio?: number
}

export function QuizItem({
  quiz,
  aspectRatio = 4 / 3,
  className,
  ...props
}: QuizItemProps) {
  return (
    <article className={cn("space-y-3 relative group", className)} {...props}>
      <Link href={`/quiz/${quiz.id}`}>
        <AspectRatio ratio={aspectRatio} className="overflow-hidden rounded-md">
          <Image
            priority
            src={quiz.coverImage}
            alt={quiz.title}
            fill
            className="object-cover transition-all hover:scale-105"
          />
        </AspectRatio>
        <div className="space-y-1 mt-2 text-sm">
          <h3 className="font-playfair font-bold text-2xl leading-none">
            {quiz.title}
          </h3>
          <p className="text-normal text-slate-500 dark:text-slate-400">
            {quiz.description}
          </p>
          {quiz.createdAt && (
            <p className="text-xs text-slate-600">
              {formatDate(quiz?.createdAt)}
            </p>
          )}
          <span className="sr-only">Play Quiz</span>
        </div>
      </Link>
    </article>
  )
}

QuizItem.Skeleton = function PostItemSkeleton() {
  return (
    <div className="p-4">
      <div className="space-y-3">
        <Skeleton className="h-5 w-2/5" />
        <Skeleton className="h-4 w-4/5" />
      </div>
    </div>
  )
}
