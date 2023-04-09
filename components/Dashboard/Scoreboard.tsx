import React from "react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Separator } from "../ui/separator"

export function Scoreboard({ scoreboard, aggregations }) {
  return (
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
                          {new Date(quizScore?.createdAt).toLocaleDateString()}
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
                        aggregations.find((x) => x.quizId === quiz["id"])._count
                          .score
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
  )
}
