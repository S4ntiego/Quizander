import { Suspense, cache, useMemo } from "react"

import prisma from "@/lib/prisma"
import Landing from "@/components/Landing"
import { QuizList } from "@/components/QuizList"

export default async function IndexPage() {
  return (
    <div className="h-full w-full relative">
      <Landing />
    </div>
  )
}
