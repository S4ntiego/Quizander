import { cn } from "@/lib/utils"

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
    <button
      id="box"
      disabled={disabled}
      style={{
        WebkitTapHighlightColor: "rgba(255, 255, 255, 0)",
      }}
      className={cn(
        `transition-all max-w-full overflow-auto ease-in-out duration-500 h-full break-words xs:text-base border border-dark-200 bg-transparent hover:bg-slate-100 dark:border-dark-400 dark:text-dark-100 inline-flex items-center justify-center rounded-md text-sm font-medium  dark:hover:bg-dark-400 dark:hover:text-slate-100 disabled:opacity-50 disabled:pointer-events-none px-3`,
        answer?.answer.length > 80 && "text-xs xs:text-sm",
        isWrongAnswer,
        isCorrectAnswer
      )}
      onClick={() => {
        onSelectAnswer(answer)
      }}
    >
      <p className="m-auto">{answer?.answer}</p>
    </button>
  )
}
