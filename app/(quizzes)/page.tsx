import { cache } from "react"
import Image from "next/image"
import Link from "next/link"
import { Quiz } from "@prisma/client"

import prisma from "@/lib/prisma"
import { cn, formatDate } from "@/lib/utils"
import Landing from "@/components/Landing"
import { AspectRatio } from "@/components/ui/aspect-ratio"

const getQuizzes = cache(async () => {
  const quizzes = await prisma.quiz.findMany({
    include: {
      category: {
        select: {
          name: true,
        },
      },
      questions: {
        select: {
          question: true,
          answers: { select: { answer: true, isCorrect: true } },
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  if (quizzes) {
    for (const quiz of quizzes) {
      quiz.coverImage =
        "https://d16toh0t29dtt4.cloudfront.net/" + quiz.coverImage
    }
  }

  return quizzes
})

export default async function IndexPage() {
  const quizzes = await getQuizzes()

  return (
    <section
      id="harry_potter_quizzes"
      className="h-screen bg-dark-700 container py-6 lg:py-10"
    >
      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
        {quizzes.map((quiz) => (
          <QuizArtwork key={quiz.title} quiz={quiz} />
        ))}
      </div>
    </section>
  )
}

interface QuizWithCategory extends Quiz {
  category: {
    id?: number
    name?: string
  }
}

interface QuizArtworkProps extends React.HTMLAttributes<HTMLDivElement> {
  quiz: QuizWithCategory
  aspectRatio?: number
}

function QuizArtwork({
  quiz,
  aspectRatio = 1 / 1,
  className,
  ...props
}: QuizArtworkProps) {
  return (
    <div className={cn("relative group rounded-md", className)} {...props}>
      <Link href={`/quiz/${quiz.id}`}>
        <AspectRatio ratio={aspectRatio} className="overflow-hidden rounded-xl">
          <Image
            fill
            priority
            src={quiz.coverImage}
            alt={quiz.title}
            className="object-cover transition-all group-hover:scale-105"
          />
        </AspectRatio>
        <div className="flex flex-col">
          <p className="uppercase text-slate-700 dark:text-slate-400 text-[13px] font-lexend tracking-widest mt-2 py-2 sm:py-2 sm:mt-4">
            {quiz.category.name}
          </p>
          <h3 className="text-xl font-bold text-justify leading-relaxed font-lexend mb-1 sm:mb-2 dark:text-slate-50 text-slate-900">
            {quiz.title}
          </h3>
          <p className="font-lexend text-sm text-justify leading-normal line-clamp-4 mb-1 sm:mb-2 text-slate-800 dark:text-slate-200">
            {quiz.description}
          </p>
          {quiz.createdAt && (
            <p className="text-[13px] tracking-widest mt-1 sm:mt-2 uppercase text-slate-800 dark:text-slate-400">
              {formatDate(quiz.createdAt)}
            </p>
          )}
          <span className="sr-only">Play Quiz</span>
        </div>
      </Link>
    </div>
  )
}
