import React from "react"

import EditQuiz from "@/components/Dashboard/Quiz/EditQuiz"

export async function getQuiz(id: string) {
  return await fetch(`http://localhost:8000/api/quizzes/${id}`)
    .then((response) => response.json())
    .then((data) => {
      return data?.data?.quiz
    })
}

const page = async ({ params }) => {
  const quiz = await getQuiz(params?.id)

  return <EditQuiz quiz={quiz} />
}

export default page
