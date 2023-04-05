"use client"

import React, { useState, useTransition } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Answer, Question as Qs, Quiz as Qz, User } from "@prisma/client"

import { cn } from "@/lib/utils"
import { toast } from "@/components/ui/toast"
import { Icons } from "./Icons"
import { QuizAnswer } from "./QuizAnswer"
import { Button } from "./ui/button"

interface QuestionWithAnswers extends Qs {
  answers: Answer[]
}

interface QuizWithQuestions extends Qz {
  questions: QuestionWithAnswers[]
}

interface QuizProps {
  quiz: QuizWithQuestions
  user: any
}

export function Quiz({ quiz, user }: QuizProps) {
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
      currentQuestionIndex === quiz?.questions.length - 1 &&
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
    <div className="h-full max-h-full overflow-clip flex justify-center items-center">
      {!showResults ? (
        <div className="container h-full max-h-[100%-20rem] grid grid-rows-12 pb-8 xs:max-w-[54rem] overflow-auto wide:grid-cols-2 wide:grid-rows-5 wide:pb-1">
          <div className="grid grid-rows-[auto,1fr] row-span-4 justify-center text-center items-center xs:row-start-2 wide:col-span-2 wide:row-span-2">
            <span className="text-xs lg:text-base text-dark-400 dark:text-dark-200">
              {currentQuestionIndex + 1} / {quiz?.questions.length}
            </span>
            <h1
              className={cn(
                "font-space break-words overflow-auto h-full m-auto text-xl flex items-center xs:pt-2 xs:pb-2 xs:text-2xl sm:text-3xl lg:text-4xl wide:text-base",
                quiz?.questions[currentQuestionIndex].question.length > 70 &&
                  "text-lg xs:text-xl sm:text-2xl lg:text-3xl"
              )}
            >
              {quiz?.questions[currentQuestionIndex].question}
            </h1>
          </div>
          <div className="grid grid-rows-4 row-span-8 gap-4 xs:mb-6 xs:row-span-6 wide:grid-cols-2 wide:col-span-2 wide:row-span-3 wide:grid-rows-2">
            {quiz?.questions[currentQuestionIndex].answers.map(
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
        <div className="h-full grid grid-rows-[auto,1fr,auto] container text-center pb-4 xs:py-4 xs:flex xs:flex-col xs:gap-4 max-h-[900px] max-w-[770px] wide:text-center wide:gap-2 wide:justify-center wide:pb-8">
          <div className="flex flex-col xxs:mb-0 mb-2 ">
            <h2 className="text-2xl font-bold font-space xs:text-3xl xs:mb-1 lg:text-4xl">
              Congratulations !
            </h2>
            <p className="dark:text-dark-200 text-dark-500 xxs:text-sm lg:text-lg">
              You have just completed <br className="wide:hidden" />
              {quiz.title} quiz
            </p>
          </div>
          <div className="flex flex-col items-center justify-center overflow-auto lg:mb-4 wide:justify-start">
            <Image
              alt="wizard_hat"
              width={400}
              height={400}
              src="/images/hero/magician_hat 2.png"
              className="w-36 h-36 xxs:mb-1 mb-1 xs:w-52 xs:h-52 lg:w-72 lg:h-72 wide:hidden"
            />
            <h1 className="xxs:text-4xl text-5xl font-bold font-space xxs:mb-4 mb-8 uppercase xs:text-6xl lg:text-7xl wide:text-5xl wide:mb-2">
              Your score <br className="wide:hidden" />
              <span>
                {correctAnswersCount} / {quiz?.questions.length}
              </span>
            </h1>
            <p className="overflow-auto text-dark-500 dark:text-dark-200 px-5 mb-4 xxs:text-sm lg:text-lg wide:mb-2 wide:max-w-lg">
              {renderScore(correctAnswersCount, quiz?.questions.length, quiz)}
            </p>
          </div>
          <div className="row-span-2 flex flex-col justify-start gap-2 lg:flex-row lg:justify-center wide:flex-row wide:justify-center">
            <Button
              className="dark:border-dark-400 h-12 rounded-3xl lg:w-56 wide:w-44"
              variant="outline"
              onClick={() => handleRetake()}
            >
              Retake the quiz
            </Button>
            <Button
              className="rounded-3xl h-12 lg:w-56 wide:w-44"
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
      )}
    </div>
  )
}
