"use client"

import React from "react"
import Link from "next/link"
import { LogOut, Settings, User } from "lucide-react"
import { signOut, useSession } from "next-auth/react"

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
import { DropdownMenuShortcut } from "./ui/dropdown-menu"

const UserDropdown = () => {
  const { data: session } = useSession()
  const { name, email, image } = session?.user || {}

  if (!email) return null

  return (
    <div className="relative inline-block text-left">
      <div className="flex">
        <nav className="mr-4 flex items-center space-x-1">
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
              <Icons.twitter className="h-5 w-5 fill-current" />
              <span className="sr-only">Twitter</span>
            </div>
          </Link>
          <ThemeToggle />
        </nav>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full">
              <Avatar>
                <AvatarImage src={`${image}`} alt={"A"} />
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
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
  )
}

export default UserDropdown
