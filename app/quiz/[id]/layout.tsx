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
    <div className="h-screen flex flex-col ">
      <SiteHeader
        mainConfig={dashboardConfig.mainNav}
        mobileConfig={dashboardConfig.mobileNav}
      />
      <div className="flex flex-col h-[calc(100vh-5rem)]">{children}</div>
    </div>
  )
}

export default layout
