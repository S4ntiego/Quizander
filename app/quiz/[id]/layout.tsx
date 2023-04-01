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
    <div className="h-full flex flex-col fixed inset-0">
      <SiteHeader
        mainConfig={dashboardConfig.mainNav}
        mobileConfig={dashboardConfig.mobileNav}
      />
      <div className="flex flex-col h-[calc(100%-5rem)]">{children}</div>
    </div>
  )
}

export default layout
