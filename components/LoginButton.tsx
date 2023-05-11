"use client"

import Link from "next/link"
import { useSession } from "next-auth/react"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Icons } from "./Icons"
import { ThemeToggle } from "./ThemeToggle"
import { buttonVariants } from "./ui/button"

export function LoginButton() {
  const { status } = useSession()
  return (
    <div className="flex">
      <nav className="flex items-center space-x-1 mr-4">
        <Link href={siteConfig.links.github} target="_blank" rel="noreferrer">
          <div
            className={buttonVariants({
              size: "sm",
              variant: "ghost",
              className: "text-slate-700 dark:text-slate-400",
            })}
          >
            <Icons.gitHub className="h-5 w-5" />
            <span className="sr-only">GitHub</span>
          </div>
        </Link>
        <Link href={siteConfig.links.linkedin} target="_blank" rel="noreferrer">
          <div
            className={buttonVariants({
              size: "sm",
              variant: "ghost",
              className: "text-slate-700 dark:text-slate-400",
            })}
          >
            <Icons.linkedIn className="h-5 w-5 fill-current" />
            <span className="sr-only">LinkedIn</span>
          </div>
        </Link>
        <ThemeToggle />
      </nav>
      <Link
        href="/login"
        className={cn(
          buttonVariants({ variant: "subtle", size: "sm" }),
          "px-3 py-5 rounded-full bg-dark-600"
        )}
      >
        {status === "authenticated" ? (
          <Icons.user className="h-4 w-4 text-dark-50" />
        ) : (
          <Icons.user className="h-4 w-4 text-dark-200" />
        )}
      </Link>
    </div>
  )
}
