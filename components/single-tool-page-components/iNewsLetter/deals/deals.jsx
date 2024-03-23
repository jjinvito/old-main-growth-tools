import React from "react";
import Link from "next/link";

export default function Deals({ data }) {
  return (
    <div>
      <div className="text-lg font-semibold dark:text-white pb-2">Deals</div>

      <div className="grid grid-cols-12 md:grid-cols-8 gap-10  ">
        {data?.deals?.map((deal, index) => (
         
            <div
             key={index}
              className={
                "col-span-12 md:col-span-4 gap-1  w-full  p-5  border border-[#EAEAEA] rounded-2xl custom-shadow bg-white relative dark:border-neutral-800 dark:bg-black"
              }
            >
              <div className="font-semibold text-lg outline-1  disabled:bg-transparent dark:text-white dark:border-neutral-700 dark:bg-transparent">
                {deal.title}
              </div>

              <div className="flex items-center gap-1 my-1">
                <div className="text-muted  dark:text-white text-sm font-medium    outline-1 disabled:bg-transparent dark:bg-transparent">
                  {deal.price}
                </div>
                <div className="line-through dark:text-white text-sm font-medium  text-dull  outline-1 disabled:bg-transparent dark:bg-transparent">
                  {deal.originalPrice}
                </div>
                <div className="text-muted dark:text-white text-sm   outline-1 disabled:bg-transparent dark:bg-transparent">
                  /{deal.validity}
                </div>
              </div>

              <div className="font-medium text-acentGreen px-[9px] py-[7px] my-2 contentWidth border rounded-lg  disabled:bg-transparent dark:bg-transparent">
                {deal.savings}
              </div>

              <Link className="text-DBlue font-medium text-sm" href={deal.link}>
                Click to learn more
              </Link>
            </div>
        
        ))}
      </div>
    </div>
  );
}
