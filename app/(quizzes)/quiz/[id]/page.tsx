import { Quiz } from "@/components/Quiz"

export async function getQuiz(id: string) {
  const res = await fetch(`http://localhost:3000/api/quiz/${id}`)
  const quiz = res.json()
  return quiz
}

interface QuizPageProps {
  params: { id: string }
}

export default async function QuizPage({ params }: QuizPageProps) {
  const quiz = await getQuiz(params?.id)

  return <Quiz quiz={quiz} />
}
