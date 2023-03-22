import React from "react"
import Image from "next/image"

import { cn } from "@/lib/utils"
import { Icons } from "./Icons"
import { Button, buttonVariants } from "./ui/button"

const Landing = () => {
  return (
    <section className="mt-16 flex-1 grid grid-rows-16 container justify-center text-center font-lexend overflow-clip bg-gradient-to-t from-dark-700 via-dark-600 to-dark-700">
      <div className="row-span-1 "></div>
      <div className="row-span-1  flex justify-center items-center uppercase text-[13px] font-bold">
        Yer a wizard, Harry
      </div>
      <div className="row-span-2 font-medium font-lexend text-5xl text-yellow-500 [text-shadow:-1px_1px_#fc8403]">
        <span className="">Harry Potter Trivia</span>
      </div>
      <div className="row-span-2 flex items-center justify-center px-4">
        Dive into the world of magic,
      </div>
      <div className="row-span-1  flex gap-2 items-start justify-center">
        <Button className="dark:bg-yellow-500 dark:text-slate-900 [box-shadow:-3px_3px_0_0_#fc8403]">
          Explore quizzes
        </Button>
      </div>
      <div className="row-span-7 relative flex justify-center items-center h-full w-full">
        <div className="absolute h-64 w-64 rounded-full bg-gradient-to-b from-dark-700 to-dark-600 border border-dark-500"></div>
        <Image
          src="https://i.ibb.co/sbmJfSQ/lecimytesty-magical-hat-from-harry-potter-render-plain-backgrou-88fc2326-8994-46ef-8c95-d6b3dfb1b3e3.png"
          alt="magic hat"
          fill
          className="object-scale-down"
        />
      </div>
      <div className="row-span-2 items-start justify-center">
        <a
          href="#harry_potter_quizzes"
          className={cn(
            buttonVariants({ variant: "outline" }),
            "rounded-full p-3 dark:border-dark-500"
          )}
        >
          <Icons.arrowDown className="h-4 w-4 text-dark-200" />
        </a>
      </div>
    </section>
  )
}

export default Landing
