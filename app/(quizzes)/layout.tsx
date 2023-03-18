"use client"

import React from "react"

import { dashboardConfig } from "@/config/dashboard"
import { SiteFooter } from "@/components/SiteFooter"
import { SiteHeader } from "@/components/SiteHeader"

interface QuizzesProps {
  children: React.ReactNode
}

const layout = ({ children }: QuizzesProps) => {
  return (
    <>
      <div className="h-full flex flex-col">
        <SiteHeader
          mainConfig={dashboardConfig.mainNav}
          mobileConfig={dashboardConfig.mobileNav}
        />
        <main className="flex flex-auto max-h-full overflow-auto">
          {children}
        </main>
      </div>
    </>
  )
}

export default layout
