import { dashboardConfig } from "@/config/dashboard"
import { DashboardNav } from "@/components/DashboardNav"
import { SiteFooter } from "@/components/SiteFooter"
import { SiteHeader } from "@/components/SiteHeader"

interface LayoutProps {
  children: React.ReactNode
}

export default async function DashboardLayout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col ">
      <SiteHeader
        mainConfig={dashboardConfig.mainNav}
        mobileConfig={dashboardConfig.mobileNav}
      />
      <div className="flex-1">
        <div className="container h-full w-full relative grid gap-12 md:grid-cols-[200px_1fr]">
          <aside className="hidden w-[200px] flex-col md:flex sticky">
            <DashboardNav />
          </aside>
          <main className="h-full w-full p-1 mb-12">{children}</main>
        </div>
      </div>
      <SiteFooter />
    </div>
  )
}
