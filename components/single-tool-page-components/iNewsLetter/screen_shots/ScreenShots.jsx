import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

export default function ScreenShots({ data }) {
  return (
    <>
      <h1 className=" text-lg font-semibold">Website Screenshots</h1>
      <div className=" flex flex-col p-4  rounded-lg border-2 border-[#F1F1F1]   justify-center items-center min-w-[260px]  ">
        <Carousel className=" w-10/12   rounded-xl">
          <CarouselContent className="">
            {data?.screenshots?.map((screenshot, index) => (
              <CarouselItem key={index} className=" w-full p-0">
                {/* <Card className=" p-0 w-full ">
                  <CardContent className=" p-0 bg-red-600 w-full"> */}
                    {/* Render each screenshot image */}
                    <Image
                      src={screenshot}
                    width={100}
                    height={331}
                      alt="screenshot"
                      className=" w-full h-[331px] object-cover  mx-auto    "
                    />
                  {/* </CardContent>
                </Card> */}
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className=" lg:block hidden w-fit px-2  " />
          <CarouselNext className="lg:block hidden  w-fit px-2 cursor-pointer " />

          <CarouselPrevious className=" lg:hidden cursor-pointer absolute left-[30%] top-[100%] bottom-0 mt-10 flex  items-center " />
          <CarouselNext className="lg:hidden absolute cursor-pointer right-[30%] top-[100%] bottom-0 mt-10 flex items-center " />
        </Carousel>
      </div>
    </>
  );
}
