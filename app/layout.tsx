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
  Lexend_Deca,
  Mulish,
  Outfit,
  Playfair_Display,
  Urbanist,
} from "next/font/google"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { ThemeProvider } from "next-themes"

import AuthContext from "@/components/Dashboard/AuthContext"
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

export default function RootLayout({ children }: { children: any }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${playfair.variable} ${dancingscript.variable} ${jost.variable} ${outfit.variable} ${mulish.variable} ${inter.variable} ${fontSans.variable} ${lexend.variable} ${fraunces.variable} lang="en"`}
    >
      <head />
      <body className="h-full w-full p-0 m-0">
        <ThemeProvider attribute="class" defaultTheme="dark">
          <QueryClientProvider client={queryClient}>
            <AuthContext>
              <StateContextProvider>{children}</StateContextProvider>
              <ReactQueryDevtools initialIsOpen={false} />
            </AuthContext>
          </QueryClientProvider>
          <Toaster position="bottom-right" />
        </ThemeProvider>
      </body>
    </html>
  )
}
