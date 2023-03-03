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
    <div>
      <section className="container grid items-center gap-6 pt-6 pb-8 md:py-10">
        <div className="flex max-w-[980px] flex-col items-start gap-2">
          <h1 className="text-3xl font-playfair font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
            Harry Potter Trivia
          </h1>
          <p className="max-w-[700px] text-lg text-slate-700 dark:text-slate-400 sm:text-xl">
            Verify your knowledge about the universe.
          </p>
        </div>

        <div className="relative flex space-x-4">
          {quizzes.map((quiz) => (
            <QuizArtwork key={quiz.title} quiz={quiz} className=" w-80" />
          ))}
        </div>
      </section>
    </div>
  )
}

interface QuizArtworkProps extends React.HTMLAttributes<HTMLDivElement> {
  quiz: Quiz
  aspectRatio?: number
}

function QuizArtwork({
  quiz,
  aspectRatio = 4 / 3,
  className,
  ...props
}: QuizArtworkProps) {
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
              {formatDate(quiz.createdAt)}
            </p>
          )}
          <span className="sr-only">Play Quiz</span>
        </div>
      </Link>
    </article>
  )
}

export const revalidate = 60
