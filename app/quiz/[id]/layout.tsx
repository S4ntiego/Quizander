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
    <div className="supports-[height:100cqh]:h-[100cqh] supports-[height:100svh]:h-[100svh] overflow-y-hidden relative flex flex-col ">
      <SiteHeader
        mainConfig={dashboardConfig.mainNav}
        mobileConfig={dashboardConfig.mobileNav}
      />
      <div className="flex flex-col flex-1">{children}</div>
    </div>
  )
}

export default layout
