"use client"

import Link from "next/link"
import { getServerSession } from "next-auth"
import { signIn, useSession } from "next-auth/react"
import { MainNavItem, MobileNavItem } from "types/nav"

import { siteConfig } from "@/config/site"
import { useScrollPosition } from "@/lib/hooks/useScrollPosition"
import { getCurrentUser } from "@/lib/session"
import { cn } from "@/lib/utils"
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

interface SiteHeaderProps {
  mainConfig: MainNavItem[]
  mobileConfig: MobileNavItem[]
}

export function SiteHeader({ mainConfig, mobileConfig }: SiteHeaderProps) {
  const session = getServerSession()

  const scrollPosition = useScrollPosition()

  return (
    <div
      className={cn(
        "sticky top-0 h-20 w-full flex items-center justify-center z-40 wide:h-14",
        scrollPosition > 0 &&
          "dark:bg-dark-600 border-b dark:border-dark-400 border-dark-200 bg-dark-100"
      )}
    >
      <div className={cn("flex justify-between container")}>
        <MainNav mainConfig={mainConfig} />
        <MobileNav mobileConfig={mobileConfig} />

        <div className="flex items-center justify-between space-x-2 sm:space-x-4 md:justify-end">
          <div className="w-full md:w-auto md:flex-none"></div>
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
                      className="flex hover:bg-slate-100 dark:hover:text-slate-100 cursor-pointer items-center justify-center h-9 w-9 px-2 ml-3 rounded-full bg-slate-100 dark:bg-dark-500 dark:text-slate-400"
                    />
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader className="flex space-y-4">
                      <DialogTitle>Login / Register</DialogTitle>
                      <DialogDescription>
                        Join the Quizander community. Have fun solving quizzes
                        from the the Harry Potter universe and save your
                        achievements!
                      </DialogDescription>
                      <Button
                        className="flex justify-start rounded-3xl"
                        onClick={(e) => {
                          e.preventDefault()
                          signIn("google", {
                            redirect: false,
                            callbackUrl: "/dashboard/quizzes",
                          })
                        }}
                      >
                        <svg
                          className="h-6 w-6 mr-2"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                          viewBox="0 0 1024 1024"
                        >
                          <path
                            d="M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zM679 697.6C638.4 735 583 757 516.9 757c-95.7 0-178.5-54.9-218.8-134.9A245.02 245.02 0 0 1 272 512c0-39.6 9.5-77 26.1-110.1c40.3-80.1 123.1-135 218.8-135c66 0 121.4 24.3 163.9 63.8L610.6 401c-25.4-24.3-57.7-36.6-93.6-36.6c-63.8 0-117.8 43.1-137.1 101c-4.9 14.7-7.7 30.4-7.7 46.6s2.8 31.9 7.7 46.6c19.3 57.9 73.3 101 137 101c33 0 61-8.7 82.9-23.4c26-17.4 43.2-43.3 48.9-74H516.9v-94.8h230.7c2.9 16.1 4.4 32.8 4.4 50.1c0 74.7-26.7 137.4-73 180.1z"
                            fill="currentColor"
                          ></path>
                        </svg>
                        <span>Sign in with Google</span>
                      </Button>
                      <Button
                        className="flex justify-start rounded-3xl"
                        onClick={(e) => {
                          e.preventDefault()
                          signIn("facebook", {
                            redirect: false,
                            callbackUrl: "/dashboard/quizzes",
                          })
                        }}
                      >
                        <svg
                          className="h-6 w-6 mr-2"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                          viewBox="0 0 32 32"
                        >
                          <path
                            d="M26.67 4H5.33A1.34 1.34 0 0 0 4 5.33v21.34A1.34 1.34 0 0 0 5.33 28h11.49v-9.28H13.7v-3.63h3.12v-2.67c0-3.1 1.89-4.79 4.67-4.79c.93 0 1.86 0 2.79.14V11h-1.91c-1.51 0-1.8.72-1.8 1.77v2.31h3.6l-.47 3.63h-3.13V28h6.1A1.34 1.34 0 0 0 28 26.67V5.33A1.34 1.34 0 0 0 26.67 4z"
                            fill="currentColor"
                          ></path>
                        </svg>
                        <span>Sign in with Facebook</span>
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
    </div>
  )
}
