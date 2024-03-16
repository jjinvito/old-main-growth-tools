"use client";
import React, { useState } from "react";

export default function FilterCard({ toggleNav }) {
  const [category, setCategory] = useState([
    {
      id: "Analytics",
      check: false,
    },
    {
      id: "File Management",
      check: false,
    },
    {
      id: "Design",
      check: false,
    },
    {
      id: "Content",
      check: false,
    },
    {
      id: "Productivity",
      check: false,
    },
    {
      id: "Email Marketing",
      check: false,
    },
    {
      id: "SEO",
      check: false,
    },
    {
      id: "Customer Support",
      check: false,
    },
    {
      id: "Social Media",
      check: false,
    },
  ]);
  return (
    <div
      id="exclude-blur"
      className={` ${
        toggleNav ? "block" : "hidden"
      } bg-[#fff] clash-display border p-7 border-[#E3E3E3] flex flex-col items-start md:w-[413px] mt-1 sm:mr-0 sm:w-[205px] z-10     text-[15px] justify-center rounded-[16px]    absolute shadow-md`}
    >
      <div className="flex flex-col  w-full">
        <div className=" flex flex-row justify-between items-center">
          <div className="font-semibold text-[16px]">Filter</div>
          <div className="text-DBlue font-semibold text-sm satoshi-variable">
            Reset
          </div>
        </div>

        <div className="flex gap-4 items-center my-3">
          <div className="checkbox-wrapper-13 flex items-center gap-1">
            <input id="c1-13" type="checkbox" />
            <label
              for="c1-13"
              className="satoshi-variable text-[#636363] text-sm font-medium"
            >
              Deals
            </label>
          </div>

          <div className="gap-1 flex items-center satoshi-variable checkbox-wrapper-13">
            <input id="c1-13" type="checkbox" />
            <label className="text-[#636363] text-sm font-medium">Trends</label>
          </div>
        </div>

        <div className="font-semibold text-[16px] my-1">Categories</div>
        <div className="grid grid-cols-2 gap-4 items-center my-3">
          {category.map((obj, index) => (
            <div
              key={index}
              className="flex gap-2 items-center satoshi-variable checkbox-wrapper-13"
            >
              <input
                // className="text-[#636363] border border-[#C2C2C2] w-[20px] h-[20px]"
                id="c1-13"
                type="checkbox"
                checked={obj.check}
                onChange={() => {
                  const updatedCategory = [...category];
                  updatedCategory[index].check = !updatedCategory[index].check;
                  setCategory(updatedCategory);
                }}
              />
              <label
                for="c1-13"
                className="satoshi-variable text-[#636363] text-sm font-medium"
              >
                {obj.id}
              </label>
            </div>
          ))}
        </div>

        <div className="font-semibold text-[16px] my-1">Sort by</div>

        {/* <div className="flex gap-4 items-center my-3">
          <div className="gap-2 flex items-center">
            <input
              className="text-[#636363] border border-[#C2C2C2] w-[20px] h-[20px]"
              type="radio"
            />
            <label className="text-[#636363] text-sm font-medium satoshi-variable">
              Rating
            </label>
          </div>
          <div className="gap-2 flex items-center">
            <input
              className="text-[#636363] border border-[#C2C2C2] w-[20px] h-[20px]"
              type="radio"
            />
            <label className="text-[#636363] text-sm font-medium satoshi-variable">
              A-Z
            </label>
          </div>
          <div className="gap-2 flex items-center">
            <input
              className="text-[#636363] border border-[#C2C2C2] w-[20px] h-[20px]"
              type="radio"
            />
            <label className="text-[#636363] text-sm font-medium satoshi-variable">
              Z-A
            </label>
          </div>
        </div> */}

        <div class="flex gap-7 w-max satoshi-variable">
          <div class="inline-flex items-center">
            <label
              class="relative flex items-center rounded-full cursor-pointer"
              htmlFor="blue"
            >
              <input
                name="color"
                type="radio"
                class="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200 text-blue-500 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-blue-500 checked:before:bg-blue-500 hover:before:opacity-10"
                id="blue"
              />
              <span class="absolute text-blue-500 transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-3.5 w-3.5"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                >
                  <circle data-name="ellipse" cx="8" cy="8" r="8"></circle>
                </svg>
              </span>
            </label>
            <label className="text-[#636363] text-sm font-medium satoshi-variable pl-3">
              Rating
            </label>
          </div>
          <div class="inline-flex items-center">
            <label
              class="relative flex items-center p-3 rounded-full cursor-pointer"
              htmlFor="blue"
            >
              <input
                name="color"
                type="radio"
                class="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200 text-blue-500 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-blue-500 checked:before:bg-blue-500 hover:before:opacity-10"
                id="blue"
              />
              <span class="absolute text-blue-500 transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-3.5 w-3.5"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                >
                  <circle data-name="ellipse" cx="8" cy="8" r="8"></circle>
                </svg>
              </span>
            </label>
            <label className="text-[#636363] text-sm font-medium satoshi-variable">
              A-Z
            </label>
          </div>
          <div class="inline-flex items-center">
            <label
              class="relative flex items-center p-3 rounded-full cursor-pointer"
              htmlFor="blue"
            >
              <input
                name="color"
                type="radio"
                class="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200 text-blue-500 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-blue-500 checked:before:bg-blue-500 hover:before:opacity-10"
                id="blue"
              />
              <span class="absolute text-blue-500 transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-3.5 w-3.5"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                >
                  <circle data-name="ellipse" cx="8" cy="8" r="8"></circle>
                </svg>
              </span>
            </label>
            <label className="text-[#636363] text-sm font-medium satoshi-variable">
              Z-A
            </label>
          </div>
        </div>

        <div>
          <button className=" bg-black p-2 px-4 w-full font-bold text-[16px] text-white rounded-3xl">
            Apply
          </button>
        </div>

        <div></div>
      </div>
    </div>
  );
}
