import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

const PreviewCard = ({ watch }) => {
  const [isHovered, setIsHovered] = useState(false);
  const title = watch("name");
  const description = watch("shortDescription");
  const logo = watch("logoUrl");
  const deals = watch("deals");
  const primaryScreenshot = watch("primaryScreenshot");

  return (
    <div
      role="list-item"
      className="transition ease-in-out w-96 rounded-xl p-4 h-80 sticky top-0"
    >
      <h1 className="font-bold text-xl mb-3 dark:text-white">Card Preview</h1>
      <div
        className={cn(
          "relative w-full  rounded-xl h-[250px] bg-cover bg-center border-[1px] border-light-100 dark:border-dark-500 border-solid transition duration-200 overflow-hidden"
        )}
        alt=""
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex justify-center items-end h-full w-full">
          <Image
            height={100}
            width={100}
            className={cn(
              "ease block object-cover rounded-t-xl transition ease-in-out delay-150 duration-200 w-44 h-48 custom-shadow-2 cards",
              isHovered && "-translate-y-1 scale-x-150 scale-y-125 new-shadow"
            )}
            src={primaryScreenshot ? primaryScreenshot : "/cardImg.png"}
            alt="primaryScreenshot"
          />
        </div>

        <div
          className={cn(
            "absolute top-0 p-2 m-2 rounded-lg transition-colors duration-400 ease-in-out bg-transparent",
            isHovered ? "bg-white" : "bg-transparent"
          )}
        >
          <Image src={logo ? logo : "/logov2.png"} width={32} height={32} alt="logo"/>
        </div>
        {deals.length && (
          <div className="absolute right-1 top-0 flex items-center justify-center">
            <div
              className={cn(
                "p-2 m-2 rounded-lg transition-colors duration-400 ease-in-out bg-transparent",
                isHovered ? "bg-white" : "bg-transparent"
              )}
            >
              <Image src="/deal.png" width={35} height={20} alt="deal Icon"/>
            </div>
          </div>
        )}

        <div
          className={cn(
            "absolute bottom-2 right-2 transition-opacity duration-500 ease-in-out opacity-100 ",
            isHovered ? "md:opacity-100" : "md:opacity-0"
          )}
        >
          <Image src="/hoverClap.png" width={48} height={48} alt="clap icon" />
        </div>
      </div>

      <div className="flex justify-between items-center mt-2">
        <a href="" className="">
          <h2 className=" hover:text-dark-500  dark:text-white dark:hover:text-dark-100 transition duration-200 font-bold">
            {title ? title : "Name"}
          </h2>
          <p className="hover:text-dark-500  dark:text-white text-sm h-16">
            {description ? description : "Description"}
          </p>
        </a>
      </div>
    </div>
  );
};

export default PreviewCard;
