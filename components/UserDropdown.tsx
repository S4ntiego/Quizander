"use client"

import React from "react"
import Link from "next/link"
import { LogOut, Settings, Trophy, User as Usr } from "lucide-react"
import { User } from "next-auth"
import { signOut } from "next-auth/react"

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
import { Button } from "./ui/button"
import { DropdownMenuShortcut } from "./ui/dropdown-menu"

interface UserDropdownProps extends React.HTMLAttributes<HTMLDivElement> {
  user: Pick<User, "name" | "image" | "email">
}

const UserDropdown = ({ user }: UserDropdownProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative flex items-center justify-center h-10 w-10 bg-center rounded-full"
        >
          <Avatar className="flex items-center justify-center dark:bg-dark-50 group dark:hover:bg-dark-400 bg-dark-600 hover:bg-slate-600">
            {user.image?.startsWith("https://platform") ? (
              <Icons.user className="h-5 w-5 dark:text-dark-900 text-dark-50 dark:group-hover:text-dark-150" />
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
  )
}

export default UserDropdown
