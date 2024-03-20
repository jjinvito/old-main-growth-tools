
import React from "react";
import { RxSlash } from "react-icons/rx";
import Image from "next/image";
import PeerButton from "../PeerButton";
import VisiteWebsite from "../VisiteWebsite";
import Link from "next/link";

export default function DomyShoot({ data }) {
  return (
    <div className=" flex flex-col sm:items-start  gap-8 pb-8 border-b-2 w-full h-full ">
      {/* Breadcrumb Div */}
      <nav className="flex satoshi-variable" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-0 md:space-x-2 rtl:space-x-reverse ">
          <li className="inline-flex items-center">
            <Link
              href="/"
              className="dark:text-white inline-flex cursor-pointer items-center sm:text-sm md:text-base  font-bold text-black "
            >
              HomePage
            </Link>
          </li>
          <li>
            <div className="flex items-center">
              <RxSlash size={14} className=" font-extrabold" />
              <Link
                href="#"
                className="ms-1 sm:text-sm md:text-base   font-bold text-black  md:ms-2 dark:text-white "
              >
                Email Marketing
              </Link>
            </div>
          </li>
          <li aria-current="page">
            <div className="flex items-center">
              <RxSlash size={14} className=" font-extrabold" />
              <span className="dark:text-white ms-1 sm:text-base text-[14px] font-normal md:ms-2 text-[#999999]">
                INewsLetters
              </span>
            </div>
          </li>
        </ol>
      </nav>

      <div className="flex gap-6 flex-col  w-full h-fit ">
        <div className=" inline-flex gap-5 items-center w-full">
          <div className="w-16 h-16 rounded-lg border  border-[#F1F1F1] custom-shadow flex justify-center items-center">
          <Image
            src={data?.logoUrl}
            alt="Logo Image"
           
            width={30}
            height={30}
            blurDataURL="/64x64.png"
            placeholder="blur"
          /> 
          </div>
      
          <div className=" font-bold  dark:text-white sm:text-[20px] lg:text-[40px]">{data?.name}</div>
          <PeerButton />
        </div>
        <p className="w-full h-fit satoshi-variable dark:text-white text-greyColorMuted font-medium sm:text-base">
          {data?.shortDescription}  
        </p>
        <VisiteWebsite data={data} />
      </div>
    </div>
  );
}
