"use client"

import Link from "next/link"
import { useSession } from "next-auth/react"

import { cn } from "@/lib/utils"
import { Icons } from "./Icons"
import { buttonVariants } from "./ui/button"

export function LoginButton() {
  const { status } = useSession()
  return (
    <Link
      href="/login"
      className={cn(
        buttonVariants({ variant: "subtle", size: "sm" }),
        "px-3 py-5 rounded-full"
      )}
    >
      {status === "authenticated" ? (
        <Icons.user className="h-4 w-4 text-dark-50" />
      ) : (
        <Icons.user className="h-4 w-4 text-dark-200" />
      )}
    </Link>
  )
}
