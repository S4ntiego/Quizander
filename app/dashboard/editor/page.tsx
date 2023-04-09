import prisma from "@/lib/prisma"
import CreateQuiz from "@/components/CreateQuiz"

async function getCategories() {
  const categories = await prisma.quizCategory.findMany()

  return categories
}

export default async function CreatorPage() {
  const categories = await getCategories()

  return <CreateQuiz categories={categories} />
}
