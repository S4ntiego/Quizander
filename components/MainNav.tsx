"use client"

import * as React from "react"
import Link from "next/link"

import { MainNavItem } from "@/types/nav"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/Icons"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

interface MainNavProps {
  mainConfig: MainNavItem[]
}

export function MainNav({ mainConfig }: MainNavProps) {
  return (
    <div className="hidden wide:hidden md:flex">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <Icons.logo className="h-6 w-6" />
        <span className="hidden font-bold sm:inline-block">
          {siteConfig.name}
        </span>
      </Link>
      <Link href="/dash">Dash</Link>
      <Link href="/code/repos">Code</Link>
      <NavigationMenu>
        <NavigationMenuList>
          {mainConfig.map((item, i) => (
            <NavigationMenuItem key={i} className="hidden md:flex">
              <Link href={`${item.href}`} legacyBehavior passHref>
                <NavigationMenuLink
                  className={cn(navigationMenuTriggerStyle(), "h-9")}
                >
                  {item.title}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}
