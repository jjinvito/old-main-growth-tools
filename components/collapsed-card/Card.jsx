import React from 'react'
import Image from "next/image";
export default function Card() {
  return (
    <div className=" inline-flex gap-2 border-2 rounded-xl w-fit p-2 shadow-xl">
    <Image
      src="/logo-dark.png"
      className=" w-12 h-12 p-2 border-2 rounded-lg"
      width={50}
      height={50}
      alt="growth tools logo"
    />
    <div className="flex flex-col gap-1">
      <h1 className=" font-extrabold">iNewsLetter</h1>
      <p className=' text-blance sm:w-[280px] w-[210px] text-[14px]'>
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
  )
}
