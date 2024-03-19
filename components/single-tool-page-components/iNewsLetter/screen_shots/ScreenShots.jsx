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
      <div className=" flex flex-col  justify-center items-center min-w-[260px] h-[331px]">
        <Carousel className=" w-full h-[331px]">
          <CarouselContent className="p-0">
            {data?.screenshots?.map((screenshot, index) => (
              <CarouselItem key={index} className="p-0 w-full">
                <Card className=" p-0 w-full ">
                  <CardContent className=" p-0 w-full">
                    {/* Render each screenshot image */}
                    <Image
                      src={screenshot}
                      width={1980}
                      height={720}
                      alt="screenshot"
                      className=" w-full  mx-auto  object-cover h-fit "
                    />
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className=" lg:block hidden w-fit px-2  " />
          <CarouselNext className="lg:block hidden  w-fit px-2 " />

          <CarouselPrevious className=" lg:hidden absolute left-[30%] top-[100%] bottom-0 mt-10 flex  items-center " />
          <CarouselNext className="lg:hidden absolute right-[30%] top-[100%] bottom-0 mt-10 flex items-center " />
        </Carousel>
      </div>
    </>
  );
}
