"use client"

import React, { startTransition } from "react"
import { redirect, useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { User } from "@prisma/client"
import { useSession } from "next-auth/react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { cn } from "@/lib/utils"
import { Icons } from "../Icons"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { toast } from "../ui/toast"

interface UserNameFormProps extends React.HTMLAttributes<HTMLFormElement> {
  user: Pick<User, "id" | "name">
}

export const userNameSchema = z.object({
  name: z.string().min(3).max(32),
})

type FormData = z.infer<typeof userNameSchema>

const ChangeNameForm = ({ user }) => {
  const router = useRouter()
  const [isSaving, setIsSaving] = React.useState<boolean>(false)

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(userNameSchema),
    defaultValues: {
      name: user?.name as string,
    },
  })

  async function onSubmit(data: FormData) {
    setIsSaving(true)

    const response = await fetch(`/api/users/${user?.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
      }),
    })

    setIsSaving(false)

    if (!response?.ok) {
      return toast({
        title: "Something went wrong.",
        message: "Your username could not be updated. Please try again.",
        type: "error",
      })
    }

    startTransition(() => {
      router.refresh()
    })

    toast({
      message: "Your username has been updated.",
    })
  }

  return (
    <form className={cn("overflow-hidden")} onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-1">
        <label className="sr-only" htmlFor="name">
          Name
        </label>
        <Input id="name" className="" {...register("name")} />
        {errors?.name && (
          <p className="px-2 text-xs text-red-600">{errors.name.message}</p>
        )}
      </div>
      <Button variant="default" className="w-28 h-8" disabled={isSaving}>
        {isSaving && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
        <span>Save</span>
      </Button>
    </form>
  )
}

export default ChangeNameForm
