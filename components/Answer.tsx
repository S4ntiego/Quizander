"use client";

import { useFieldArray } from "react-hook-form";

//nestIndex to receive from questions useFieldArray to know current question index
export default function Answers({ nestIndex, control, register }: any) {
  const { fields, remove, append } = useFieldArray({
    control,
    name: `questions[${nestIndex}].answers`,
  });

  return (
    <div>
      <label>Answers:</label>
      {/* This is what we add with append */}
      {fields.map((item, k) => (
        <div key={item.id}>
          <input
            type="answer"
            {...register(`questions[${nestIndex}].answers[${k}].answer`)}
          />
          <input
            type="checkbox"
            {...register(`questions[${nestIndex}].answers[${k}].isCorrect`)}
          />
          <button type="button" onClick={() => remove(k)}>
            Delete Answer
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={() =>
          append({
            answer: "",
            isCorrect: false,
          })
        }
      >
        Add Answer
      </button>

      <hr />
    </div>
  );
}
