import React, { cache } from "react"
import Image from "next/image"
import Link from "next/link"
import { Quiz } from "@prisma/client"

import { cn, formatDate } from "@/lib/utils"
import { AspectRatio } from "./ui/aspect-ratio"

export default function QuizList({ quizzes }) {
  return (
    <section id="harry_potter_quizzes" className="container mb-24 xl:px-28">
      <h2 className="mb-12 text-4xl font-bold font-lexend">
        Dive into the world of magic.
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
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
      <Link scroll={true} href={`/quiz/${quiz.id}`}>
        <AspectRatio
          ratio={aspectRatio}
          className="mb-4 overflow-hidden rounded-xl"
        >
          <Image
            fill
            priority
            src={quiz.coverImage}
            alt={quiz.title}
            className="object-cover transition-all group-hover:scale-105"
          />
        </AspectRatio>
        <div className="flex flex-col">
          <h3 className="text-2xl font-bold text-justify leading-relaxed font-lexend dark:text-slate-50 text-slate-900">
            {quiz.title}
          </h3>
          <p className="font-lexend text-base text-justify line-clamp-4 text-slate-800 dark:text-slate-300">
            {quiz.description}
          </p>
          <span className="sr-only">Play Quiz</span>
        </div>
      </Link>
    </div>
  )
}
