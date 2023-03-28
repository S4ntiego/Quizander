"use client"

import React, { useState } from "react"
import Image from "next/image"
import Link from "next/link"

import { Icons } from "./Icons"
import { QuizAnswer } from "./QuizAnswer"
import { AspectRatio } from "./ui/aspect-ratio"
import { Button } from "./ui/button"
import { Separator } from "./ui/separator"

async function saveQuizResults(data) {
  const response = await fetch(`/api/quiz/saveResults`, {
    body: JSON.stringify(data),
    method: "POST",
  })

  const quizzes = await response.json()
}

export function Quiz({ quiz, user }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [currentAnswer, setCurrentAnswer] = useState("")
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0)
  const [showResults, setShowResults] = useState(false)
  const [disabled, setDisabled] = useState(false)

  const selectAnswer = (answer) => {
    setCurrentAnswer(answer)
    answer.isCorrect === true && setCorrectAnswersCount(correctAnswersCount + 1)
    setDisabled(true)
    setTimeout(function () {
      !showResults && setCurrentQuestionIndex(currentQuestionIndex + 1)
      setCurrentAnswer("")
      setDisabled(false)
      currentQuestionIndex === quiz.questions.length - 1 &&
        setShowResults(!showResults)
    }, 1000)
  }

  const renderScore = (score, questions, quiz) => {
    const scorePercentage = score / questions
    switch (true) {
      case scorePercentage >= 0 && scorePercentage < 0.4:
        return quiz?.lowScore
      case scorePercentage >= 0.4 && scorePercentage < 0.8:
        return quiz?.mediumScore
      case scorePercentage >= 0.8 && scorePercentage <= 1:
        return quiz?.highScore
      default:
        return null
    }
  }

  const handleRetake = () => {
    setCurrentAnswer("")
    setCorrectAnswersCount(0)
    setShowResults(false)
    setCurrentQuestionIndex(0)
  }

  const onCompleteHandle = async () => {
    const data = {
      quizId: quiz.id,
      userId: user.id,
      score: correctAnswersCount,
    }
    await saveQuizResults(data)
  }

  return (
    <div className="flex-1 dark:bg-gradient-to-b -mt-20 pt-20 from-dark-600 to-dark-800 container py-8 grid grid-rows-12 gap-4 sm:p-12 md:px-18 lg:px-96 font-lexend">
      {!showResults ? (
        <>
          <div className="row-span-4 gap-2 grid grid-rows-[auto,1fr]">
            <div className="text-center">
              <span className="text-xs">
                {currentQuestionIndex + 1} / {quiz.questions.length}
              </span>
            </div>
            <div className="px-3 flex items-center font-bold text-center overflow-auto">
              <span className="m-auto text-base sm:text-lg break-words overflow-auto">
                {quiz.questions[currentQuestionIndex].question}
              </span>
            </div>
          </div>
          <div className="row-span-8 grid grid-rows-4 gap-4">
            {quiz.questions[currentQuestionIndex].answers.map(
              (answer, index) => (
                <QuizAnswer
                  key={index}
                  onSelectAnswer={selectAnswer}
                  answer={answer}
                  disabled={disabled}
                  currentAnswer={currentAnswer}
                />
              )
            )}
          </div>
        </>
      ) : (
        <>
          <div className="row-span-10 flex flex-col text-center items-center">
            <h2 className="text-xl font-bold">Congratulations !</h2>
            <p className="mb-3 dark:text-dark-150 text-dark-400">
              You have just completed <br /> {quiz.title} quiz
            </p>
            <div className="rounded-full flex items-center justify-center mb-3 p-16 relative dark:text-dark-50 text-dark-700">
              <Icons.trophy className="absolute h-16 w-16" />
            </div>
            <h1 className="text-4xl font-bold font-space mb-3">
              Your score:
              <p>
                {correctAnswersCount} / {quiz.questions.length}
              </p>
            </h1>
            <p className="flex-1 overflow-auto text-dark-400 dark:text-dark-150">
              {renderScore(correctAnswersCount, quiz.questions.length, quiz)}
            </p>
          </div>
          <div className="row-span-2 flex flex-col justify-start gap-2">
            <Button
              className="dark:bg-dark-700"
              variant="outline"
              onClick={() => handleRetake()}
            >
              Retake the quiz
            </Button>
            <Button className="" onClick={() => onCompleteHandle()}>
              Complete
            </Button>
          </div>
        </>
      )}
    </div>
  )
}

{
}
