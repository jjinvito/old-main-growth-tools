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
      <h1 className="text-lg font-bold">Website Screenshots</h1>
      <div className="flex flex-col justify-center items-center">
        <Carousel className="w-full max-w-fit">
          <CarouselContent>
            {data?.screenshots?.map((screenshot, index) => (
              <CarouselItem key={index}>
                <div >
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center">
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
