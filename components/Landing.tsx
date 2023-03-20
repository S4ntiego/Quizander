import React from "react"
import Image from "next/image"
import Link from "next/link"
import { AspectRatio } from "@radix-ui/react-aspect-ratio"

import { cn } from "@/lib/utils"
import { Icons } from "./Icons"
import { Button, buttonVariants } from "./ui/button"

const Landing = () => {
  return (
    <section className="container flex flex-col flex-1 py-8 text-center items-center justify-center max-h-full">
      <p className="font-lexend uppercase text-[13px] font-medium tracking-widest text-slate-800 dark:text-slate-300">
        Yer a wizard, Harry.
      </p>
      <h1 className="font-playfair font-extrabold text-5xl">Harry Potter</h1>
      <AspectRatio className="relative mt-8" ratio={2 / 3}>
        <Image
          style={{ clipPath: "url(#hero-clip)" }}
          fill
          src="https://d16toh0t29dtt4.cloudfront.net/hogwarts_train.png"
          alt="hogwarts_train"
          className="object-cover rounded-3xl"
        />
      </AspectRatio>
      <div className="flex items-center justify-center">
        <div className="flex flex-col py-8">
          <a
            href="#harry_potter_landing"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "rounded-3xl"
            )}
          >
            <Icons.arrowDown className="w-3 h-3 rounded-full dark:text-slate-50 text-slate-900" />
            <p className="ml-2 text-[13px] dark:text-slate-300">
              Harry Potter Quizzes
            </p>
          </a>
        </div>
      </div>
    </section>
  )
}

export default Landing
