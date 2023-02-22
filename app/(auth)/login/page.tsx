"use client"

import { useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useStateContext } from "@/context"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQuery } from "@tanstack/react-query"
import { FormProvider, SubmitHandler, useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { TypeOf, object, string } from "zod"

import { getMeFn, loginUserFn } from "../../../api/authApi"
import FormInput from "../../../components/FormInput"

const loginSchema = object({
  email: string()
    .min(1, "Email address is required")
    .email("Email Address is invalid"),
  password: string()
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
})

export type LoginInput = TypeOf<typeof loginSchema>

const LoginPage = () => {
  const router = useRouter()

  const methods = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  })

  const stateContext = useStateContext()

  // API Get Current Logged-in user
  const userQuery = useQuery(["authUser"], getMeFn, {
    enabled: false,
    select: (data) => data.data.user,
    retry: 1,
    onSuccess: (data) => {
      stateContext.dispatch({ type: "SET_USER", payload: data })
    },
  })

  const {
    reset,
    handleSubmit,
    formState: { isSubmitSuccessful },
  } = methods

  // 👇 Calling the Login Mutation
  const { mutate: loginUser, isLoading } = useMutation(
    (userData: LoginInput) => loginUserFn(userData),
    {
      onSuccess: () => {
        userQuery.refetch()
        toast.success("You successfully logged in")
        router.push("/")
      },
      onError(error: any) {
        if (Array.isArray((error as any).response.data.error)) {
          ;(error as any).response.data.error.forEach((el: any) =>
            toast.error(el.message, {
              position: "top-right",
            })
          )
        } else {
          toast.error((error as any).response.data.message, {
            position: "top-right",
          })
        }
      },
    }
  )

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitSuccessful])

  const onSubmitHandler: SubmitHandler<LoginInput> = (values) => {
    // 👇 Execute the Mutation
    loginUser(values)
  }

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
            <FormInput name="email" label="Email Address" type="email" />
            <FormInput name="password" label="Password" type="password" />
            <span className="mb-1">
              Need an account? <Link href="/register">Register Here</Link>
            </span>

            <button className="w-full mt-1" type="submit">
              Sign In
            </button>
          </form>
        </FormProvider>
      </div>
    </div>
  )
}

export default LoginPage
