import React from "react";
import { HiExternalLink } from "react-icons/hi";
import { FaHandsWash } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
export default function VisiteWebsite({ data }) {
  return (
    <>
      <div className="grid grid-cols-12 md:grid-cols-8 gap-2 md:gap-8 ">
        <div className="col-span-12 md:col-span-6">
          {/* <Link href={data?.website || "#"} target="_blank"> */}
            <div className="dark:border-white cursor-pointer border flex justify-center w-full  bg-black py-[14px] items-center gap-2   rounded-[40px] ">
              <h1 className=" text-white font-bold text-base  contentWidth ">
                Visit Website
              </h1>
              <HiExternalLink className=" text-white" size={25} />
            </div>
          {/* </Link> */}
        </div>
        <div className="col-span-12 md:col-span-2 ">
          <div className=" flex justify-center border bg-specialOrange  items-center gap-2  py-[14px] rounded-[40px] ">
            <h1 className=" text-white font-bold text-base">52K</h1>
            <Image
              src="/clapVector.png"
              width={22.93}
              height={22.45}
              alt="Clap icon"
            />
          </div>
        </div>
      </div>
    </>
    // <div className=" flex md:flex-row flex-col gap-4 w-full sm:justify-start  ">

    // </div>
    // </div>
  );
}
