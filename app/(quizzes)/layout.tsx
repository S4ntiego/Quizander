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
    <div className="h-full">
      <div className="flex flex-col h-full items-center">
        <SiteHeader
          mainConfig={dashboardConfig.mainNav}
          mobileConfig={dashboardConfig.mobileNav}
        />
        <Landing />
      </div>
      <div>{children}</div>
      <SiteFooter />
    </div>
  )
}

export default layout
