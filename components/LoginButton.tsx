"use client"

import Link from "next/link"
import { useSession } from "next-auth/react"

import { cn } from "@/lib/utils"
import { buttonVariants } from "./ui/button"

export function LoginButton() {
  const { status } = useSession()
  return (
    <Link
      href="/login"
      className={cn(buttonVariants({ variant: "subtle", size: "sm" }), "px-4")}
    >
      {status === "authenticated" ? "Account" : "Login"}
    </Link>
  )
}
