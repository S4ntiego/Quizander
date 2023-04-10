import { redirect } from "next/navigation"
import { User } from "@prisma/client"

import prisma from "@/lib/prisma"
import { getCurrentUser } from "@/lib/session"
import { DashboardContainer } from "@/components/Dashboard/DashboardContainer"
import { DashboardHeader } from "@/components/Dashboard/DashboardHeader"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Separator } from "@/components/ui/separator"

async function getScoreboard(user: User["id"]) {
  const scoreboard = await prisma.quizCategory.findMany({
    include: {
      quizzes: {
        where: {
          quizScores: {
            some: { userId: user },
          },
        },

        include: {
          quizScores: {
            where: {
              userId: user,
            },
            orderBy: { createdAt: "desc" },
          },
        },
      },
    },
  })

  return JSON.parse(JSON.stringify(scoreboard))
}

async function getAggregations(user: User["id"]) {
  const aggregations = await prisma.quizScore.groupBy({
    by: ["userId", "quizId"],
    where: {
      userId: user,
    },
    _count: {
      score: true,
    },
    _avg: {
      score: true,
    },
  })

  return JSON.parse(JSON.stringify(aggregations))
}

export default async function ScoreboardPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/")
  }
  const scoreboard = await getScoreboard(user.id)
  const aggregations = await getAggregations(user.id)
  return (
    <DashboardContainer>
      <DashboardHeader
        heading="User Scoreboard"
        text="View your historical results."
      />
      <div className="grid gap-10">
        <>
          <div
            className="
       rounded-md border border-dark-200 dark:border-dark-400"
          >
            {scoreboard.map((category) => (
              <Accordion type="multiple" className="" key={category.id}>
                {category.quizzes.map((quiz) => (
                  <AccordionItem className="px-4" key={quiz.id} value={quiz.id}>
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
                      <div className="flex flex-col justify-end items-end">
                        <p>
                          <span className="mr-2">Average Score:</span>
                          {aggregations
                            .find((x) => x.quizId === quiz["id"])
                            ._avg.score.toFixed(2)}
                        </p>
                        <p>
                          <span className="mr-2">Total Plays:</span>
                          {
                            aggregations.find((x) => x.quizId === quiz["id"])
                              ._count.score
                          }
                        </p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            ))}
          </div>
        </>
      </div>
    </DashboardContainer>
  )
}
