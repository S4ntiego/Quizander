import React from "react"
import Image from "next/image"

import { cn } from "@/lib/utils"
import { Icons } from "./Icons"
import { AspectRatio } from "./ui/aspect-ratio"
import { Button, buttonVariants } from "./ui/button"

const Landing = () => {
  return (
    <section className="-mt-20 pt-20 mb-28 w-full dark:bg-gradient-to-b from-dark-900 via-slate-900 to-dark-700">
      <div className="flex flex-col md:flex-row md:justify-between container xl:px-28">
        <div className="flex flex-col text-center items-center md:items-start md:justify-center md:basis-2/3 xl:basis-1/2 md:text-start md:py-16 mb-6">
          <p className="font-lexend text-xs sm:text-sm md:text-base lg:text-lg uppercase tracking-widest mb-1 text-dark-400 dark:text-dark-150">
            Yer a wizard, Harry
          </p>
          <h1 className="uppercase font-lexend font-bold text-5xl md:text-7xl mb-6">
            Harry Potter Trivia
          </h1>
          <a
            className={cn(
              buttonVariants({ variant: "default" }),
              "w-36 rounded-md bg-yellow-500 text-dark-700 dark:hover:bg-yellow-400 dark:bg-yellow-500 dark:hover:text-dark-700 dark:text-dark-700 cursor-pointer"
            )}
            href="#harry_potter_quizzes"
          >
            Explore Quizzes
          </a>
        </div>
        <div className="flex items-center justify-center md:basis-1/3 xl:basis-1/2 h-full w-full">
          <Image
            alt="wizard"
            src="/images/hero/wizard_ratio 2.png"
            height={866}
            width={606}
            priority
            className="w-[17rem] xs:w-80 md:w-96 xl:w-[30rem]"
          />
        </div>
        <div className="flex justify-center py-10 md:hidden">
          <a href="#harry_potter_quizzes">
            <Icons.arrowDown className="w-6 h-6 p-1 bg-yellow-500 text-dark-700 dark:border-yellow-500 dark:bg-dark-700 dark:text-yellow-500 rounded-full border" />
          </a>
        </div>
      </div>
    </section>
  )
}

export default Landing
