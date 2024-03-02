"use client";

import Image from "next/image";

const DashboardPage = () => {
  return (
    <div className="flex flex-col gap-7 justify-center items-center w-full dark:bg-black">
      <Image src="/logov2.png" width="357" height="110" alt="Growth Tools Logo"/>
      <h1 className="customFont font-semibold text-2xl dark:text-white">Welcome to Growth Tools Dashboard!!</h1>
    </div>
  );
};

export default DashboardPage;
