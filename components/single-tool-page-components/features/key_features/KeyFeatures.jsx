import React from "react";

export default function KeyFeatures({ data }) {
  return (
    <div className=" flex flex-col gap-2 ">
      <h1 className="font-semibold text-lg">Key Features</h1>
      {data?.keyFeatures?.map((feature, index) => (
        <p
          key={index}
          className="satoshi-variable text-base font-medium text-[#494949]"
        >
          - {feature}
        </p>
      ))}
    </div>
  );
}
