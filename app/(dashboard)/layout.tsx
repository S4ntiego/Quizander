"use client"

import React from "react"
import Link from "next/link"

import { dashboardConfig } from "@/config/dashboard"
import { siteConfig } from "@/config/site"
import { DashboardNav } from "@/components/DashboardNav"
import { Icons } from "@/components/Icons"

interface DashboardLayoutProps {
  children?: React.ReactElement
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="mx-auto flex flex-col space-y-6">
      <header className="container sticky top-0 z-40 bg-white">
        <div className="flex h-16 items-center justify-between border-b border-b-slate-200 py-4">
          <Link href="/" className="hidden items-center space-x-2 md:flex">
            <Icons.logo />
            <span className="hidden font-playfair font-black sm:inline-block">
              {siteConfig.name}
            </span>
          </Link>
        </div>
      </header>
      <div className="container grid gap-12 md:grid-cols-[200px_1fr]">
        <aside className="hidden w-[200px] flex-col md:flex">
          <DashboardNav items={dashboardConfig.sidebarNav} />
        </aside>

        <main className="flex w-full flex-1 flex-col overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  )
}
