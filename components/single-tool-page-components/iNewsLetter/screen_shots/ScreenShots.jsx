import React from "react";
import Image from "next/image";
export default function () {
  return (
    <div className=" w-fit h-fit gap-4 p-2 flex flex-col">
      <h1 className=" font-extrabold text-xl">Website Screenshot</h1>
      <Image
        src="/cardImg.png"
        alt="Website ScreenShot is Not Loaded"
        className=" border-2 rounded-lg"
        width={50}
        height={50}
      />
    </div>
  );
}
