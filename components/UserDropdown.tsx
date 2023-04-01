"use client"

import React from "react"
import Link from "next/link"
import { LogOut, Settings, Trophy, User } from "lucide-react"
import { signIn, signOut, useSession } from "next-auth/react"

import { siteConfig } from "@/config/site"
import { Icons } from "@/components/Icons"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ThemeToggle } from "./ThemeToggle"
import { Button, buttonVariants } from "./ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"
import { DropdownMenuShortcut } from "./ui/dropdown-menu"

const UserDropdown = () => {
  const { data: session, status } = useSession()
  const { name, email, image } = session?.user || {}

  return (
    <div className="flex items-center justify-between space-x-2 sm:space-x-4 md:justify-end">
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
                  <DialogTitle>Login</DialogTitle>
                  <DialogDescription>
                    Join the Quizander community. Have fun solving quizzes from
                    the the Harry Potter universe and save your achievements!
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
          <div className="relative inline-block text-left">
            <div className="flex">
              <nav className="mr-2 flex items-center space-x-1">
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
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative flex items-center justify-center h-10 w-10 bg-center rounded-full"
                  >
                    <Avatar>
                      <AvatarImage src={`${image}`} alt={"A"} />
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  sideOffset={24}
                  alignOffset={0}
                  className="w-[200px] slide-in-from-top-2 overflow-auto"
                  forceMount
                >
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <Link href="/dashboard/profile">
                      <DropdownMenuItem>
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                        <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                      </DropdownMenuItem>
                    </Link>
                    <Link href="/dashboard/scoreboard">
                      <DropdownMenuItem>
                        <Trophy className="mr-2 h-4 w-4" />
                        <span>Scoreboard</span>
                        <DropdownMenuShortcut>⌘R</DropdownMenuShortcut>
                      </DropdownMenuItem>
                    </Link>
                    <Link href="/dashboard">
                      <DropdownMenuItem>
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Dashboard</span>
                        <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
                      </DropdownMenuItem>
                    </Link>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => signOut()}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                    <DropdownMenuShortcut>⇧⌘L</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        )}
      </nav>
    </div>
  )
}

export default UserDropdown
