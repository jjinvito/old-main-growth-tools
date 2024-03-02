import React from "react";
import { FaStar } from "react-icons/fa6";
export default function ({ data }) {
  return (
    <div className="flex flex-col gap-4">
      <h1 className=" font-bold text-xl">Use Case</h1>
      {data?.useCases?.map((useCase, index) => {
        return (
          <div className=" inline-flex gap-4" key={index}>
            <div>
              <FaStar size={30} className=" text-specialOrange2" />
            </div>
            <p>{useCase}</p>
          </div>
        );
      })}
    </div>
  );
}
