"use client"

import React, { useEffect, useState } from "react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Separator } from "../ui/separator"

const ScoreboardContainer = ({ user }) => {
  const [scoreboard, setScoreboard] = useState<any>()
  useEffect(() => {
    async function getData() {
      const actualData = await fetch(`/api/scoreboard/${user.id}`).then(
        (response) => response.json()
      )

      setScoreboard(actualData)
    }
    getData()
  }, [])

  return (
    <>
      <div
        className="
       rounded-md border border-dark-200 dark:border-dark-400"
      >
        {scoreboard?.map((category) => (
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
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        ))}
      </div>
    </>
  )
}

export default ScoreboardContainer
