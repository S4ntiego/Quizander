import { Suspense } from "react"

import { DashboardContainer } from "@/components/Dashboard/DashboardContainer"
import { DashboardHeader } from "@/components/Dashboard/DashboardHeader"
import QuizList from "@/components/QuizList"

async function getQuizzes() {
  const res = await fetch(
    "https://quizander-dqzb.vercel.app/api/quiz/get-quizzes",
    {
      method: "GET",
    }
  )
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
        <Suspense fallback={<div>LOADING TEST</div>}>
          <QuizList quizzes={quizzes} />
        </Suspense>
      </div>
    </DashboardContainer>
  )
}
