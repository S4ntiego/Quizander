import React from "react"
import Image from "next/image"

import { cn } from "@/lib/utils"
import { Icons } from "./Icons"
import { AspectRatio } from "./ui/aspect-ratio"
import { Button, buttonVariants } from "./ui/button"

const Landing = () => {
  return (
    <section className="relative md:pt-32 ">
      <picture className="pointer-events-none absolute inset-x-0 top-0 -z-10 hidden dark:block">
        <img
          src="/images/hero/gradient_dark.jpg"
          alt="gradient dark"
          className="h-full w-full"
        />
      </picture>
      <div className="container mx-auto">
        <div className="grid items-center gap-4 md:grid-cols-12">
          <div className="col-span-6 flex flex-col items-center justify-center pb-10 pt-20 md:items-start md:py-20 xl:col-span-5">
            <p className="font-lexend text-center text-xs font-bold text-dark-150 uppercase tracking-widest md:text-left">
              Yer a wizard, Harry
            </p>
            <h1 className="font-lexend font-bold mb-5 text-center text-5xl dark:text-white md:text-left lg:text-6xl xl:text-7xl leading-tight">
              Harry Potter Trivia
            </h1>

            <div className="flex space-x-4">
              <a
                className={cn(
                  buttonVariants({ variant: "default" }),
                  "dark:bg-gradient-to-r from-yellow-600 to-yellow-400 rounded-full py-6 px-8 text-center font-semibold"
                )}
                href="/create"
              >
                Explore quizzes
              </a>
            </div>
          </div>
          <div className="col-span-6 xl:col-span-7">
            <div className="relative text-center md:px-16 md:text-right">
              <img
                src="/images/hero/wizard_4.png"
                alt=""
                className="align-middle mt-8 inline-block w-72 rotate-[8deg] sm:w-64 lg:w-[23rem] xl:w-[35rem] object-center max-w-full rounded-[32%]"
              />

              <img
                src="/images/hero/3D_elements.png"
                alt=""
                className="animate-fly absolute top-0 sm:px-16 md:-right-[10%]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Landing
