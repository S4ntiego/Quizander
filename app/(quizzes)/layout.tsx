import React from "react"

import { dashboardConfig } from "@/config/dashboard"
import Header from "@/components/Header"
import { SiteFooter } from "@/components/SiteFooter"
import { SiteHeader } from "@/components/SiteHeader"

interface QuizzesProps {
  children: React.ReactNode
}

const layout = ({ children }: QuizzesProps) => {
  return (
    <div className="flex min-h-screen flex-col ">
      <SiteHeader
        mainConfig={dashboardConfig.mainNav}
        mobileConfig={dashboardConfig.mobileNav}
      />
      <div className="flex-1">{children}</div>
      <SiteFooter />
    </div>
  )
}

export default layout
