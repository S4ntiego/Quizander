import React from "react"

import { dashboardConfig } from "@/config/dashboard"
import { DashboardNav } from "@/components/DashboardNav"
import { SiteHeader } from "@/components/SiteHeader"

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mx-auto flex flex-col space-y-6">
      <SiteHeader
        mainConfig={dashboardConfig.mainNav}
        mobileConfig={dashboardConfig.mobileNav}
      />
      <div className="container grid gap-12 md:grid-cols-[200px_1fr]">
        <aside className="hidden w-[200px] flex-col md:flex">
          <DashboardNav />
        </aside>
        <main className="flex w-full flex-1 flex-col overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  )
}

export default layout
