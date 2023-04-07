import { cache } from "react"
import { redirect } from "next/navigation"

import prisma from "@/lib/prisma"
import { getCurrentUser } from "@/lib/session"
import { DashboardContainer } from "@/components/Dashboard/DashboardContainer"
import { DashboardHeader } from "@/components/Dashboard/DashboardHeader"
import { UserNameForm2 } from "@/components/Dashboard/UserNameForm2"
import QuizList from "@/components/QuizList"

async function getQuizzes() {
  const res = await fetch("/api/quiz/get-quizzes", {
    method: "GET",
  })
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data")
  }

  return res.json()
}

export default async function ProfilePage() {
  const quizzes = await getQuizzes()

  return (
    <DashboardContainer>
      <DashboardHeader
        heading="User Profile"
        text="View and manage your user account settings."
      />
      <div className="grid gap-10">
        <QuizList quizzes={quizzes} />
      </div>
    </DashboardContainer>
  )
}
