import React, { useState } from "react";
import Image from "next/image";
import HeroLogo from "@/public/heroLogo.png";

export default function Hero() {
  return (
    <div className=" w-full h-fit  md:mt-0 lg:h-[375px]  xl:h-[300px] flex flex-col mb-5">
      <div className=" flex justify-between sm:pt-20 pt-0 xl:pt-0 w-full xl:w-full h-fit flex-row">
        <div className="  sm:w-[75%] w-full h-fit clash-display font-bold gap-4 flex flex-col ">
          <h1 className=" text-[40px] ">
            Discover{" "}
            <span className="bg-gradient-to-r from-[#2661FA] to-[#32DDB4]  text-transparent bg-clip-text ">
              marketing tools
            </span>{" "}
            that supercharge your growth
          </h1>
          <p className="dark:text-[#FFFF] font-medium  text-[16px]  w-full lg:w-[83%] satoshi-variable text-greyColorMuted">
            Browse through hundreds of unique tools to boost your marketing &
            startup. Start by clicking Categories below to pick tools in
            different marketing topics.
          </p>
          <div className=" flex flex-col md:flex-row mt-5 gap-4 ">
            <button className="dark:bg-white dark:text-black bg-black p-2 px-4 text-white rounded-3xl font-normal">
              View Latest Tools
            </button>
            <button className="dark:bg-white border-[1px] border-black p-2 px-4 text-black rounded-3xl font-normal">
              Trending tools
            </button>
          </div>
        </div>
        <div className="hidden md:block">
          <Image src={HeroLogo} width={315} height={305} />
        </div>
      </div>
    </div>
  );
}
