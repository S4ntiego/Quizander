import React from "react"
import Image from "next/image"
import Link from "next/link"
import { AspectRatio } from "@radix-ui/react-aspect-ratio"

import { cn } from "@/lib/utils"
import { Icons } from "./Icons"
import { Button, buttonVariants } from "./ui/button"

const Landing = () => {
  return (
    <section className="flex-1 h-full grid grid-rows-6">
      <div className="row-span-1 flex flex-col items-center justify-end">
        <p className="uppercase tracking-widest text-[13px] font-lexend text-slate-300">
          Yer a wizard, Harry
        </p>
        <h1 className="font-playfair text-5xl font-extrabold">Harry Potter</h1>
      </div>
      <div className="row-span-4 relative m-8 rounded-3xl">
        <Image
          src="https://d16toh0t29dtt4.cloudfront.net/hogwarts_train.png"
          alt="hogwarts train"
          fill
          className="object-cover rounded-3xl"
        />
      </div>
      <div className="row-span-1 flex items-start justify-center">
        <a
          href="#harry_potter_landing"
          className={cn(buttonVariants({ variant: "outline" }))}
        >
          <Icons.arrowDown className="w-3 h-3 mr-2" />
          <p>Harry Potter Quizzess</p>
        </a>
      </div>
    </section>
  )
}

export default Landing
