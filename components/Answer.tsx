"use client"

import {
  Control,
  FieldValues,
  UseFormRegister,
  useFieldArray,
} from "react-hook-form"

import { Icons } from "./Icons"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"

interface AnswersProps {
  nestIndex: number
  control: Control<FieldValues>
  register: UseFormRegister<FieldValues>
}

//nestIndex to receive from questions useFieldArray to know current question index
const Answers = ({ nestIndex, control, register }: AnswersProps) => {
  const { fields, remove, append } = useFieldArray({
    control,
    name: `questions[${nestIndex}].answers`,
  })

  return (
    <div className="mt-4">
      <Label className="">Answers:</Label>
      <ul className="grid w-full mt-1.5 gap-4">
        {/* append */}
        {fields.map((item, k) => (
          <div
            key={item.id}
            className="flex flex-row space-x-2 justify-center items-center"
          >
            <Label htmlFor={`questions[${nestIndex}].answers[${k}].answer`}>
              {k + 1}.
            </Label>
            <Input
              placeholder="Answer"
              id={`questions[${nestIndex}].answers[${k}].answer`}
              type="text"
              {...register(`questions[${nestIndex}].answers[${k}].answer`)}
            />

            <Label
              htmlFor={`questions[${nestIndex}].answers[${k}].answer`}
            ></Label>
            <Input
              id={`questions[${nestIndex}].answers[${k}].answer`}
              type="checkbox"
              className="appearance-none h-10 w-12 shrink-0 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 dark:border-dark-400 dark:text-slate-50 dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900 flex items-center justify-center checked:bg-slate-800 dark:checked:bg-slate-400"
              {...register(`questions[${nestIndex}].answers[${k}].isCorrect`)}
            />

            <Button
              className="dark:hover:bg-red-800 hover:bg-red-500"
              variant="subtle"
              type="button"
              aria-label="deleteAnswer"
              onClick={() => remove(k)}
            >
              <Icons.trash className="h-4 w-4" />
            </Button>
          </div>
        ))}

        <Button
          type="button"
          variant="subtle"
          aria-label="appendAnswer"
          onClick={() =>
            append({
              answer: "",
              isCorrect: false,
            })
          }
        >
          <span className="flex justify-center items-center flex-row">
            <Icons.add className="h-4 w-4 mr-1" />
            <span>Add answer</span>
          </span>
        </Button>
      </ul>
    </div>
  )
}

export default Answers
