"use client"

import "@/styles/globals.css"
import React from "react"
import AuthMiddleware from "@/middleware/GetUserMiddleware"
import {
  Domine,
  Inter as FontSans,
  Fraunces,
  Playfair_Display,
} from "@next/font/google"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { Session } from "next-auth"
import { SessionProvider } from "next-auth/react"
import { ThemeProvider } from "next-themes"

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

const domine = Domine({
  subsets: ["latin"],
  variable: "--font-domine",
  display: "optional",
})

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "optional",
})

export default function RootLayout({
  children,
  session,
}: {
  children: React.ReactElement
  session: any
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${playfair.variable} ${fontSans.variable} ${domine.variable} ${fraunces.variable} lang="en"`}
    >
      <head />
      <body className="min-h-screen bg-white font-sans text-slate-900 antialiased dark:bg-slate-900 dark:text-slate-50">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <QueryClientProvider client={queryClient}>
            <SessionProvider session={session}>
              <StateContextProvider>
                <AuthMiddleware>{children}</AuthMiddleware>
              </StateContextProvider>
              <ReactQueryDevtools initialIsOpen={false} />
            </SessionProvider>
          </QueryClientProvider>
          <Toaster position="bottom-right" />
        </ThemeProvider>
      </body>
    </html>
  )
}
