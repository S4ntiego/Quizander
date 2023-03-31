import React from "react"
import Image from "next/image"

import { cn } from "@/lib/utils"
import { buttonVariants } from "./ui/button"

const Landing = () => {
  return (
    <section className="w-full bg-gradient-to-t from-dark-150 to-dark-50 dark:from-dark-700 dark:to-dark-600 -mt-20 pt-20 pb-24">
      <div className="flex flex-col">
        {/* text */}
        <div className="flex flex-col text-center items-center container ">
          <p className="text-sm uppercase tracking-widest text-dark-400 mb-2 dark:text-dark-200">
            Yer a wizard
          </p>
          <h1 className="uppercase font-space font-bold text-7xl mb-2 max-w-[510px] md:text-8xl">
            Harry Potter Trivia
          </h1>
          <p className="text-sm uppercase max-w-[13rem] tracking-widest text-dark-400 mb-8 dark:text-dark-200">
            Wit beyond measure is man&apos;s greatest treasure
          </p>
          <a
            className={cn(
              buttonVariants({ variant: "default" }),
              "w-36 rounded-3xl cursor-pointer mb-12"
            )}
            href="#harry_potter_quizzes"
          >
            Explore Quizzes
          </a>
        </div>
        {/* image */}
        <div className="flex items-center justify-center relative">
          <Image
            alt="wizard"
            src="/images/hero/wizard_landing 2.png"
            height={860}
            width={860}
            priority
            className="w-[20rem] rounded-3xl border border-dark-200 dark:border-dark-400 sm:w-[25rem] md:w-[30rem]"
          />
        </div>
      </div>
    </section>
  )
}

export default Landing
