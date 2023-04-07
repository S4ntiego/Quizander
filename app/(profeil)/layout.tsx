import React from "react"
import Link from "next/link"
import { redirect } from "next/navigation"

import { dashboardConfig } from "@/config/dashboard"
import { getCurrentUser } from "@/lib/session"
import { SiteHeader } from "@/components/SiteHeader"

const layout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/")
  }

  return (
    <div className="h-full fixed inset-0">
      <SiteHeader
        mainConfig={dashboardConfig.mainNav}
        mobileConfig={dashboardConfig.mobileNav}
      />
      <div className="h-[calc(100%-5rem)] wide:h-[calc(100%-3rem)] flex container">
        <div className="h-full flex flex-col w-64 bg-red-500">
          <Link href="/profeil/profeil">Profeil</Link>
          <Link href="/profeil/kekw">Kekw</Link>
        </div>
        <div className="h-full w-full ml-2">{children}</div>
      </div>
    </div>
  )
}

export default layout
