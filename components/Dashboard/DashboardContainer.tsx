import * as React from "react"

import { cn } from "@/lib/utils"

interface DashboardContainerProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export function DashboardContainer({
  children,
  className,
  ...props
}: DashboardContainerProps) {
  return (
    <div className={cn("grid items-start gap-8", className)} {...props}>
      {children}
    </div>
  )
}
