"use client"

import React from "react"

import { Card } from "../Card"

const Scoreboard = ({ scoreboard }) => {
  return (
    <>
      {scoreboard.map((category) => (
        <div key={category.id}>
          <Card>
            <Card.Header>
              <Card.Title>{category.name}</Card.Title>
            </Card.Header>
            <Card.Content className="flex flex-col gap-1">
              {category.quizzes.map((quiz) => (
                <div
                  className="border p-4 rounded-md border-slate-600 w-full flex flex-row justify-between"
                  key={quiz.id}
                >
                  <h2>{quiz.title}</h2>
                  <div className="flex flex-row">
                    {quiz.quizScores.map((quizScore) => (
                      <div key={quizScore.id}>{quizScore.score}</div>
                    ))}
                  </div>
                </div>
              ))}
            </Card.Content>
            <Card.Footer></Card.Footer>
          </Card>
        </div>
      ))}
    </>
  )
}

export default Scoreboard
