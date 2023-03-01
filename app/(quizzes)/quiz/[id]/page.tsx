import { Quiz } from "@/components/Quiz"
import prisma from "@/lib/prisma"

async function getQuiz(quizId: string) {
  const quiz = await prisma.quiz.findUnique({
    where: { id: quizId as string },
    include: {
      questions: {
        select: {
          question: true,
          answers: { select: { answer: true, isCorrect: true } },
        },
      },
    },
  })

  return quiz
}

interface QuizPageProps {
  params: { id: string }
}

export default async function QuizPage({ params }: QuizPageProps) {
  const quiz = await getQuiz(params.id)

  return <Quiz quiz={quiz} />
}
