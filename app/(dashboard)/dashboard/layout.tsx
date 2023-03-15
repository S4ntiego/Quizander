import { dashboardConfig } from "@/config/dashboard"
import { DashboardNav } from "@/components/DashboardNav"
import { SiteFooter } from "@/components/SiteFooter"
import { SiteHeader } from "@/components/SiteHeader"

interface LayoutProps {
  children: React.ReactNode
}

export default async function DashboardLayout({ children }: LayoutProps) {
  return (
    <header className="mx-auto flex flex-col min-h-screen">
      <div className="sticky top-0 z-40 dark:bg-slate-900 bg-white">
        <SiteHeader
          mainConfig={dashboardConfig.mainDashboardNav}
          mobileConfig={dashboardConfig.mobileDashboardNav}
        />
      </div>
      <div className="container flex-1 grid gap-12 py-8 md:grid-cols-[200px_1fr]">
        <aside className="hidden w-[200px] flex-col md:flex sticky left-0">
          <DashboardNav />
        </aside>
        <main className="flex w-full flex-1 flex-col overflow-hidden md:px-1">
          {children}
        </main>
      </div>
      <SiteFooter />
    </header>
  )
}
