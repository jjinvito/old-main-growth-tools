"use client";
import React from "react";
import { FaPlus } from "react-icons/fa6";
import Image from "next/image";
export default function ({ data }) {
  return (
    <div className=" flex flex-col gap-6">
      <div className="flex flex-col gap-3 ">
        <h1 className="text-lg font-semibold">Description</h1>
        <p className="text-[#494949] dark:text-white text-base font-medium satoshi-variable ">
          {data?.description}
        </p>
      </div>

      <div className="border-2 gradient-border gap-2  justify-between dark:before:shadow-none w-[100%] h-[101px] dark:bg-black  ">
        <div className="content flex justify-around items-center   h-full dark:bg-black drop-shadow-lg p-[8px] sm:p-0">
          <div className=" inline-flex gap-6 items-center">
            <Image src="/bulb.png" width={23.33} height={33.32} />
            <h3 className=" font-medium sm:text-base text-[11px] clash-display">
              Do you have a better suggestion <br /> for Email Marketing?
            </h3>
          </div>
          <Image src="/submitBtn.png" width={141} height={40} />
        </div>
      </div>
    </div>
  );
}
