import React from "react";

export default function Deals() {
  return (
    <div>
      <div className="text-lg font-semibold dark:text-white pb-2">Deals</div>

      <div className="flex gap-10">
        <div className="flex dark:bg-black">
          <div
            className={
              "flex flex-col justify-start gap-1  h-[156px] w-[295px] p-5 border rounded-lg drop-shadow-xl bg-white relative dark:border-neutral-800 dark:bg-black"
            }
          >
            <div className="font-bold outline-1 w-44 disabled:bg-transparent dark:text-white dark:border-neutral-700 dark:bg-transparent">
              LifeTime 50% off
            </div>

            <div className="flex">
              <div className="text-muted text-sm w-11 outline-1 disabled:bg-transparent dark:bg-transparent">
                $4.99
              </div>
              <div className="line-through text-dull w-8 outline-1 disabled:bg-transparent dark:bg-transparent">
                $10
              </div>
              <div className="text-muted text-sm w-16 outline-1 disabled:bg-transparent dark:bg-transparent">
                monthly
              </div>
            </div>

            <div className="font-medium text-acentGreen p-2 border rounded-lg w-[132px] disabled:bg-transparent dark:bg-transparent">
              {" "}
              You save $5.01
            </div>

            <a className="text-DBlue font-medium text-sm" href="#">
              Click to learn more
            </a>
          </div>
        </div>
        <div className="flex dark:bg-black">
          <div
            className={
              "flex flex-col justify-start gap-1  h-[156px] w-[295px] p-5 border rounded-lg drop-shadow-xl bg-white relative dark:border-neutral-800 dark:bg-black"
            }
          >
            <div className="font-bold outline-1 w-44 disabled:bg-transparent dark:text-white dark:border-neutral-700 dark:bg-transparent">
              LifeTime 50% off
            </div>

            <div className="flex">
              <div className="text-muted text-sm w-11 outline-1 disabled:bg-transparent dark:bg-transparent">
                $4.99
              </div>
              <div className="line-through text-dull w-8 outline-1 disabled:bg-transparent dark:bg-transparent">
                $10
              </div>
              <div className="text-muted text-sm w-16 outline-1 disabled:bg-transparent dark:bg-transparent">
                monthly
              </div>
            </div>

            <div className="font-medium text-acentGreen p-2 border rounded-lg w-[132px] disabled:bg-transparent dark:bg-transparent">
              {" "}
              You save $5.01
            </div>

            <a className="text-DBlue font-medium text-sm" href="#">
              Click to learn more
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
