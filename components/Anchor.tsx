"use client"

import React from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { buttonVariants } from "./ui/button"

export interface AnchorProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: HTMLAnchorElement["href"]
}

const Anchor = ({ href, className }: AnchorProps) => {
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault()
    const targetId = href.replace(/.*\#/, "")
    // get the element by id and use scrollIntoView
    const elem = document.getElementById(targetId)
    elem?.scrollIntoView({
      behavior: "smooth",
    })
  }

  return (
    <Link
      className={cn(
        buttonVariants({ variant: "default" }),
        "rounded-3xl",
        className
      )}
      onClick={handleScroll}
      href={href}
      passHref
      scroll={false}
    >
      Explore Quizzes
    </Link>
  )
}

export default Anchor

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

//<> -> types of attributes passed to forwardRef
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        className={cn(
          "flex h-10 w-full rounded-md border border-slate-300 bg-transparent py-2 px-3 text-sm placeholder:text-dark-200 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-dark-400 dark:text-slate-50 dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
