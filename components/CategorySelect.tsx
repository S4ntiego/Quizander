"use client"

import { FC } from "react"
import { Controller, useFormContext } from "react-hook-form"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type IFormInputProps = {
  name: string
  id: string
  categories: [{ id: number; name: string }]
}

const FormInput: FC<IFormInputProps> = ({
  name,
  id,
  categories,
}: IFormInputProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext()

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <Select value={value} name="category" required onValueChange={onChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Category" className="w-[180px]" id={id} />
          </SelectTrigger>
          <SelectContent className="ml-4">
            {categories.map((category) => (
              <SelectItem key={category.id} value={`${category.id}`}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    />
  )
}

export default FormInput
