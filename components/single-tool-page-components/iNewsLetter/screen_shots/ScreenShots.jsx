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

export default function ScreenShots() {
  return (
    <>
      <h1 className="text-lg font-bold">Website Screenshots</h1>
      <div className="flex flex-col justify-center items-center">
        <Carousel className="w-full max-w-fit">
          <CarouselContent>
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <Card>
                    <CardContent className="flex aspect-auto items-center justify-center p-6">
                      {/* <span className="text-4xl font-semibold">
                        {index + 1}
                      </span> */}
                      <Image src="/webss.png" width={620} height={331} />
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
