import React, { useState } from "react"
import Image from "next/image"
import HeroLogo from "@/public/heroLogo.png"
import Vector from "@/public/Vector.png"
import Modal from '../components/Modal'
import {IoFilterCircleOutline} from "react-icons/io5"
import {BsGrid3X2} from "react-icons/bs"
export default function Hero() {
  const [modal,setModal] = useState(false)
  const toggleModal = ()=>
  {
    setModal(!modal)
    }
  return (
    <div className=" w-full h-[400px] flex flex-col xl:mt-0 mt-16 mb-4 ">
      <div className=" w-full h-[325px] flex flex-row">
        <div className="  w-[75%] h-[325px]  customFont font-bold gap-4 flex flex-col ">
          <h1 className=" text-[40px] ">
            Discover{" "}
            <span className="bg-gradient-to-r from-[#2661FA] to-[#32DDB4]  text-transparent bg-clip-text ">
              marketing tools
            </span>{" "}
            that supercharge your growth
          </h1>
          <p className=" font-medium  text-[16px]  w-full lg:w-[83%]">
            Browse through hundreds of unique tools to boost your marketing &
            startup. Start by clicking Categories below to pick tools in
            different marketing topics.
          </p>
          <div className=" inline-flex gap-4">
            <button className=" bg-black p-2 px-4 text-white rounded-3xl">
              View Latest Tools
            </button>
            <button className=" border-[1px] border-black p-2 px-4 text-black rounded-3xl font-normal">
              Trending tools
            </button>
          </div>
        </div>
        <div className="">
          <Image src={HeroLogo} width={315} height={305}></Image>
        </div>
      </div>
      <div className=" w-full h-[72px] inline-flex items-end gap-4">
        <button className=" rounded-3xl w-20 h-10 py-1 px-3 bg-[#F6F6F6] inline-flex justify-center gap-1 text-[#1855D9] items-center" onClick={toggleModal}>
          <IoFilterCircleOutline className=" text-[#1855D9] " size={30} />{" "}
          Filter
        </button>
        <p className=" h-8 text-center text-[#636363]">Show as:</p>
        <Image
          src={Vector}
          width={"100%"}
          height={"100%"}
          className=" h-8 opacity-30 pb-3"
        ></Image>
        <BsGrid3X2 size={30} className="text-[#1855D9] h-10" />
      </div>
      {modal === true ?<Modal/> : ''}
    </div>
  )
}
