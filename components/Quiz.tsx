"use client"

import React, { useState, useTransition } from "react"
import { useRouter } from "next/navigation"

import { cn } from "@/lib/utils"
import { toast } from "@/components/ui/toast"
import { Icons } from "./Icons"
import { QuizAnswer } from "./QuizAnswer"
import { Button } from "./ui/button"

export function Quiz({ quiz, user }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [currentAnswer, setCurrentAnswer] = useState("")
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0)
  const [showResults, setShowResults] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [isFetching, setIsFetching] = useState(false)
  const router = useRouter()

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

  async function saveQuizResults(data) {
    setIsFetching(true)
    const response = await fetch(`/api/quiz/saveResults`, {
      body: JSON.stringify(data),
      method: "POST",
    })

    if (!response?.ok) {
      toast({
        title: "Something went wrong.",
        message: "Your results could not be saved. Please try again.",
        type: "error",
      })

      return
    }

    startTransition(() => {
      setIsFetching(false)
      router.refresh()
    })
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
    router.push("#harry_potter_quizzes")
  }

  return (
    <div className="flex-1 -mt-20 pt-20 dark:bg-gradient-to-t from-dark-700 to-dark-600">
      <div className="container h-full max-h-[100%-20rem] grid grid-rows-12 pb-8 xs:max-w-[54rem] overflow-auto">
        {!showResults ? (
          <>
            <div className="grid grid-rows-[auto,1fr] row-span-4 justify-center text-center items-center xs:row-start-2">
              <span className="text-xs lg:text-base text-dark-400 dark:text-dark-200">
                {currentQuestionIndex + 1} / {quiz.questions.length}
              </span>
              <h1
                className={cn(
                  "font-space break-words overflow-auto h-full m-auto text-xl flex items-center xs:pt-2 xs:pb-14 xs:text-2xl sm:text-3xl lg:text-4xl",
                  quiz.questions[currentQuestionIndex].question.length > 95 &&
                    "text-lg"
                )}
              >
                {quiz.questions[currentQuestionIndex].question}
              </h1>
            </div>
            <div className="grid grid-rows-4 row-span-8 gap-4 xs:mb-6 xs:row-span-6">
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
            <div className="row-span-10 flex flex-col text-center items-center mb-2 justify-center container">
              <h2 className="text-xl font-bold font-space">
                Congratulations !
              </h2>
              <p className="mb-3 dark:text-dark-200 text-dark-500">
                You have just completed <br /> {quiz.title} quiz
              </p>
              <div className="rounded-full flex items-center justify-center mb-1 p-14 relative dark:text-dark-50 text-dark-700">
                <Icons.trophy className="absolute h-16 w-16" />
              </div>
              <h1 className="text-4xl font-bold font-space mb-7 uppercase">
                Your score
                <p>
                  {correctAnswersCount} / {quiz.questions.length}
                </p>
              </h1>
              <p className="overflow-auto text-dark-500 dark:text-dark-200">
                {renderScore(correctAnswersCount, quiz.questions.length, quiz)}
              </p>
            </div>
            <div className="row-span-2 flex flex-col justify-start gap-2">
              <Button
                className="container dark:border-dark-400"
                variant="outline"
                onClick={() => handleRetake()}
              >
                Retake the quiz
              </Button>
              <Button className="container" onClick={() => onCompleteHandle()}>
                {isFetching ? (
                  <div>
                    <Icons.spinner className="h-4 w-4 mr-2 animate-spin" />
                    <span>Saving your results</span>
                  </div>
                ) : (
                  <span>Complete</span>
                )}
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
