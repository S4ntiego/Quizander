"use client"

import * as React from "react"
import Link from "next/link"
import { Glasses, Settings, Trophy, User } from "lucide-react"

import { siteConfig } from "@/config/site"
import { Icons } from "@/components/Icons"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"

export function MobileNav() {
  return (
    <div className="flex md:hidden">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center space-x-2">
            <Icons.logo />
            <span className="font-bold sm:inline-block">{siteConfig.name}</span>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="start"
          sideOffset={32}
          alignOffset={0}
          className="w-[200px] slide-in-from-top-2 overflow-auto"
          forceMount
        >
          <Link href="/">
            <DropdownMenuItem>
              <Glasses className="mr-2 h-4 w-4" />
              <span>Home</span>
              <DropdownMenuShortcut>⇧⌘H</DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>
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
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
