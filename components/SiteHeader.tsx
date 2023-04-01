import Link from "next/link"
import { signIn, useSession } from "next-auth/react"
import { MainNavItem, MobileNavItem } from "types/nav"

import { siteConfig } from "@/config/site"
import { useScrollPosition } from "@/lib/hooks/useScrollPosition"
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
  return (
    <div
      className={cn(
        "sticky top-0 h-20 w-full flex items-center justify-center z-40 dark:bg-dark-400 bg-dark-150"
      )}
    >
      <div className={cn("flex justify-between container")}>
        <MainNav mainConfig={mainConfig} />
        <MobileNav mobileConfig={mobileConfig} />
        <UserDropdown />
      </div>
    </div>
  )
}
