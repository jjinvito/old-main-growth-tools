import React from "react";
import { BsLightbulbFill } from "react-icons/bs";
import { FaPlus } from "react-icons/fa6";
export default function ({ data }) {
  return (
    <div className=" flex flex-col gap-6">
      <div className="flex flex-col gap-3">
        <h1 className=" font-extrabold text-xl">Description</h1>
        <p>{data?.description}</p>
      </div>
      <div className=" inline-flex  border-2 border-[#00aeff] gap-2 justify-between p-5 rounded-2xl">
        <div className=" inline-flex gap-6 items-center">
          <BsLightbulbFill size={30} className="text-[#00aeff]" />
          <h3 className=" font-semibold sm:text-[13px] text-[8px] ">
            Do you have a better suggestion <br /> for Email Marketing?
          </h3>
        </div>
        <div className="inline-flex gap-2 items-center sm:p-2 p-1 lg:px-3 sm:px-5 px-1 bg-[#0091aa] rounded-3xl cursor-pointer">
          <FaPlus size={25} className=" text-white " />
          <h1 className=" font-semibold text-white sm:text-md lg:text-md sm:w-[100px] w-[70px] text-[10px]">
            Submit Tool
          </h1>
        </div>
      </div>
    </div>
  );
}
