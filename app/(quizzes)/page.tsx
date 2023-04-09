import Landing from "@/components/Landing"
import QuizList from "@/components/QuizList"

async function getQuizzes() {
  const res = await fetch("/api/quiz/get-quizzes")
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data")
  }

  const quizzes = await res.json()

  return quizzes
}

export default async function IndexPage() {
  const quizzes = await getQuizzes()

  return (
    <div className="h-full w-full relative">
      <Landing />
      <QuizList quizzes={quizzes} />
    </div>
  )
}
