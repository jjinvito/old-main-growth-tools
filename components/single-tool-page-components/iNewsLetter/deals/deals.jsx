import React from "react";
import Link from "next/link";

export default function Deals({ data }) {
  return (
    <div>
      <div className="text-lg font-semibold dark:text-white pb-2">Deals</div>

      <div className="flex gap-10 w-full flex-wrap">
        {data?.deals?.map((deal, index) => (
          <div key={index} className="flex dark:bg-black sm:w-[45%] w-full">
            <div
              className={
                "flex flex-col justify-start gap-1 h-[156px] w-full  p-5 border rounded-lg drop-shadow-xl bg-white relative dark:border-neutral-800 dark:bg-black"
              }
            >
              <div className="font-bold outline-1 w-44 disabled:bg-transparent dark:text-white dark:border-neutral-700 dark:bg-transparent">
                {deal.title}
              </div>

              <div className="flex">
                <div className="text-muted text-sm w-11 outline-1 disabled:bg-transparent dark:bg-transparent">
                  {deal.price}
                </div>
                <div className="line-through text-dull w-8 outline-1 disabled:bg-transparent dark:bg-transparent">
                  {deal.originalPrice}
                </div>
                <div className="text-muted text-sm w-16 outline-1 disabled:bg-transparent dark:bg-transparent">
                  {deal.validity}
                </div>
              </div>

              <div className="font-medium text-acentGreen p-2 border rounded-lg w-[140px] disabled:bg-transparent dark:bg-transparent">
                {deal.savings}
              </div>

              <Link className="text-DBlue font-medium text-sm" href={deal.link}>
                Click to learn more
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
