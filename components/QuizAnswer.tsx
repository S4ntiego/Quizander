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
      ? "dark:bg-red-800 bg-red-700 text-slate-50 disabled:opacity-100 border-red-600"
      : ""
  const isOtherAnswer = currentAnswer && currentAnswer !== answer ? "" : ""

  return (
    <Button
      variant="subtle"
      disabled={disabled}
      className={cn(
        `outline-none focus:ring-0`,
        isOtherAnswer,
        isWrongAnswer,
        isCorrectAnswer
      )}
      onClick={() => {
        onSelectAnswer(answer)
      }}
    >
      <div className="answer-text">{answer?.answer}</div>
    </Button>
  )
}
