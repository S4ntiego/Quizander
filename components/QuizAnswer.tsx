import { cn } from "@/lib/utils"
import { Button } from "./ui/button"

export function QuizAnswer({
  answer,
  onSelectAnswer,
  currentAnswer,
  disabled,
}: any) {
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
      variant="subtle"
      disabled={disabled}
      style={{
        WebkitTapHighlightColor: "rgba(255, 255, 255, 0)",
      }}
      className={cn(
        `transition-all ease-in-out duration-500 h-16 outline-none w-full answer-text`,
        isWrongAnswer,
        isCorrectAnswer
      )}
      onClick={() => {
        onSelectAnswer(answer)
      }}
    >
      {answer?.answer}
    </Button>
  )
}
