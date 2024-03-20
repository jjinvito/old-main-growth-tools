import React from "react";
import VisiteWebsite from "../VisiteWebsite";
import Image from "next/image";
import Card from "../../../collapsed-card/Card";

export default function AdsManagement() {
  const data = {
    id: "cltk0wpeg000d1dqcl4vpi2hx",
    logoUrl:
      "/CleanShot.png",
    name: "iNewsletter",
    shortDescription:
      "Quickly publish, edit and distribute more engaging content for your multi-page, long format newsletter.",
    deals: [
      {
        id: "cltmpfjd00003o41uoncfye8i",
        toolId: "cltk0wpeg000d1dqcl4vpi2hx",
        title: "LifeTime 50% off",
        price: "$4.99",
        originalPrice: "$10",
        validity: "monthly",
        savings: "You save $5.01",
        link: "https://enterLinkHere/forAboveButton",
      },
    ],
  };
  const data2 = {
    id: "cltk0wpeg000d1dqcl4vpi2hx",
    logoUrl:
      "/mailReach.png",
    name: "iNewsletter",
    shortDescription:
      "Quickly publish, edit and distribute more engaging content for your multi-page, long format newsletter.",
    deals: [],
  };

  return (
    <div className=" flex flex-col gap-3 w-full h-full">
      <h1 className=" font-semibold sm:text-lg text-base w-full h-fit ">
        Discover <span className=" text-[#1D66DA]">more</span> Ads Management
        tools
      </h1>

      {/* <div className=" inline-flex gap-2 border-2 rounded-xl w-full p-2 shadow-xl">
        <Image
          src="/logo-dark.png"
          className=" w-12 h-12 p-2 border-2 rounded-lg"
          width={50}
          height={50}
          alt="growth tools logo"
        />
        <div className="flex flex-col gap-1">
          <h1 className=" font-extrabold">iNewsLetter</h1>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ullam nisi
            inventore dolorem .
          </p>
          <div className="inline-flex gap-3 items-center">
            <Image
              src="/cardImg.png"
              className=" w-10 h-10 p-2 border-2 rounded-lg"
              width={50}
              height={50}
            />
            <h1 className=" font-extrabold text-[blue]">Deal</h1>
          </div>
        </div>
      </div>
      <div className=" inline-flex gap-2 border-2 rounded-xl w-full p-2 shadow-xl">
        <Image
          src="/logo-dark.png"
          className=" w-12 h-12 p-2 border-2 rounded-lg"
          width={50}
          height={50}
        />
        <div className="flex flex-col gap-1">
          <h1 className=" font-extrabold">Mail Reach</h1>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ullam nisi
            inventore dolorem .
          </p>
        </div>
      </div> */}

      <Card
        data={data}
        classNames="w-full"
        descriptionWidth="w-full"
        singleToolpage
      />
      <Card
        data={data2}
        classNames="w-full"
        descriptionWidth="w-full"
        singleToolpage
      />

      <small className=" text-[#1D66DA] font-medium text-sm mb-6">
        Browse 1 Ads Management tool
      </small>
      <VisiteWebsite />
    </div>
  );
}
