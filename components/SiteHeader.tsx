import Link from "next/link"
import { signIn, useSession } from "next-auth/react"
import { MainNavItem, MobileNavItem } from "types/nav"

import { siteConfig } from "@/config/site"
import { useScrollPosition } from "@/lib/hooks/useScrollPosition"
import { cn } from "@/lib/utils"
import { MainNav } from "@/components/MainNav"
import { MobileNav } from "@/components/MobileNav"
import { ClientHeader } from "./ClientHeader"
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
        "sticky top-0 h-20 w-full flex items-center justify-center z-40 bg-transparent container"
      )}
    >
      <Link href="/" className="mr-6 items-center space-x-2 hidden sm:flex">
        <Icons.logo className="h-6 w-6" />
        <span className=" font-bold ">{siteConfig.name}</span>
      </Link>
      <ClientHeader mainConfig={mainConfig} mobileConfig={mobileConfig} />
    </div>
  )
}
