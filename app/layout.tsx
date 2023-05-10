import "@/styles/globals.css"
import React from "react"
import { Lexend, Space_Grotesk } from "next/font/google"

import { cn } from "@/lib/utils"
import { ThemeProvider } from "@/components/ThemeProvider"
import { Toaster } from "@/components/ui/toast"

const lexend = Lexend({
  variable: "--font-lexend",
  subsets: ["latin"],
})

const space = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
})

export const metadata = {
  title: {
    default: `Quizander`,
    template: `%s | Quizander`,
  },
  description: `Full-stack Harry Potter Trivia Website`,
  keywords: ["Next.js", "Harry Potter", "Trivia"],
  authors: [
    {
      name: "Adam Ksiazek",
      url: "https://github.com/S4ntiego",
    },
  ],
  creator: "Adam Ksiazek",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: `https://quizander-dqzb.vercel.app/`,
    title: `Quizander`,
    description: `Full-stack Harry Potter Trivia Website`,
    siteName: `Quizander`,
  },
  twitter: {
    title: `Quizander`,
    description: `Full-stack Harry Potter Trivia Website`,
    creator: "Adam Ksiazek",
  },
  icons: {
    icon: "/favicon.ico",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <html
        className="scroll-smooth h-full flex flex-col box-border"
        lang="en"
        suppressHydrationWarning
      >
        <head />
        <body
          className={cn(
            "h-full bg-dark-50 font-lexend box-border text-dark-900 antialiased dark:bg-dark-700 dark:text-dark-50",

            lexend.variable,

            space.variable
          )}
        >
          <ThemeProvider attribute="class" defaultTheme="dark">
            {children}
            <Toaster position="bottom-right" />
          </ThemeProvider>
        </body>
      </html>
    </>
  )
}
