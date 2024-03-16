import React from "react";
import { FaStar } from "react-icons/fa6";
export default function ({ data }) {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="font-semibold text-lg">Use Cases</h1>
      {data?.useCases?.map((useCase, index) => {
        return (
          <div className=" inline-flex gap-4" key={index}>
            <div>
              <FaStar size={30} className=" text-specialOrange2" />
            </div>
            <p className="satoshi-variable text-base font-medium text-[#494949]">
              {useCase}
            </p>
          </div>
        );
      })}
    </div>
  );
}
