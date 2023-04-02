import React from "react"

import { dashboardConfig } from "@/config/dashboard"
import { SiteHeader } from "@/components/SiteHeader"

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      <div className="h-full">{children}</div>
    </div>
  )
}

export default layout
