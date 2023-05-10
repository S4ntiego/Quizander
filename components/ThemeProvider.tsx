"use client"

import * as React from "react"
import { ThemeProvider as NextThemeProvider } from "next-themes"
import { ThemeProviderProps } from "next-themes/dist/types"

import { SessionProvider } from "./SessionProvider"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemeProvider {...props}>
      <SessionProvider>{children}</SessionProvider>
    </NextThemeProvider>
  )
}
