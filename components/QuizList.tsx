import React, { cache } from "react"
import Image from "next/image"
import Link from "next/link"
import { Quiz } from "@prisma/client"

import { cn } from "@/lib/utils"
import { AspectRatio } from "./ui/aspect-ratio"

export default function QuizList({ quizzes }) {
  return (
    <section
      id="harry_potter_quizzes"
      className="bg-gradient-to-b from-dark-150 to-dark-50 dark:from-dark-700 dark:to-dark-600 py-24"
    >
      <div className="container">
        <h2 className="mb-12 text-5xl font-bold font-space uppercase">
          Dive into the world of magic.
        </h2>
        <div className="grid grid-cols-1 gap-16 md:grid-cols-2 xl:grid-cols-3">
          {quizzes.map((quiz) => (
            <QuizArtwork key={quiz.title} quiz={quiz} />
          ))}
        </div>
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
      <Link scroll={true} href={`/quiz/${quiz.id}`}>
        <AspectRatio
          ratio={aspectRatio}
          className="mb-5 overflow-hidden rounded-3xl border border-dark-200 dark:border-dark-400"
        >
          <Image
            fill
            priority
            src={quiz.coverImage}
            alt={quiz.title}
            className="object-cover transition-all group-hover:scale-105 "
          />
        </AspectRatio>
        <div className="flex flex-col">
          <h3 className="text-2xl font-base font-bold font-space text-justify mb-1 dark:text-slate-50 text-dark-900 leading-tight">
            {quiz.title}
          </h3>
          <p className="font-lexend text-base text-justify line-clamp-4 text-dark-400 dark:text-dark-200">
            {quiz.description}
          </p>
          <span className="sr-only">Play Quiz</span>
        </div>
      </Link>
    </div>
  )
}
