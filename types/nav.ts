import { Icons } from "@/components/Icons"

export interface NavItem {
  title?: string
  href?: string
  external?: boolean
  icon?: keyof typeof Icons
  label?: string
}

export interface NavItemWithChildren extends NavItem {
  items?: NavItemWithChildren[]
}

export type MainNavItem = NavItem

export interface MobileNavItem extends NavItemWithChildren {}
