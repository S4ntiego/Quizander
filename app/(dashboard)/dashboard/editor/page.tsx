import { redirect } from "next/navigation"
import { Quiz } from "@prisma/client"

import prisma from "@/lib/prisma"
import { getCurrentUser } from "@/lib/session"
import CreateQuiz from "@/components/CreateQuiz"

async function getCategories() {
  const categories = await prisma.quizCategory.findMany()

  return categories
}

export default async function CreatorPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/login")
  }

  const categories = await getCategories()

  return <CreateQuiz categories={categories} />
}
