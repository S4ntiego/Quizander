import { dashboardConfig } from "@/config/dashboard"
import { DashboardNav } from "@/components/DashboardNav"
import { MainNav } from "@/components/MainNav"
import UserDropdown from "@/components/UserDropdown"

export default async function DashboardLayout(children?: React.ReactNode) {
  return (
    <div className="mx-auto flex flex-col space-y-6">
      <header className="container sticky top-0 z-40 dark:bg-slate-900 bg-white">
        <div className="flex h-16 items-center justify-between border-b border-b-slate-200 dark:border-b-slate-700 py-4">
          <MainNav items={dashboardConfig.mainNav} />
          <UserDropdown />
        </div>
      </header>
      <div className="container grid gap-12 md:grid-cols-[200px_1fr]">
        <aside className="hidden w-[200px] flex-col md:flex ">
          <DashboardNav items={dashboardConfig.sidebarNav} />
        </aside>
        <main className="flex w-full p-1 pb-8 flex-1 flex-col overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  )
}
