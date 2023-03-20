"use client"

import React from "react"

import { dashboardConfig } from "@/config/dashboard"
import Landing from "@/components/Landing"
import { SiteFooter } from "@/components/SiteFooter"
import { SiteHeader } from "@/components/SiteHeader"

interface QuizzesProps {
  children: React.ReactNode
}

const layout = ({ children }: QuizzesProps) => {
  return (
    <>
      <div className="min-h-full flex flex-col">
        <SiteHeader
          mainConfig={dashboardConfig.mainNav}
          mobileConfig={dashboardConfig.mobileNav}
        />
        <main className="flex flex-1">{children}</main>
      </div>
    </>
  )
}

export default layout
