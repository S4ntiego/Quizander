import Link from "next/link"

import { cn } from "@/lib/utils"
import { DashboardContainer } from "@/components/Dashboard/DashboardContainer"
import { DashboardHeader } from "@/components/Dashboard/DashboardHeader"
import { Icons } from "@/components/Icons"
import { QuizItem } from "@/components/QuizItem"
import { buttonVariants } from "@/components/ui/button"

export default function DashboardLoading() {
  return (
    <div className="flex-1 -mt-20 pt-20 dark:bg-gradient-to-b from-dark-900 via-slate-900 to-dark-900">
      <div className="container max-w-[700px] h-full pb-6 grid grid-rows-12 gap-4 xs:pb-36 font-lexend">
        <>
          <div className="row-span-4 gap-2 grid grid-rows-[auto,1fr] xs:row-start-3 justify-center">
            <div className="text-center flex justify-center">
              <span className="text-xs xs:text-base">
                <div className="w-12 h-4 rounded-md animate-pulse bg-slate-500"></div>
              </span>
            </div>
            <div className="px-3 flex items-center justify-center font-bold text-center overflow-auto">
              <span className="m-auto text-base xs:text-2xl break-words overflow-auto">
                <div className="w-48 h-12 rounded-md animate-pulse bg-slate-500"></div>
              </span>
            </div>
          </div>
          <div className="row-span-8 grid grid-rows-4 gap-4">
            <div className="w-full rounded-md h-full animate-pulse bg-slate-500"></div>
            <div className="w-full rounded-md h-full animate-pulse bg-slate-500"></div>
            <div className="w-full rounded-md h-full animate-pulse bg-slate-500"></div>
            <div className="w-full rounded-md h-full animate-pulse bg-slate-500"></div>
          </div>
          <div className="w-full flex justify-center">
            <div className="w-24 h-6 animate-pulse rounded-md bg-slate-500 mt-6"></div>
          </div>
        </>
      </div>
    </div>
  )
}
