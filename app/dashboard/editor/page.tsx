import { redirect } from "next/navigation"

import prisma from "@/lib/prisma"
import { getSession } from "@/lib/session"
import CreateQuiz from "@/components/CreateQuiz"

async function getCategories() {
  const categories = await prisma.quizCategory.findMany()

  return categories
}

export default async function CreatorPage() {
  const session = await getSession()

  const user = session?.user

  if (!user) {
    redirect("/")
  }

  const categories = await getCategories()

  return <CreateQuiz categories={categories} />
}
