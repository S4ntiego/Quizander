interface DashboardHeaderProps {
  heading: string
  text?: string
  children?: React.ReactNode
}

export function DashboardHeader({
  heading,
  text,
  children,
}: DashboardHeaderProps) {
  return (
    <div className="flex justify-between px-2">
      <div className="grid gap-1">
        <h1 className="text-2xl font-bold tracking-wide dark:text-slate-50 text-slate-900">
          {heading}
        </h1>
        {text && (
          <p className="text-dark-400 dark:text-dark-200 text-[15px] xs:text-base">
            {text}
          </p>
        )}
      </div>
      {children}
    </div>
  )
}
