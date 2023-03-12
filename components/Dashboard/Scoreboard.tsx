"use client"

import React from "react"

const Scoreboard = ({ scoreboard }) => {
  console.log(scoreboard)
  return (
    <div>
      {scoreboard.map((category) => (
        <div key={category.id}>
          <div>{category.name}</div>
          <div>
            {category.quizzes.map((quiz) => (
              <div key={quiz.id}>elo</div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default Scoreboard
