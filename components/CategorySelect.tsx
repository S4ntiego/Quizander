"use client"

import { FC, useState } from "react"
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
}

const FormInput: FC<IFormInputProps> = ({ name, id }: any) => {
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
            <SelectItem value="gravity falls">Gravity Falls</SelectItem>
            <SelectItem value="harry potter">Harry Potter</SelectItem>
            <SelectItem value="need for speed">Need For Speed</SelectItem>
          </SelectContent>
        </Select>
      )}
    />
  )
}

export default FormInput
