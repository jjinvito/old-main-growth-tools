import React from "react";
import { RxSlash } from "react-icons/rx";
import Image from "next/image";
import PeerButton from "../PeerButton";
import VisiteWebsite from "../VisiteWebsite";
export default function DomyShoot() {
  return (
    <div className=" flex flex-col sm:items-start items-center gap-8 pb-8 border-b-2 ">
      {/* Breadcrumb Div */}
      <nav className="flex" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
          <li className="inline-flex items-center">
            <a
              href="#"
              className="inline-flex items-centersm:text-sm text-[12px] font-bold text-black "
            >
              HomePage
            </a>
          </li>
          <li>
            <div className="flex items-center">
              <RxSlash size={14} className=" font-extrabold" />
              <a
                href="#"
                className="ms-1 sm:text-sm text-[12px] font-bold text-black  md:ms-2 dark:text-gray-400 "
              >
                Email Marketing
              </a>
            </div>
          </li>
          <li aria-current="page">
            <div className="flex items-center">
              <RxSlash size={14} className=" font-extrabold" />
              <span className="ms-1 sm:text-sm text-[12px] font-bold text-black md:ms-2">
                INewsLetters
              </span>
            </div>
          </li>
        </ol>
      </nav>

      <div className="flex gap-6 flex-col sm:items-start items-center ">
        <div className=" inline-flex gap-5  items-center">
          <Image
            src="/logo-dark.png"
            alt="Logo Image"
            className=" w-10 h-10"
            width={50}
            height={50}
          />
          <h1 className=" font-extrabold sm:text-5xl text-xl">Domyshoot</h1>
          <PeerButton />
        </div>
        <p className=" sm:w-full w-[80%]">
          DoMyShoot is an AI powered product photography app to help online
          sellers create pro-quality photos,cheaper and faster
        </p>
        <VisiteWebsite />
      </div>
    </div>
  );
}
