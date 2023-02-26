"use client"

import React from "react"
import { useFieldArray } from "react-hook-form"

import Answers from "@/components/Answer"
import { Icons } from "@/components/Icons"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Separator } from "./ui/separator"

//setValue, getValues
export default function Questions({
  control,
  register,
  setValue,
  getValues,
}: any) {
  const { fields, remove } = useFieldArray({
    control,
    name: "questions",
  })

  return (
    <>
      <ul className="grid w-full gap-8">
        {fields.map((item, index) => {
          return (
            <li
              className="border border-slate-600 p-6 rounded-md"
              key={item.id}
            >
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor={`questions[${index}].question`}>
                  Question {index + 1}
                </Label>
                <div className="flex flex-row">
                  <Input
                    type="text"
                    {...register(`questions[${index}].question`)}
                  />
                  <Button
                    className="ml-2 dark:hover:bg-red-800"
                    variant="subtle"
                    type="button"
                    onClick={() => remove(index)}
                  >
                    <Icons.trash />
                  </Button>
                </div>
              </div>

              {/* {...{control, register}} is equivalent to control={control} register={register} */}
              {/* forward original register and control from the main component */}
              <Answers
                nestIndex={index}
                control={control}
                register={register}
              />
            </li>
          )
        })}
      </ul>

      <Button
        type="button"
        variant="outline"
        onClick={() => {
          //work like append() from useFieldArray
          setValue("questions", [
            ...getValues().questions,
            {
              question: "",
              answers: [
                { answer: "", isCorrect: false },
                { answer: "", isCorrect: false },
                { answer: "", isCorrect: false },
                { answer: "", isCorrect: false },
              ],
            },
          ])
        }}
      >
        Add Question
      </Button>
    </>
  )
}
