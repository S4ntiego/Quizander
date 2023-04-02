import React from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Link
        href={"/pepega/1"}
        className={cn(
          "mt-2 mr-2 rounded-lg px-3 py-1 text-sm font-medium bg-gray-700 text-gray-100 hover:bg-gray-500 hover:text-white"
        )}
      >
        Quiz 1
      </Link>
      <Link
        href={"/pepega/2"}
        className={cn(
          "mt-2 mr-2 rounded-lg px-3 py-1 text-sm font-medium bg-gray-700 text-gray-100 hover:bg-gray-500 hover:text-white"
        )}
      >
        Quiz 2
      </Link>
      <Link
        href={"/pepega/3"}
        className={cn(
          "mt-2 mr-2 rounded-lg px-3 py-1 text-sm font-medium bg-gray-700 text-gray-100 hover:bg-gray-500 hover:text-white"
        )}
      >
        Quiz 3
      </Link>
      <div>{children}</div>
    </div>
  )
}

export default layout
