"use client"

import Link from "next/link"
import { useSession } from "next-auth/react"
import { MainNavItem, MobileNavItem } from "types/nav"

import { siteConfig } from "@/config/site"
import { useScrollPosition } from "@/lib/hooks/useScrollPosition"
import { cn } from "@/lib/utils"
import { MainNav } from "@/components/MainNav"
import { MobileNav } from "@/components/MobileNav"
import { Icons } from "./Icons"
import { ThemeToggle } from "./ThemeToggle"
import UserDropdown from "./UserDropdown"
import { buttonVariants } from "./ui/button"

interface SiteHeaderProps {
  mainConfig: MainNavItem[]
  mobileConfig: MobileNavItem[]
}

export function SiteHeader({ mainConfig, mobileConfig }: SiteHeaderProps) {
  const { data: session, status } = useSession()
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
                <Link
                  href="/login"
                  className={cn(
                    buttonVariants({ variant: "subtle", size: "sm" }),
                    "px-4 ml-2"
                  )}
                >
                  Login
                </Link>
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
