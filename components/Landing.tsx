import React from "react"
import Image from "next/image"

import { cn } from "@/lib/utils"
import { Icons } from "./Icons"
import { AspectRatio } from "./ui/aspect-ratio"
import { Button, buttonVariants } from "./ui/button"

const Landing = () => {
  return (
    <section className="container relative pb-10 pt-20 md:pt-32">
      <div className="h-full w-full flex justify-center">
        <div className="grid h-full items-center gap-4 md:grid-cols-12 ">
          <div className="col-span-6 flex h-full flex-col items-center justify-center py-10 md:items-start md:py-20 xl:col-span-4">
            <h1 className=" font-inter tracking-tighter font-bold mb-6 text-center text-4xl dark:text-white md:text-left lg:text-6xl xl:text-7xl">Buy, sell and collect NFTs.</h1>
            <p className="font-lexend mb-8 text-center text-lg md:text-left">The worlds largest digital marketplace for crypto collectibles and non-fungible tokens</p>
            <div className="flex space-x-4">
              <a className="bg-accent shadow-accent-volume hover:bg-accent-dark w-36 rounded-full py-3 px-8 text-center font-semibold text-white transition-all" href="/create">Upload</a>
              <a className="text-accent shadow-white-volume hover:bg-accent-dark hover:shadow-accent-volume w-36 rounded-full bg-white py-3 px-8 text-center font-semibold transition-all hover:text-white" href="/collection/explore_collection">Explore</a>
              </div>
            </div>
          <div className="col-span-6 xl:col-span-8">
        <div className="relative text-center md:pl-8 md:text-right">
          <img src="/images/hero/hero.jpg" alt="" className="container hero-img align-middle mt-8 inline-block w-72 rotate-[8deg] sm:w-full lg:w-[23rem] xl:w-[35rem] object-center max-w-full rounded-[32%]"/>
          <img src="/images/hero/3D_elements.png" alt="" className="animate-fly absolute top-0 md:-right-[10%]"/>
        </div>
      </div>
      </div>
      </div>    
    </section>
  )
}

export default Landing

{/* <div classNameName="flex">
        <a
          href="#harry_potter_quizzes"
          classNameName={cn("flex flex-row items-center justify-center gap-2 h-8")}
        >
          <Icons.arrowDown classNameName="h-5 w-5 p-1 bg-yellow-500 rounded-full text-dark-900" />
          <span classNameName="text-[13px] text-dark-150">Explore the quizzes</span>
        </a>
      </div> */}

     
      // padding-left: 1rem;
      // padding-right: 1rem;
      // width: 100%;
      // max-width: 575px;
      // margin-left: auto;
      // margin-right: auto;
      // height: 100%;

