"use client"

import { redirect } from "next/navigation"
import { useSession } from "next-auth/react"

import prisma from "@/lib/prisma"
import CreateQuiz from "@/components/CreateQuiz"

async function getCategories() {
  const categories = await prisma.quizCategory.findMany()

  return categories
}

export default async function CreatorPage() {
  const session = useSession()
  if (session.status === "loading") {
    return <div>loading...</div>
  }

  if (session.status === "unauthenticated") {
    redirect("/")
  }

  const categories = await getCategories()

  return <CreateQuiz categories={categories} />
}
