import { LoginButton } from "@/components/LoginButton"
import { MainNav } from "@/components/MainNav"
import { SiteFooter } from "@/components/SiteFooter"

interface MarketingLayoutProps {
  children: React.ReactNode
}

export default async function MarketingLayout({
  children,
}: MarketingLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 border-b border-dark-200 dark:border-dark-400 z-40 bg-dark-50 dark:bg-dark-700">
        <div className="container flex h-20 items-center justify-between py-6">
          <MainNav />
          <LoginButton />
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  )
}
