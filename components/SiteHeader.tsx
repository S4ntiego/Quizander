"use client"

import Link from "next/link"
import { signIn, useSession } from "next-auth/react"
import { MainNavItem, MobileNavItem } from "types/nav"

import { siteConfig } from "@/config/site"
import { MainNav } from "@/components/MainNav"
import { MobileNav } from "@/components/MobileNav"
import { Icons } from "./Icons"
import { ThemeToggle } from "./ThemeToggle"
import UserDropdown from "./UserDropdown"
import { Button, buttonVariants } from "./ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"
import { Separator } from "./ui/separator"

interface SiteHeaderProps {
  mainConfig: MainNavItem[]
  mobileConfig: MobileNavItem[]
}

export function SiteHeader({ mainConfig, mobileConfig }: SiteHeaderProps) {
  const { data: session, status } = useSession()
  const { image, name } = session?.user || {}

  return (
    <header className="sticky top-0 z-40 w-full border-b border-b-slate-200 bg-white dark:border-b-slate-700 dark:bg-slate-900">
      <div className="container flex h-16 items-center">
        <MainNav mainConfig={mainConfig} />
        <MobileNav mobileConfig={mobileConfig} />
        <div className="flex flex-1 items-center justify-between space-x-2 sm:space-x-4 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none"></div>
          <nav className="flex items-center">
            {!session && status !== "loading" ? (
              <div className="flex justify-center items-center">
                <nav className="flex items-center space-x-1">
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
                  <DialogTrigger
                    asChild
                    className="flex items-center justify-center relative"
                  >
                    <Icons.user
                      style={{
                        WebkitTapHighlightColor: "rgba(255, 255, 255, 0)",
                      }}
                      className="flex hover:bg-slate-100 dark:hover:text-slate-100 cursor-pointer items-center justify-center h-9 w-9 px-2 ml-3 rounded-full bg-slate-100 dark:bg-slate-800 dark:text-slate-400"
                    />
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader className="flex space-y-4">
                      <DialogTitle>Login</DialogTitle>
                      <DialogDescription>
                        Join the Quizander community. Have fun solving quizzes
                        from the the Harry Potter universe and save your
                        achievements!
                      </DialogDescription>
                      <Button
                        onClick={(e) => {
                          e.preventDefault()
                          signIn("google")
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-google mr-2"
                          viewBox="0 0 16 16"
                        >
                          <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
                        </svg>
                        <span>Sign in with Google</span>
                      </Button>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </div>
            ) : (
              <UserDropdown />
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}
