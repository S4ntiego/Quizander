import { cache } from "react"
import Image from "next/image"
import Link from "next/link"
import { Quiz } from "@prisma/client"

import prisma from "@/lib/prisma"
import { cn, formatDate } from "@/lib/utils"
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
    <section className="container py-6 lg:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-playfair font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
          Harry Potter Trivia
        </h1>
        <p className="max-w-[700px] mb-12 text-lg text-slate-700 dark:text-slate-400 sm:text-xl">
          Verify your knowledge about the universe.
        </p>
      </div>

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
        <AspectRatio ratio={aspectRatio} className="overflow-hidden rounded-md">
          <Image
            fill
            priority
            src={quiz.coverImage}
            alt={quiz.title}
            className="object-cover transition-all group-hover:scale-105"
          />
        </AspectRatio>
        <div className="mt-4">
          <p className="uppercase dark:text-slate-500 text-[10px] font-semibold tracking-widest text">
            {quiz.category.name}
          </p>
          <h3 className="mt-3 font-bold text-xl leading-snug text-justify">
            {quiz.title}
          </h3>
          <p className="text-sm mt-6 text-justify line-clamp-4 text-slate-500 dark:text-slate-200">
            {quiz.description}
          </p>
          {quiz.createdAt && (
            <p className="text-xs mt-2 dark:text-slate-500">
              {formatDate(quiz.createdAt)}
            </p>
          )}

          <span className="sr-only">Play Quiz</span>
        </div>
      </Link>
    </div>
  )
}
