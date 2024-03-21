"use client";

import React from "react";
import { useSelector } from "react-redux";

import DomyShoot from "./domy_shoot/DomyShoot";
import ScreenShots from "./screen_shots/ScreenShots";
import Marketing from "./marketing/Description&Marketing";
import AdsManagement from "./ads_managements/AdsManagement";
import Deals from "./deals/deals";

export default function INewsLetters() {
  const toolsData = useSelector((state) => state?.tool?.item);
  return (
    <div className=" flex flex-col gap-12 w-full h-fit ">
      <DomyShoot data={toolsData} />
      <ScreenShots data={toolsData} />
      <Deals data={toolsData} />
      <Marketing data={toolsData} />
      <div className="hidden xl:block">
        <AdsManagement />
      </div>
    </div>
  ); 
}
