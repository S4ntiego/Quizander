import React from "react"
import Image from "next/image"
import Link from "next/link"
import { AspectRatio } from "@radix-ui/react-aspect-ratio"

import { cn } from "@/lib/utils"
import { Icons } from "./Icons"
import { Button, buttonVariants } from "./ui/button"

const Landing = () => {
  return (
    <section className="flex-1 h-full grid grid-rows-16 container">
      <div className="row-start-1 row-span-3 flex flex-col items-center text-center justify-end">
        <p className="uppercase tracking-widest text-[13px] font-bold text-slate-600 font-lexend dark:text-slate-300">
          Yer a wizard, Harry
        </p>
        <h1 className="font-playfair text-4xl font-extrabold">
          Harry Potter Quizzes
        </h1>
      </div>
      <div className="row-span-10 relative rounded-3xl mt-5">
        <Image
          src="https://d16toh0t29dtt4.cloudfront.net/hogwarts_train.png"
          alt="hogwarts train"
          fill
          className="object-cover rounded-3xl"
        />
      </div>
      <div className="flex row-span-3 items-start justify-center text-center mt-7">
        <a
          href="#harry_potter_landing"
          className={cn(
            buttonVariants({ variant: "outline" }),
            "rounded-3xl hover:scale-105 row-span-2 flex items-center"
          )}
        >
          <Icons.arrowDown className="w-3 h-3 mr-2" />
          <p>Verify your knowledge</p>
        </a>
      </div>
    </section>
  )
}

export default Landing
