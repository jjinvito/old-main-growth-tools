import React, { useState } from "react";
import Image from "next/image";
import HeroLogo from "@/public/heroLogo.png";

export default function Hero() {
  return (
    <div className=" w-full h-[760px] min-[320px]:h-[690px] sm:h-[320px] md:h-[450px] min-[425px]:h-[645px] md:mt-0 lg:h-[375px]  xl:h-[300px] flex flex-col">
      <div className=" flex justify-between pt-28 md:pt-20 xl:pt-0 w-screen xl:w-full h-[330px] flex-row">
        <div className="  w-[75%] h-[325px] clash-display font-bold gap-4 flex flex-col ">
          <h1 className=" text-[35px] ">
            Discover{" "}
            <span className="bg-gradient-to-r from-[#2661FA] to-[#32DDB4]  text-transparent bg-clip-text ">
              marketing tools
            </span>{" "}
            that supercharge your growth
          </h1>
          <p className=" font-medium  text-[16px]  w-full lg:w-[83%] satoshi-variable text-greyColorMuted">
            Browse through hundreds of unique tools to boost your marketing &
            startup. Start by clicking Categories below to pick tools in
            different marketing topics.
          </p>
          <div className=" flex flex-col md:flex-row mt-5 gap-4 ">
            <button className=" bg-black p-2 px-4 text-white rounded-3xl font-normal">
              View Latest Tools
            </button>
            <button className=" border-[1px] border-black p-2 px-4 text-black rounded-3xl font-normal">
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
