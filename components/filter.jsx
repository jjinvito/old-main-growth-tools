"use client";
import React, { useEffect, useState } from "react";
import { IoFilterCircleOutline } from "react-icons/io5";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import FilterCard from "./filterCard";
import { PageOverlay } from "./pageOverlay";
import { cn } from "@/lib/utils";

export default function Filter() {
  const searchParams = useSearchParams();
  const showAs = searchParams.get("showAs");
  const router = useRouter();
  console.log("showAs", showAs);
  const [toggleNav, setToggleNav] = useState(false);

  return (
    <div className="w-11/12 flex items-center gap-2 h-[72px] border-t-2">
      <div className={`relative ${toggleNav === true ? 'z-50': 'z-0'} `}>
        <button
          onClick={() => {
            setToggleNav(!toggleNav);
          }}
          className={cn(
            "rounded-3xl w-20 h-10 py-1 px-3 bg-[#F6F6F6] inline-flex justify-center gap-1 text-[#1855D9] items-center",
            toggleNav && "bg-blueStart text-white shadow-custom"
          )}
        >
          <IoFilterCircleOutline
            className={cn(
              "text-[#1855D9]",
              toggleNav && "text-white satoshi-variable"
            )}
            size={30}
          />
          Filter
        </button>
        <FilterCard toggleNav={toggleNav} />
      </div>

      <PageOverlay visibility={toggleNav} setToggleNav={setToggleNav} />

      <p className=" text-center dark:text-white text-[#636363] satoshi-variable text-sm font-medium">Show as:</p>
      <div className="flex h-[24px] w-[64px] gap-3 justify-center items-center">
        <button
          onClick={() => {
            router.push(`?showAs=Collapsed`);
          }}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill={`${showAs == "Collapsed" ? "#164CD9" : "#B3B3B3"}`}
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.25 0C1.46403 0 0 1.46403 0 3.25V14.75C0 16.536 1.46403 18 3.25 18H14.75C16.536 18 18 16.536 18 14.75V3.25C18 1.46403 16.536 0 14.75 0H3.25ZM3.25 1.5H4V4.5H1.5V3.25C1.5 2.27497 2.27497 1.5 3.25 1.5ZM5.5 1.5H14.75C15.725 1.5 16.5 2.27497 16.5 3.25V4.5H5.5V1.5ZM1.5 6H4V8.5H1.5V6ZM5.5 6H16.5V8.5H5.5V6ZM1.5 10H4V12.5H1.5V10ZM5.5 10H16.5V12.5H5.5V10ZM1.5 14H4V16.5H3.25C2.27497 16.5 1.5 15.725 1.5 14.75V14ZM5.5 14H16.5V14.75C16.5 15.725 15.725 16.5 14.75 16.5H5.5V14Z"
              fill={`${showAs == "Collapsed" ? "#164CD9" : "#B3B3B3"}`}
            />
            {/* {!(showAs == "collapsed") ? ( */}
            <defs>
              <linearGradient
                id="paint0_linear_2375_2624"
                x1="-2.36719"
                y1="-2.80291e-05"
                x2="38.9602"
                y2="2.34345"
                gradientUnits="userSpaceOnUse"
              >
                <stop
                  stop-color={`${
                    showAs == "Collapsed" ? "#164CD9" : "#B3B3B3"
                  }`}
                />
                <stop
                  offset="1"
                  stop-color={`${
                    showAs == "Collapsed" ? "#164CD9" : "#B3B3B3"
                  }`}
                />
              </linearGradient>
            </defs>
            {/* ) : (
              ""
            )} */}
          </svg>
        </button>
        <button
          onClick={() => {
            router.push(`/`);
          }}
        >
          <svg
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill={`${showAs == "Collapsed" ? "#B3B3B3" : "#164CD9"}`}
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.25 0.5C1.01625 0.5 0 1.51625 0 2.75V15.25C0 16.4838 1.01625 17.5 2.25 17.5H17.75C18.9838 17.5 20 16.4838 20 15.25V2.75C20 1.51625 18.9838 0.5 17.75 0.5H2.25ZM2.25 2H6V8.25H1.5V2.75C1.5 2.32675 1.82675 2 2.25 2ZM7.5 2H12.5V8.25H7.5V2ZM14 2H17.75C18.1733 2 18.5 2.32675 18.5 2.75V8.25H14V2ZM1.5 9.75H6V16H2.25C1.82675 16 1.5 15.6732 1.5 15.25V9.75ZM7.5 9.75H12.5V16H7.5V9.75ZM14 9.75H18.5V15.25C18.5 15.6732 18.1733 16 17.75 16H14V9.75Z"
              fill={`${showAs == "Collapsed" ? "#B3B3B3" : "#164CD9"}`}
            />
            <path
              d="M2.25 0.5C1.01625 0.5 0 1.51625 0 2.75V15.25C0 16.4838 1.01625 17.5 2.25 17.5H17.75C18.9838 17.5 20 16.4838 20 15.25V2.75C20 1.51625 18.9838 0.5 17.75 0.5H2.25ZM2.25 2H6V8.25H1.5V2.75C1.5 2.32675 1.82675 2 2.25 2ZM7.5 2H12.5V8.25H7.5V2ZM14 2H17.75C18.1733 2 18.5 2.32675 18.5 2.75V8.25H14V2ZM1.5 9.75H6V16H2.25C1.82675 16 1.5 15.6732 1.5 15.25V9.75ZM7.5 9.75H12.5V16H7.5V9.75ZM14 9.75H18.5V15.25C18.5 15.6732 18.1733 16 17.75 16H14V9.75Z"
              fill={`${showAs == "Collapsed" ? "#B3B3B3" : "#164CD9"}`}
            />

            {/* {showAs == "collapsed" ? ( */}
            <defs>
              <linearGradient
                id="paint0_linear_2375_2783"
                x1="-2.63021"
                y1="0.499974"
                x2="43.2326"
                y2="3.55958"
                gradientUnits="userSpaceOnUse"
              >
                <stop
                  stop-color={`${
                    showAs == "Collapsed" ? "#B3B3B3" : "#164CD9"
                  }`}
                />
                <stop
                  offset="1"
                  stop-color={`${
                    showAs == "Collapsed" ? "#B3B3B3" : "#164CD9"
                  }`}
                />
              </linearGradient>
            </defs>
            {/* ) : (
              ""
            )} */}
          </svg>
        </button>
      </div>
    </div>
  );
}
