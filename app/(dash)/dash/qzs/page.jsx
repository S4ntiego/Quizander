import React, { Suspense } from "react"

const getQuizzes = cache(async () => {
  const quizzes = await prisma.quiz.findMany({
    include: {
      questions: {
        select: {
          question: true,
          answers: { select: { answer: true, isCorrect: true } },
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  if (quizzes) {
    for (const quiz of quizzes) {
      quiz.coverImage =
        "https://d16toh0t29dtt4.cloudfront.net/" + quiz.coverImage
    }
  }

  return quizzes
})

export default async function QzsPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/")
  }

  const quizzes = await getQuizzes()

  return (
    <div>
      <DashboardContainer>
        <DashboardHeader heading="Quizzes" text="Create and manage quizzes.">
          <Link
            className={cn(buttonVariants({ variant: "default" }))}
            href="/dashboard/editor"
          >
            <Icons.add className="w-4 h-4 mr-2 dark:text-dark-700" />
            Add Quiz
          </Link>
        </DashboardHeader>
        <div>
          {quizzes?.length ? (
            <div className="divide-y divide-neutral-200 rounded-md border border-slate-200">
              {quizzes.map((quiz) => (
                <DashboardQuizItem key={quiz.id} quiz={quiz} />
              ))}
            </div>
          ) : (
            <EmptyPlaceholder>
              <EmptyPlaceholder.Icon name="post" />
              <EmptyPlaceholder.Title>
                No quizzes created
              </EmptyPlaceholder.Title>
              <EmptyPlaceholder.Description>
                You don&apos;t have any quizzes yet. Start creating content.
              </EmptyPlaceholder.Description>
              <Link
                className={cn(buttonVariants({ variant: "default" }))}
                href="/dashboard/editor"
              >
                <Icons.add className="w-4 h-4 mr-2 dark:text-dark-700" />
                Add Quiz
              </Link>
            </EmptyPlaceholder>
          )}
        </div>
      </DashboardContainer>
    </div>
  )
}
