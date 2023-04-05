"use client"

import React, { useEffect } from "react"
import { useStateContext } from "@/context"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { TypeOf, object, string, z } from "zod"

const updateUserSchema = object({
  name: string().min(1, "Name is required").max(100).optional(),
  email: string()
    .min(1, "Email address is required")
    .email("Email Address is invalid")
    .optional(),
  createdAt: string().min(1, "Member since is required").optional(),
}).partial()

type UpdateUserInput = TypeOf<typeof updateUserSchema>

export function Profile() {
  const stateContext = useStateContext()
  const user = stateContext.state.authUser

  const methods = useForm<UpdateUserInput>({
    resolver: zodResolver(updateUserSchema),
  })

  const onSubmit = (updateData: any) => {
    console.log("update user submit")
  }

  useEffect(() => {
    if (user) {
      methods.reset({
        name: user.name as string,
        email: user.email as string,
        createdAt: user.createdAt as string,
      })
    }
  }, [user, methods])

  return (
    <div className="container h-full max-w-4xl py-6 lg:py-10">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <label htmlFor="name">Name</label>
          <br />
          <input {...methods.register("name")} />
          <br />
          <label htmlFor="email">Email</label>
          <br />
          <input type="email" {...methods.register(`email`)} />
          <br />
          <label htmlFor="createdAt">Member since</label>
          <br />
          <input type="text" {...methods.register(`createdAt`)} />
          <br />
          <input type="submit" />
        </form>
      </div>
    </div>
  )
}
