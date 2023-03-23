import React from "react"
import Image from "next/image"

import { cn } from "@/lib/utils"
import { Icons } from "./Icons"
import { Button, buttonVariants } from "./ui/button"

const Landing = () => {
  return (
    <section className="mt-[4.5rem] flex-1 flex flex-col container justify-center items-center text-center font-lexend bg-gradient-to-t from-dark-700 via-dark-600 to-dark-700 py-8">
      <p className="uppercase text-[13px] font-bold text-dark-150">
        Yer a wizard, Harry
      </p>
      <h1 className="font-bold font-lexend text-5xl tracking-tighter text-yellow-500">
        Harry Potter Trivia
      </h1>
      <p className="mt-2 flex items-center justify-center px-4 text-dark-150"></p>
      <div className="relative flex justify-center items-center h-96 w-screen">
        <div className="absolute h-64 w-64 rounded-full bg-gradient-to-t from-yellow-500 via-yellow-900 to-dark-700 "></div>
        <Image
          src="https://i.ibb.co/sbmJfSQ/lecimytesty-magical-hat-from-harry-potter-render-plain-backgrou-88fc2326-8994-46ef-8c95-d6b3dfb1b3e3.png"
          alt="magic hat"
          fill
          className="object-scale-down"
        />
      </div>

      <a
        href="#harry_potter_quizzes"
        className={cn("flex flex-row items-center justify-center gap-2 h-16")}
      >
        <Icons.arrowDown className="h-5 w-5 p-1 bg-yellow-500 rounded-full text-dark-900" />
        <span className="text-[13px] text-dark-150">Explore the quizzes</span>
      </a>
    </section>
  )
}

export default Landing
