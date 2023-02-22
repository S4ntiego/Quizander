"use client"

import React from "react"
import { useFieldArray } from "react-hook-form"

import Answers from "@/components/Answer"

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
      <ul>
        {fields.map((item, index) => {
          return (
            <li key={item.id}>
              <label htmlFor={`questions[${index}].question`}>
                Question {index + 1}
              </label>
              <br />
              <input
                type="text"
                {...register(`questions[${index}].question`)}
              />

              <button type="button" onClick={() => remove(index)}>
                Delete
              </button>
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

      <button
        type="button"
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
      </button>
    </>
  )
}
