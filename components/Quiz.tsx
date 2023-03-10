"use client"

import React, { useState } from "react"
import Link from "next/link"
import { useStateContext } from "@/context"

import { Icons } from "@/components/Icons"
import { QuizAnswer } from "./QuizAnswer"
import { Button } from "./ui/button"
import { Separator } from "./ui/separator"

export function Quiz({ quiz }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [currentAnswer, setCurrentAnswer] = useState("")
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0)
  const [showResults, setShowResults] = useState(false)
  const [disabled, setDisabled] = useState(false)

  const stateContext = useStateContext()
  const user = stateContext.state.authUser

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

  const onCompleteHandle = () => {
    // if (user) {
    //   saveQuizDataFn(quiz._id, correctAnswersCount, quiz.title)
    // } else {
    //   console.log("quiz completed")
    // }

    console.log("TODO")
  }

  return (
    <div className="container flex items-center justify-center w-[896px] dark:text-slate-400">
      {!showResults ? (
        <div>
          <div className="flex flex-col h-full items-center justify-center text-center gap-6">
            <p className="text-md">
              {currentQuestionIndex + 1} / {quiz.questions.length}
            </p>
            <h1 className="tracking-tight text-4xl font-black font-playfair leading-tight dark:text-slate-50 text-slate-900 lg:text-5xl">
              {quiz.questions[currentQuestionIndex].question}
            </h1>
          </div>
          <div className="flex flex-col justify-center my-10 gap-4">
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
          <Separator />
          <div className="flex justify-center pt-6 pt:py-10">
            <Link
              href="/"
              className="inline-flex items-center justify-center text-sm font-medium dark:text-slate-400 text-slate-600 hover:text-slate-900"
            >
              <Icons.chevronLeft className="mr-2 h-4 w-4" />
              See all quizzes
            </Link>
          </div>
        </div>
      ) : (
        <div className="flex flex-col text-center items-center justify-center max-w-2xl">
          <div>
            <h1 className="font-playfair scroll-m-20 text-xl">
              Congratulations! You have finished the <br />{" "}
              <span className="italic">{quiz.title}</span> quiz.
            </h1>
          </div>
          <div>
            <h1 className="font-playfair scroll-m-20 mt-10 text-2xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50 border-b dark:border-b-slate-200 border-b-slate-400">
              Your score:
            </h1>
            <h1 className="scroll-m-20 text-7xl text-slate-900 font-fraunces mt-2 font-bold dark:text-slate-50 ">
              {correctAnswersCount}/{quiz.questions.length}
            </h1>
          </div>
          <h1 className="font-playfair scroll-m-20 text-xl mt-10">
            {renderScore(correctAnswersCount, quiz.questions.length, quiz)}
          </h1>
          <div className="flex flex-row gap-2 mt-10">
            <Button variant="outline" onClick={() => handleRetake()}>
              Retake the quiz
            </Button>
            <Button onClick={() => onCompleteHandle()}>Complete</Button>
          </div>
        </div>
      )}
    </div>
  )
}
