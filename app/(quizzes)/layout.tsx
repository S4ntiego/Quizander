import Link from "next/link"

import { cn } from "@/lib/utils"
import { MainNav } from "@/components/MainNav"
import { SiteFooter } from "@/components/SiteFooter"
import { buttonVariants } from "@/components/ui/button"

interface MarketingLayoutProps {
  children: React.ReactNode
}

export default async function MarketingLayout({
  children,
}: MarketingLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="container z-40 bg-background">
        <div className="flex h-20 items-center justify-between py-6">
          <MainNav />
          <nav>
            <Link
              href="/login"
              className={cn(
                buttonVariants({ variant: "subtle", size: "sm" }),
                "px-4"
              )}
            >
              Login
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  )
}
