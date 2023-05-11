"use client"

import React from "react"
import Link from "next/link"
import { LogOut, Settings, Trophy, User as Usr } from "lucide-react"
import { User } from "next-auth"
import { signOut } from "next-auth/react"

import { siteConfig } from "@/config/site"
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
import { Icons } from "./Icons"
import { ThemeToggle } from "./ThemeToggle"
import { Button, buttonVariants } from "./ui/button"
import { DropdownMenuShortcut } from "./ui/dropdown-menu"

interface UserDropdownProps extends React.HTMLAttributes<HTMLDivElement> {
  user: Pick<User, "name" | "image" | "email">
}

const UserDropdown = ({ user }: UserDropdownProps) => {
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
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="relative flex items-center justify-center h-10 w-10 bg-center rounded-full"
          >
            <Avatar className="flex items-center justify-center dark:bg-dark-50 bg-dark-600 ">
              {user.image?.startsWith("https://platform") ? (
                <Icons.user className="h-5 w-5 dark:text-dark-900 text-dark-50" />
              ) : (
                <AvatarImage src={`${user.image}`} alt={"A"} />
              )}
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
                <Usr className="mr-2 h-4 w-4" />
                <span>Profile</span>
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>
            </Link>
            <Link href="/dashboard/scoreboard">
              <DropdownMenuItem>
                <Trophy className="mr-2 h-4 w-4" />
                <span>Scoreboard</span>
                <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
              </DropdownMenuItem>
            </Link>
            <Link href="/dashboard/quizzes">
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Quizzes</span>
                <DropdownMenuShortcut>⌘Q</DropdownMenuShortcut>
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
  )
}

export default UserDropdown
