import { notFound } from "next/navigation"

import { getCurrentUser } from "@/lib/session"
import { DashboardNav } from "@/components/DashboardNav"
import { MainNav } from "@/components/MainNav"
import { SiteFooter } from "@/components/SiteFooter"
import UserDropdown from "@/components/UserDropdown"

interface DashboardLayoutProps {
  children?: React.ReactNode
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const user = await getCurrentUser()

  if (!user) {
    return notFound()
  }

  return (
    <div className="flex min-h-screen flex-col space-y-6">
      <header className="sticky top-0 z-40 border-b dark:border-dark-400 border-dark-200 bg-dark-50 dark:bg-dark-700">
        <div className="container flex h-20 items-center justify-between py-4">
          <MainNav />
          <UserDropdown
            user={{
              name: user.name,
              image: user.image,
              email: user.email,
            }}
          />
        </div>
      </header>
      <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
        <aside className="hidden w-[200px] flex-col md:flex">
          <DashboardNav />
        </aside>
        <main className="flex w-full flex-1 flex-col overflow-hidden">
          {children}
        </main>
      </div>
      <SiteFooter />
    </div>
  )
}
