import { redirect } from "next/navigation"

import prisma from "@/lib/prisma"
import { getCurrentUser } from "@/lib/session"
import { DashboardContainer } from "@/components/Dashboard/DashboardContainer"
import { DashboardHeader } from "@/components/Dashboard/DashboardHeader"
import { EmptyPlaceholder } from "@/components/Dashboard/EmptyPlaceholder"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Separator } from "@/components/ui/separator"

export default async function ScoreboardPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/login")
  }

  const scoresPromise = prisma.quizCategory.findMany({
    include: {
      quizzes: {
        where: {
          quizScores: {
            some: { userId: user.id },
          },
        },

        include: {
          quizScores: {
            where: {
              userId: user.id,
            },
            orderBy: { createdAt: "desc" },
          },
        },
      },
    },
  })

  const aggregationsPromise = prisma.quizScore.groupBy({
    by: ["userId", "quizId"],
    where: {
      userId: user.id,
    },
    _count: {
      score: true,
    },
    _avg: {
      score: true,
    },
  })

  const [scores, aggregations] = await Promise.all([
    scoresPromise,
    aggregationsPromise,
  ])

  return (
    <DashboardContainer>
      <DashboardHeader
        heading="User Scoreboard"
        text="View your historical results."
      />
      <div className="grid gap-10">
        <div
          className="
       rounded-md border border-dark-200 dark:border-dark-400"
        >
          {scores?.length ? (
            <div>
              {scores.map((category) => (
                <Accordion type="multiple" className="" key={category.id}>
                  {category.quizzes.map((quiz) => (
                    <AccordionItem
                      className="px-4"
                      key={quiz.id}
                      value={quiz.title}
                    >
                      <AccordionTrigger>
                        <h1>{quiz.title}</h1>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="flex justify-between mb-1">
                          <div>Date:</div>
                          <div>Score:</div>
                        </div>
                        {quiz.quizScores.map((quizScore) => (
                          <div key={quizScore.id} className="flex flex-col">
                            <div className="flex justify-between">
                              <div>
                                {new Date(
                                  quizScore?.createdAt
                                ).toLocaleDateString()}
                              </div>
                              <div>{quizScore.score}</div>
                            </div>
                          </div>
                        ))}
                        <Separator className="my-2" />
                        {aggregations?.length ? (
                          <div className="flex flex-col justify-end items-end">
                            <p>
                              <span className="mr-2">Average Score:</span>
                              {aggregations
                                ?.find((x) => x.quizId === quiz["id"])
                                ?._avg.score?.toFixed(2)}
                            </p>
                            <p>
                              <span className="mr-2">Total Plays:</span>
                              {
                                aggregations.find(
                                  (x) => x.quizId === quiz["id"]
                                )?._count.score
                              }
                            </p>
                          </div>
                        ) : (
                          <div></div>
                        )}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              ))}
            </div>
          ) : (
            <EmptyPlaceholder>
              <EmptyPlaceholder.Icon name="trophy" />
              <EmptyPlaceholder.Title>No scores</EmptyPlaceholder.Title>
              <EmptyPlaceholder.Description>
                You don&apos;t have any saved scores yet. Play quizzes while
                being logged in to save your results.
              </EmptyPlaceholder.Description>
            </EmptyPlaceholder>
          )}
        </div>
      </div>
    </DashboardContainer>
  )
}
