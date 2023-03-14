"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { dashboardConfig } from "@/config/dashboard"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/Icons"

export function DashboardNav() {
  const path = usePathname()

  return (
    <nav className="grid items-start gap-2">
      {dashboardConfig.dashboardNav.map((item, index) => {
        const Icon = Icons[item.icon!]
        return (
          <Link key={index} href={item.href!}>
            <span
              className={cn(
                "group flex items-center rounded-md px-3 py-2 text-sm font-medium dark:text-slate-200 text-slate-800 dark:hover:bg-slate-700 hover:bg-slate-100",
                path === item.href
                  ? "dark:bg-slate-700 bg-slate-200"
                  : "transparent"
              )}
            >
              <Icon className="mr-2 h-4 w-4" />
              <span>{item.title}</span>
            </span>
          </Link>
        )
      })}
    </nav>
  )
}
