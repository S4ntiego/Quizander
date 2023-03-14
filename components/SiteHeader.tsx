import { MainNavItem, MobileNavItem } from "types/nav"

import { MainNav } from "@/components/MainNav"
import { MobileNav } from "@/components/MobileNav"
import UserDropdown from "./UserDropdown"

interface SiteHeaderProps {
  mainConfig: MainNavItem[]
  mobileConfig: MobileNavItem[]
}

export function SiteHeader({ mainConfig, mobileConfig }: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-b-slate-200 bg-white dark:border-b-slate-700 dark:bg-slate-900">
      <div className="container flex h-16 items-center">
        <MainNav mainConfig={mainConfig} />
        <MobileNav mobileConfig={mobileConfig} />
        <div className="flex flex-1 items-center justify-between space-x-2 sm:space-x-4 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none"></div>
          <nav className="flex items-center space-x-1">
            <UserDropdown />
          </nav>
        </div>
      </div>
    </header>
  )
}
