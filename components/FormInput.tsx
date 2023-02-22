"use client";

import { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";

type IFormInputProps = {
  name: string;
  label: string;
  type?: string;
};

const FormInput: FC<IFormInputProps> = ({ name, label, type }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      control={control}
      defaultValue=""
      name={name}
      render={({ field }) => (
        <div className="w-full mb-2">
          <label htmlFor={name}>{label}</label>
          <input
            {...field}
            className=" no-underline border border-1 w-full"
            type={type}
          />
          <p>{errors[name]?.message as unknown as string}</p>
        </div>
      )}
    />
  );
};

export default FormInput;
