import React from "react";
import { useSelector } from "react-redux";
import KeyFeatures from "./key_features/KeyFeatures";
import UseCase from "./use_case/UseCase";
import Advertisement from "./advertisement/Advertisement";
export default function feature() {
  const toolsData = useSelector((state) => state?.tool?.item);

  return (
    <div className=" flex flex-col gap-12  sticky top-0 w-[305px] sm:max-w-[365px]">
      <KeyFeatures data={toolsData} />
      <UseCase data={toolsData} />
      <Advertisement data={toolsData} />
    </div>
  );
}
