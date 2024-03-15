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
      <div className="flex flex-col justify-center items-center w-[620px] h-[331px]">
        <Carousel className="w-[620px] h-[331px]">
          <CarouselContent className="p-0">
            {data?.screenshots?.map((screenshot, index) => (
              <CarouselItem key={index} className="p-0">
                <div>
                  <Card className="p-0">
                    <CardContent className="flex aspect-square w-[620px] h-[331px] items-center justify-center p-0">
                      {/* Render each screenshot image */}
                      <Image
                        src={screenshot}
                        width={1080}
                        height={720}
                        alt="screenshot"
                      />
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </>
  );
}
