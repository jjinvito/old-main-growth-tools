import React, { useState } from "react";
import Image from "next/image";
import HeroLogo from "@/public/heroLogo.png";

export default function Hero() {
  return (
    <div className=" w-full h-[320px] flex flex-col">
      <div className=" w-screen xl:w-[82vw] 2xl:w-screen h-[330px] flex flex-row">
        <div className="  w-[75%] h-[325px] clash-display font-bold gap-4 flex flex-col ">
          <h1 className=" text-[40px] ">
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
          <div className=" inline-flex gap-4">
            <button className=" bg-black p-2 px-4 text-white rounded-3xl font-normal">
              View Latest Tools
            </button>
            <button className=" border-[1px] border-black p-2 px-4 text-black rounded-3xl font-normal">
              Trending tools
            </button>
          </div>
        </div>
        <div className="">
          <Image src={HeroLogo} width={315} height={305} />
        </div>
      </div>
    </div>
  );
}
