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
    <div className="h-full fixed inset-0">
      <header className="sticky top-0 z-40">
        <div className="container flex h-20 items-center justify-between py-6">
          <MainNav />
          <LoginButton />
        </div>
      </header>
      <main className="h-[calc(100%-5rem)] wide:h-[calc(100%-3rem)]">
        {children}
      </main>
      <SiteFooter />
    </div>
  )
}
