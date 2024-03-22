import React from "react";
import { HiExternalLink } from "react-icons/hi";
import { FaHandsWash } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
export default function VisiteWebsite({ data }) {
  return (
    <div className=" flex lg:flex-row flex-col gap-4 w-full sm:justify-start  ">
      {/* <div className=" flex sm:flex-row flex-col sm:justify-center items-center  w-fit gap-2"> */}
      <Link
        className="dark:border-white border flex justify-center w-fit bg-black p-2 items-center gap-2 sm:px-32 md:px-48 lg:px-44  px-10   rounded-3xl "
        href={data?.website || "#"}
        target="_blank"
      >
        <h1 className=" text-white font-bold text-base  contentWidth ">
          Visit Website
        </h1>
        <HiExternalLink className=" text-white" size={25} />
      </Link>
      
      <div className=" flex justify-center bg-specialOrange p-3 items-center gap-2 px-4 rounded-3xl h-[52px] w-[110px]">
        <h1 className=" text-white font-bold text-base">52K</h1>
        <Image
          src="/clapVector.png"
          width={22.93}
          height={22.45}
          alt="Clap icon"
        />
      </div>
      </div>
    // </div>
  );
}
