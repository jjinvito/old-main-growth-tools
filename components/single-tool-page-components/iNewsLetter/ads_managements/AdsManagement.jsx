import React from "react";
import VisiteWebsite from "../VisiteWebsite";
import Image from "next/image";

export default function AdsManagement() {
  return (
    <div className=" flex flex-col gap-3">
      <h1 className=" font-extrabold">
        Discover <span className=" text-[blue]">more</span> Ads Management tools
      </h1>
      <div className=" inline-flex gap-2 border-2 rounded-xl w-full p-2 shadow-xl">
        <Image
          src="/logo-dark.png"
          className=" w-12 h-12 p-2 border-2 rounded-lg"
          width={50}
          height={50}
        />
        <div className="flex flex-col gap-1">
          <h1 className=" font-extrabold">iNewsLetter</h1>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ullam nisi
            inventore dolorem .
          </p>
          <div className="inline-flex gap-3 items-center">
            <Image
              src="/cardImg.png"
              className=" w-10 h-10 p-2 border-2 rounded-lg"
              width={50}
              height={50}
            />
            <h1 className=" font-extrabold text-[blue]">Deal</h1>
          </div>
        </div>
      </div>
      <div className=" inline-flex gap-2 border-2 rounded-xl w-full p-2 shadow-xl">
        <Image
          src="/logo-dark.png"
          className=" w-12 h-12 p-2 border-2 rounded-lg"
          width={50}
          height={50}
        />
        <div className="flex flex-col gap-1">
          <h1 className=" font-extrabold">Mail Reach</h1>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ullam nisi
            inventore dolorem .
          </p>
        </div>
      </div>
      <small className=" text-[#006cd1] font-bold mb-6">
        Browse 1 Ads Management tool
      </small>
      <VisiteWebsite />
    </div>
  );
}
