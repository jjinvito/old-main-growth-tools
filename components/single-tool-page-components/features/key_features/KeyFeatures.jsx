import React from "react";

export default function KeyFeatures({ data }) {
  return (
    <div className=" flex flex-col gap-2 ">
      <h1 className="font-bold">KeyFeatures</h1>
      {data?.keyFeatures?.map((feature, index) => (
        <p key={index} className=" text-balance">
          - {feature}
        </p>
      ))}
    </div>
  );
}
