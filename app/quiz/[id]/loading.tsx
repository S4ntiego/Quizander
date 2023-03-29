import Link from "next/link"

import { cn } from "@/lib/utils"
import { DashboardContainer } from "@/components/Dashboard/DashboardContainer"
import { DashboardHeader } from "@/components/Dashboard/DashboardHeader"
import { Icons } from "@/components/Icons"
import { QuizItem } from "@/components/QuizItem"
import { buttonVariants } from "@/components/ui/button"

export default function DashboardLoading() {
  return (
    <div className="flex-1 dark:bg-gradient-to-b -mt-20 pt-20 from-dark-600 to-dark-800 container py-8 grid grid-rows-12 gap-4 sm:p-12 md:px-18 lg:px-96 font-lexend">
      <>
        <div className="row-span-4 gap-2 grid grid-rows-[auto,1fr]">
          <div className="text-center">
            <span className="text-xs justify-center flex">
              <div className="w-12 h-4 rounded-md animate-pulse dark:bg-slate-500"></div>
            </span>
          </div>
          <div className="px-3 flex items-center justify-center font-bold text-center overflow-auto">
            <span className="m-auto text-base sm:text-lg break-words overflow-auto">
              <div className="w-48 h-12 rounded-md animate-pulse dark:bg-slate-500"></div>
            </span>
          </div>
        </div>
        <div className="row-span-8 grid grid-rows-4 gap-4">
          <div className="w-full rounded-md h-full animate-pulse dark:bg-slate-500"></div>
          <div className="w-full rounded-md h-full animate-pulse dark:bg-slate-500"></div>
          <div className="w-full rounded-md h-full animate-pulse dark:bg-slate-500"></div>
          <div className="w-full rounded-md h-full animate-pulse dark:bg-slate-500"></div>
        </div>
      </>
    </div>
  )
}
