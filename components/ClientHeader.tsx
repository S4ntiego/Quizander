"use client"

import { useSession } from "next-auth/react"

import { MainNavItem, MobileNavItem } from "@/types/nav"
import { useScrollPosition } from "@/lib/hooks/useScrollPosition"
import { cn } from "@/lib/utils"
import { MainNav } from "./MainNav"
import { MobileNav } from "./MobileNav"
import { UserDropdown } from "./UserDropdown"

interface SiteHeaderProps {
  mainConfig: MainNavItem[]
  mobileConfig: MobileNavItem[]
}

export function ClientHeader({ mainConfig, mobileConfig }: SiteHeaderProps) {
  const scrollPosition = useScrollPosition()
  const session = useSession()
  const user = session?.data?.user

  return (
    <div
      className={cn(
        "sticky top-0 h-20 w-full flex items-center justify-center z-40 bg-transparent",
        scrollPosition > 0 &&
          "dark:bg-dark-600 border-b dark:border-dark-400 border-dark-200 bg-dark-100"
      )}
    >
      <div className={cn("flex justify-between w-full")}>
        <MainNav mainConfig={mainConfig} />
        <MobileNav mobileConfig={mobileConfig} />
        <UserDropdown
          user={{
            name: user?.name,
            image: user?.image,
            email: user?.email,
          }}
        />
      </div>
    </div>
  )
}
