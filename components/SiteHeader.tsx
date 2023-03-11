"use client"

import Link from "next/link"
import { useMutation } from "@tanstack/react-query"
import { signIn, useSession } from "next-auth/react"
import { toast } from "react-toastify"

import { siteConfig } from "@/config/site"
import { Icons } from "@/components/Icons"
import { MainNav } from "@/components/MainNav"
import { ThemeToggle } from "@/components/ThemeToggle"
import { Button, buttonVariants } from "@/components/ui/button"
import UserDropdown from "./UserDropdown"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"
import { Separator } from "./ui/separator"

export function SiteHeader() {
  const { data: session, status } = useSession()
  const { image, name } = session?.user || {}

  return (
    <header className="sticky top-0 z-40 w-full border-b border-b-slate-200 bg-white dark:border-b-slate-700 dark:bg-slate-900">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav items={siteConfig.mainNav} />
        <div className="flex flex-1 items-center justify-end gap-6 space-x-4">
          {!session && status !== "loading" ? (
            <div className="flex">
              <nav className="mr-4 flex items-center space-x-1">
                <Link
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noreferrer"
                >
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
                <Link
                  href={siteConfig.links.linkedin}
                  target="_blank"
                  rel="noreferrer"
                >
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
              <Dialog>
                <DialogTrigger>
                  <Button variant="outline">Register / Log in</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Login</DialogTitle>
                    <DialogDescription>
                      Join the Quizander community. Have fun solving quizzes
                      from the the Harry Potter universe and save your
                      achievements!
                    </DialogDescription>
                    <Separator />
                    <Button
                      onClick={(e) => {
                        e.preventDefault()
                        signIn("google")
                      }}
                    >
                      Sign in with Google
                    </Button>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>
          ) : (
            <UserDropdown />
          )}
        </div>
      </div>
    </header>
  )
}
