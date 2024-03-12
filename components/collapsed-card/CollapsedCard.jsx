import React from "react";
import Card from "./Card";
import { useSelector } from "react-redux";
export default function CollapsedCard() {
  const toolsData = useSelector((state) => state?.tools?.items);
  console.log("toolsData",toolsData)
  return (
    <div className="  w-[98%] h-fit flex flex-row flex-wrap gap-3  items-center">
      {
        toolsData?.map((obj)=>(
          <Card data={obj} />

        ))

      }
      
      {/* <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card /> */}
    </div>
  );
}
