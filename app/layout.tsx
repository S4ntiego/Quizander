"use client"

import "@/styles/globals.css"
import React from "react"
import {
  Dancing_Script,
  Inter as FontSans,
  Fraunces,
  Inter,
  Jost,
  Lexend,
  Mulish,
  Outfit,
  Playfair_Display,
  Space_Grotesk,
} from "next/font/google"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { ThemeProvider } from "next-themes"

import { dashboardConfig } from "@/config/dashboard"
import { cn } from "@/lib/utils"
import AuthContext from "@/components/Dashboard/AuthContext"
import { SiteFooter } from "@/components/SiteFooter"
import { SiteHeader } from "@/components/SiteHeader"
import { Toaster } from "@/components/ui/toast"
import { StateContextProvider } from "../context/index"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 10000,
    },
  },
})

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

const playfair = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
})

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "optional",
})

const lexend = Lexend({
  variable: "--font-lexend",
  subsets: ["latin"],
})

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
})

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
})

const mulish = Mulish({
  variable: "--font-mulish",
  subsets: ["latin"],
})

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
})

const dancingscript = Dancing_Script({
  variable: "--font-dancing-script",
  subsets: ["latin"],
})

const space = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
})

export default function RootLayout({ children }: { children: any }) {
  return (
    <>
      <html
        className="scroll-smooth h-full flex flex-col"
        lang="en"
        suppressHydrationWarning
      >
        <head />
        <body
          className={cn(
            "h-full bg-dark-50 font-lexend text-dark-900 antialiased dark:bg-dark-700 dark:text-dark-50",
            playfair.variable,
            dancingscript.variable,
            jost.variable,
            outfit.variable,
            mulish.variable,
            inter.variable,
            fontSans.variable,
            lexend.variable,
            fraunces.variable,
            space.variable
          )}
        >
          <ThemeProvider attribute="class" defaultTheme="dark">
            <AuthContext>
              <StateContextProvider>{children}</StateContextProvider>
            </AuthContext>
          </ThemeProvider>
          <Toaster position="bottom-right" />
        </body>
      </html>
    </>
  )
}
