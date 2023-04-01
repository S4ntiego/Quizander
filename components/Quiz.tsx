"use client"

import React, { useState, useTransition } from "react"
import Image from "next/image"
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
    console.log("jd")
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
      quizId: quiz?.id,
      userId: user?.id,
      score: correctAnswersCount,
    }

    if (!user) {
      router.push("/#harry_potter_quizzes")
      return
    }

    await saveQuizResults(data)
    router.push("/#harry_potter_quizzes")
  }

  return (
    <div className="h-full max-h-full overflow-clip">
      {!showResults ? (
        <div className="container h-full max-h-[100%-20rem] grid grid-rows-12 pb-8 xs:max-w-[54rem] overflow-auto">
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
        </div>
      ) : (
        <div className="h-full grid grid-rows-[1fr,auto] container">
          <div className="text-center overflow-y-scroll grid grid-rows-[auto,1fr] mb-2">
            <div className="flex flex-col xxs:mb-0 mb-2">
              <h2 className="text-2xl font-bold font-space">
                Congratulations !
              </h2>
              <p className="dark:text-dark-200 text-dark-500 xxs:text-sm">
                You have just completed <br /> {quiz.title} quiz
              </p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <Image
                alt="wizard_hat"
                width={400}
                height={400}
                src="/images/hero/magician_hat 2.png"
                className="w-36 h-36 xxs:mb-1 mb-1"
              />
              <h1 className="xxs:text-4xl text-5xl font-bold font-space xxs:mb-4 mb-8 uppercase">
                Your score
                <p>
                  {correctAnswersCount} / {quiz.questions.length}
                </p>
              </h1>
              <p className="overflow-auto text-dark-500 dark:text-dark-200 px-5 xxs:text-sm">
                {renderScore(correctAnswersCount, quiz.questions.length, quiz)}
              </p>
            </div>
          </div>
          <div className="mb-6">
            <div className="row-span-2 flex flex-col justify-start gap-2">
              <Button
                className="dark:border-dark-400 h-12 rounded-3xl"
                variant="outline"
                onClick={() => handleRetake()}
              >
                Retake the quiz
              </Button>
              <Button
                className="rounded-3xl h-12"
                onClick={() => onCompleteHandle()}
              >
                {isFetching ? (
                  <div className="flex justify-center items-center">
                    <Icons.spinner className="h-4 w-4 mr-2 animate-spin" />
                    <span>Saving your results</span>
                  </div>
                ) : (
                  <span>Complete</span>
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
