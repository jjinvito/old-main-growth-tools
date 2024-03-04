"use client";

import Image from "next/image";

const DashboardPage = () => {
  return (
    <div className="flex flex-col gap-7 justify-center items-center w-full dark:bg-black xl:mt-0 mt-[70px]">
      <Image src="/logov2.png" width="347" height="110" alt="Growth Tools Logo" className=" px-4"/>
      <h1 className="customFont font-semibold text-2xl dark:text-white sm:text-start text-center">Welcome to Growth Tools Dashboard!!</h1>
    </div>
  );
};

export default DashboardPage;
