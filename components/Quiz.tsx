"use client"

import React, { useState } from "react"
import Link from "next/link"

import { Icons } from "./Icons"
import { QuizAnswer } from "./QuizAnswer"
import { Button } from "./ui/button"

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
    <div className="flex-1 -mt-20 pt-20 dark:bg-gradient-to-b from-dark-900 via-slate-900 to-dark-900">
      <div className="container max-w-[700px] h-full pb-6 grid grid-rows-12 gap-4 xs:pb-36 font-lexend">
        {!showResults ? (
          <>
            <div className="row-span-4 xs:row-start-3 gap-2 grid grid-rows-[auto,1fr]">
              <div className="text-center">
                <span className="text-xs xs:text-base">
                  {currentQuestionIndex + 1} / {quiz.questions.length}
                </span>
              </div>
              <div className="px-3 flex items-center font-bold text-center overflow-auto">
                <span className="m-auto text-base xs:text-2xl break-words overflow-auto">
                  {quiz.questions[currentQuestionIndex].question}
                </span>
              </div>
            </div>
            <div className="row-span-8 grid grid-rows-4 gap-4 mb-6">
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
            <a
              href="/#harry_potter_quizzes"
              className="hidden xs:inline-flex items-center justify-center font-lexend text-sm font-medium hover:text-dark-900 dark:hover:text-dark-100 dark:text-dark-200 text-dark-400 mr-2"
            >
              <Icons.chevronLeft className="mr-2 h-4 w-4" />
              See all quizzes
            </a>
          </>
        ) : (
          <>
            <div className="row-span-10 xs:row-span-6 flex flex-col text-center items-center mb-3">
              <h2 className="text-xl xs:text-3xl xs:mb-1 font-bold">
                Congratulations !
              </h2>
              <p className="mb-3 xs:mb-12 dark:text-dark-200 text-dark-500 xs:text-xl">
                You have just completed <br /> {quiz.title} quiz
              </p>
              <div className="rounded-full flex items-center justify-center mb-1 xs:mb-12 p-14 relative dark:text-dark-50 text-dark-700">
                <Icons.trophy className="absolute h-16 w-16 xs:h-36 xs:w-36" />
              </div>
              <h1 className="text-4xl xs:text-7xl font-bold font-space mb-7 xs:mb-16">
                Your score:
                <p>
                  {correctAnswersCount} / {quiz.questions.length}
                </p>
              </h1>
              <p className="flex-1 overflow-auto xs:text-xl text-dark-500 dark:text-dark-200">
                {renderScore(correctAnswersCount, quiz.questions.length, quiz)}
              </p>
            </div>
            <div className="row-span-2 flex flex-col xs:flex-row xs:justify-center justify-start gap-2">
              <Button
                className="dark:bg-dark-700 xs:w-48 xs:h-12"
                variant="outline"
                onClick={() => handleRetake()}
              >
                Retake the quiz
              </Button>
              <Button
                className="xs:w-48 xs:h-12"
                onClick={() => onCompleteHandle()}
              >
                Complete
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

{
}
