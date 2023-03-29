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
      <ul className="grid w-full gap-2">
        {fields.map((item, index) => {
          return (
            <li
              className="border dark:border-dark-400 border-slate-300 p-6 rounded-md"
              key={item.id}
            >
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor={`questions[${index}].question`}>
                  Question {index + 1}
                </Label>
                <div className="flex flex-row">
                  <Input
                    placeholder="Question"
                    id={`questions[${index}].question`}
                    type="text"
                    {...register(`questions[${index}].question`)}
                  />
                  <Button
                    className="ml-2 dark:hover:bg-red-800"
                    variant="subtle"
                    type="button"
                    onClick={() => remove(index)}
                  >
                    <Icons.trash className="h-4 w-4" />
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
        variant="subtle"
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
        <span className="flex justify-center items-center flex-row">
          <Icons.add className="h-4 w-4 mr-1" />
          <span>Add question</span>
        </span>
      </Button>
    </>
  )
}
