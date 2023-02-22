"use client";

import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { object, string, TypeOf } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "../../../components/FormInput";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { signUpUserFn } from "../../../api/authApi";
import Link from "next/link";

const registerSchema = object({
  name: string().min(1, "Full name is required").max(100),
  email: string()
    .min(1, "Email address is required")
    .email("Email Address is invalid"),
  password: string()
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
  passwordConfirm: string().min(1, "Please confirm your password"),
}).refine((data) => data.password === data.passwordConfirm, {
  path: ["passwordConfirm"],
  message: "Passwords do not match",
});

export type RegisterInput = TypeOf<typeof registerSchema>;

const RegisterPage = () => {
  const methods = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitSuccessful },
  } = methods;

  // 👇 Calling the Register Mutation
  const { mutate, isLoading } = useMutation(
    (userData: RegisterInput) => signUpUserFn(userData),
    {
      onSuccess(data) {
        toast.success(data?.message);
      },
      onError(error: any) {
        if (Array.isArray((error as any).response.data.error)) {
          // (error as any).response.data.error.forEach((el: any) =>
          //   toast.error(el.message, {
          //     position: "top-right",
          //   })
          // );
          console.log(error);
        } else {
          toast.error((error as any).response.data.message, {
            position: "top-right",
          });
        }
      },
    }
  );

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitSuccessful]);

  const onSubmitHandler: SubmitHandler<RegisterInput> = (values) => {
    // 👇 Execute the Mutation
    mutate(values);
  };

  return (
    <div className="container flex items-center justify-center min-h-screen">
      <div className="flex items-center justify-center flex-col">
        <h1 className="text-center mb-2">Welcome to Harrivia!</h1>
        <h2 className="mb-2">Sign Up To Get Started!</h2>

        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmitHandler)}
            noValidate
            className="w-full p-1 border-2 max-w-36"
          >
            <FormInput name="name" label="Full Name" />
            <FormInput name="email" label="Email Address" type="email" />
            <FormInput name="password" label="Password" type="password" />
            <FormInput
              name="passwordConfirm"
              label="Confirm Password"
              type="password"
            />
            <span className="mb-1">
              Already have an account? <Link href="/login">Login Here</Link>
            </span>

            <button className="w-full mt-1" type="submit">
              Sign Up
            </button>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default RegisterPage;
