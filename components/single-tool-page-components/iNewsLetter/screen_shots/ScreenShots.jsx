// import React from "react";
// import Image from "next/image";
// import { Carousel } from "@/components/ui/carousel";

// export default function () {
//   return (
//     <div className=" w-fit h-fit gap-4 p-2 flex flex-col">
//       <h1 className=" font-extrabold text-xl">Website Screenshot</h1>
//       <Image
//         src="/cardImg.png"
//         alt="Website ScreenShot is Not Loaded"
//         className=" border-2 rounded-lg"
//         width={50}
//         height={50}
//       />
//     </div>
//   );
// }

import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function ScreenShots() {
  return (
    <Carousel className="w-full max-w-xs">
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-4xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
