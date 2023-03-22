import React from "react"
import Image from "next/image"

import { cn } from "@/lib/utils"
import { Icons } from "./Icons"
import { Button, buttonVariants } from "./ui/button"

const Landing = () => {
  return (
    <section className="mt-[4.5rem] flex-1 flex flex-col container justify-center items-center text-center font-lexend bg-gradient-to-t from-dark-700 via-dark-600 to-dark-700">
      <p className="row-span-1 flex justify-center items-center uppercase text-[13px] font-bold text-dark-150">
        Yer a wizard, Harry
      </p>
      <h1 className="row-span-2 font-medium font-lexend text-5xl text-yellow-500 [text-shadow:-1px_1px_#fc8403]">
        Harry Potter Trivia
      </h1>
      <p className="row-span-2 mt-2 flex items-center justify-center px-4 text-dark-150">
        Dive into the world of magic
      </p>
      <Button className="dark:bg-yellow-500 dark:text-dark-900 mt-4 h-12 rounded-3xl">
        Explore quizzes
      </Button>
      <div className="flex-1 relative flex justify-center items-center h-full w-screen">
        <div className="absolute h-64 w-64 rounded-full bg-gradient-to-b from-dark-700 to-dark-600 border border-dark-500"></div>
        <Image
          src="https://i.ibb.co/sbmJfSQ/lecimytesty-magical-hat-from-harry-potter-render-plain-backgrou-88fc2326-8994-46ef-8c95-d6b3dfb1b3e3.png"
          alt="magic hat"
          fill
          className="object-cover"
        />
      </div>
      <div className="h-24 flex items-start justify-center">
        <a
          href="#harry_potter_quizzes"
          className={cn(
            buttonVariants({ variant: "outline" }),
            "rounded-full p-3 dark:border-dark-500"
          )}
        >
          <Icons.arrowDown className="h-4 w-4 text-yellow-500" />
        </a>
      </div>
    </section>
  )
}

export default Landing
