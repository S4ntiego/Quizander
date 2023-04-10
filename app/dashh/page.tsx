"use client"

import * as React from "react"
import { redirect, useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useSession } from "next-auth/react"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { cn } from "@/lib/utils"
import { Card } from "@/components/Card"
import { DashboardContainer } from "@/components/Dashboard/DashboardContainer"
import { DashboardHeader } from "@/components/Dashboard/DashboardHeader"
import { Icons } from "@/components/Icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/toast"

const userNameSchema = z.object({
  name: z.string().min(3).max(32),
})

type FormData = z.infer<typeof userNameSchema>

export async function UserNameForm() {
  const session = await useSession()

  if (session.status === "loading") {
    return <div>loading</div>
  }

  if (session.status === "unauthenticated") {
    redirect("/")
  }

  const user = session?.data?.user

  const router = useRouter()
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
  const [isSaving, setIsSaving] = React.useState<boolean>(false)

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

    toast({
      message: "Your username has been updated.",
    })

    router.refresh()
  }

  return (
    <DashboardContainer>
      <DashboardHeader
        heading="User Profile"
        text="Manage your user profile."
      />
      <div className="grid gap-10">
        <form
          className={cn("overflow-hidden")}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Card>
            <Card.Header>
              <Card.Title>Your Name</Card.Title>
              <Card.Description>
                Please enter your full name or a display name you are
                comfortable with.
              </Card.Description>
            </Card.Header>
            <Card.Content>
              <div className="grid gap-1">
                <label className="sr-only" htmlFor="name">
                  Name
                </label>
                <Input id="name" className="" {...register("name")} />
                {errors?.name && (
                  <p className="px-2 text-xs text-red-600">
                    {errors.name.message}
                  </p>
                )}
              </div>
            </Card.Content>
            <Card.Footer>
              <Button
                variant="default"
                className="w-28 h-8"
                disabled={isSaving}
              >
                {isSaving && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                <span>Save</span>
              </Button>
            </Card.Footer>
          </Card>
        </form>
      </div>
    </DashboardContainer>
  )
}
