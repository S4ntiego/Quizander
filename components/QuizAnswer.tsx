import { useEffect } from "react"

import { cn } from "@/lib/utils"
import { Button } from "./ui/button"

export function QuizAnswer({
  answer,
  onSelectAnswer,
  currentAnswer,
  disabled,
}: any) {
  const getFontSize = (textLength) => {
    const baseSize = 160
    if (textLength > baseSize) {
      textLength = baseSize - 158
    }
    const fontSize = baseSize - (textLength + 155.1)
    return `${fontSize}vw`
  }

  useEffect(() => {
    const boxes = document.querySelectorAll("#box p")

    boxes.forEach((box) => {
      box.style.fontSize = getFontSize(box.textContent.length)
    })
  }, [])

  const isCorrectAnswer =
    currentAnswer && answer?.isCorrect === true
      ? "dark:bg-green-800 hover:bg-green-700 dark:hover:bg-green-800 bg-green-700 text-slate-50 disabled:opacity-100 border-green-600"
      : ""
  const isWrongAnswer =
    currentAnswer === answer && answer?.isCorrect === false
      ? "dark:bg-red-800 dark:hover:bg-red-800 hover:bg-red-700 bg-red-700 text-slate-50 disabled:opacity-100 border-red-600"
      : ""

  return (
    <Button
      id="box"
      variant="subtle"
      disabled={disabled}
      style={{
        WebkitTapHighlightColor: "rgba(255, 255, 255, 0)",
      }}
      className={cn(
        `transition-all ease-in-out duration-500 h-full outline-none text-center`,
        isWrongAnswer,
        isCorrectAnswer
      )}
      onClick={() => {
        onSelectAnswer(answer)
      }}
    >
      <p id="elo" className="text-sm">
        {answer?.answer}
      </p>
    </Button>
  )
}
