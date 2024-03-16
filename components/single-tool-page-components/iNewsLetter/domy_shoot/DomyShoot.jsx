import React from "react";
import { RxSlash } from "react-icons/rx";
import Image from "next/image";
import PeerButton from "../PeerButton";
import VisiteWebsite from "../VisiteWebsite";
export default function DomyShoot({ data }) {
  return (
    <div className=" flex flex-col sm:items-start  gap-8 pb-8 border-b-2 w-full h-full ">
      {/* Breadcrumb Div */}
      <nav className="flex satoshi-variable" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-0 md:space-x-2 rtl:space-x-reverse ">
          <li className="inline-flex items-center">
            <a
              href="#"
              className="inline-flex items-center sm:text-base text-[14px] font-bold text-black "
            >
              HomePage
            </a>
          </li>
          <li>
            <div className="flex items-center">
              <RxSlash size={14} className=" font-extrabold" />
              <a
                href="#"
                className="ms-1 sm:text-base text-[14px] font-bold text-black  md:ms-2 dark:text-gray-400 "
              >
                Email Marketing
              </a>
            </div>
          </li>
          <li aria-current="page">
            <div className="flex items-center">
              <RxSlash size={14} className=" font-extrabold" />
              <span className="ms-1 sm:text-base text-[14px] font-normal md:ms-2 text-[#999999]">
                INewsLetters
              </span>
            </div>
          </li>
        </ol>
      </nav>

      <div className="flex gap-6 flex-col  w-full h-fit ">
        <div className=" inline-flex gap-5 items-center w-full">
          <Image
            src={data?.logoUrl}
            alt="Logo Image"
            className=" w-10 h-10"
            width={50}
            height={50}
            blurDataURL="/64x64.png"
            placeholder="blur"
          />
          <h1 className=" font-bold sm:text-5xl text-xl">{data?.name}</h1>
          <PeerButton />
        </div>
        <p className="w-full h-fit satoshi-variable text-greyColorMuted font-medium sm:text-base">
          {data?.shortDescription}  
        </p>
        <VisiteWebsite data={data} />
      </div>
    </div>
  );
}
