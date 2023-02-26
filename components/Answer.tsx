"use client"

import { useFieldArray } from "react-hook-form"

import { Icons } from "./Icons"
import { Button } from "./ui/button"
import { Checkbox } from "./ui/checkbox"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Separator } from "./ui/separator"

//nestIndex to receive from questions useFieldArray to know current question index
export default function Answers({ nestIndex, control, register }: any) {
  const { fields, remove, append } = useFieldArray({
    control,
    name: `questions[${nestIndex}].answers`,
  })

  return (
    <div className="mt-4">
      <Label className="">Answers:</Label>
      <ul className="grid w-full mt-1.5 gap-4">
        {/* This is what we add with append */}
        {fields.map((item, k) => (
          <div
            key={item.id}
            className="flex flex-row space-x-2 justify-center items-center"
          >
            <span>{k + 1}.</span>
            <Input
              type="answer"
              {...register(`questions[${nestIndex}].answers[${k}].answer`)}
            />
            <Input
              htmlFor={`questions[${nestIndex}].answers[${k}].answer`}
              type="checkbox"
              className="w-10 h-10"
              {...register(`questions[${nestIndex}].answers[${k}].isCorrect`)}
            />
            <Button
              className="dark:hover:bg-red-800"
              variant="subtle"
              type="button"
              onClick={() => remove(k)}
            >
              <Icons.trash />
            </Button>
          </div>
        ))}

        <Button
          type="button"
          variant="subtle"
          onClick={() =>
            append({
              answer: "",
              isCorrect: false,
            })
          }
        >
          Add Answer
        </Button>
      </ul>
    </div>
  )
}
