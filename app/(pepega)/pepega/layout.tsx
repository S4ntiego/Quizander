import React from "react"

import { dashboardConfig } from "@/config/dashboard"
import { SiteHeader } from "@/components/SiteHeader"

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      <SiteHeader
        mainConfig={dashboardConfig.mainNav}
        mobileConfig={dashboardConfig.mobileNav}
      />
      <div className="h-full">{children}</div>
    </div>
  )
}

export default layout
