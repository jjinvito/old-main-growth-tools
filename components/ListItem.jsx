// check if media is loaded
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export default function ListItem(props) {
  const [loaded, setLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  console.log("props=", props.item);
  useEffect(() => {
    if (props.item.image && !props.item.video) {
      const img = new Image();
      img.src = props.item.image;
      img.onload = () => {
        setLoaded(true);
      };
    } else if (props.item.video) {
      const video = document.createElement("video");
      video.src = props.item.video;
      video.onloadeddata = () => {
        setLoaded(true);
      };
    } else {
      setLoaded(true);
    }
  }, []);

  return (
    <div
      role="list-item"
      className="transition ease-in-out h-[337px]  rounded-xl max-w-[360px] min-w-[240px] mb-4 col-span-12 md:col-span-6 lg:col-span-4 "
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link
        href={"/tool/" + props.item.id}
        className="hover:opacity-90 transition"
      >
        <div
          className={cn(
            "relative w-full  rounded-2xl h-[250px] bg-cover bg-center custom-shadow dark:border-dark-500 border-solid transition duration-200 overflow-hidden",
            props.item.color
          )}
          alt=""
        >
          <div className="flex justify-center items-end h-full w-full">
            <Image
              className={cn(
                "ease block object-cover rounded-t-xl transition ease-in-out delay-150 duration-200 w-44 h-48 custom-shadow-2 cards",
                isHovered && "-translate-y-1 scale-x-150 scale-y-125 new-shadow"
              )}
              src={props.item.primaryScreenshot}
              alt={`This is the primary screenshot of ${props.item.name}`}
              width={225}
              height={197}
              style={{ display: loaded ? "block" : "none" }}
            />
          </div>

          {!loaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 text-white ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="50"
                height="50"
                viewBox="0 0 50 50"
                fill="currentColor"
                className="w-8 h-8"
              >
                <path d="M25.251,6.461c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615V6.461z">
                  <animateTransform
                    attributeType="xml"
                    attributeName="transform"
                    type="rotate"
                    from="0 25 25"
                    to="360 25 25"
                    dur="0.6s"
                    repeatCount="indefinite"
                  ></animateTransform>
                </path>
              </svg>
            </div>
          )}

          <div
            className={cn(
              "absolute top-0 p-2 m-2 rounded-lg transition-colors duration-400 ease-in-out bg-transparent",
              isHovered ? "bg-white" : "bg-transparent"
            )}
          >
            <img src={props.item.logoUrl} width={32} height={32} />
          </div>

          <div className="absolute right-1 top-0 flex items-center justify-center">
            {/* <div
              className={cn(
                "p-2 m-2 rounded-lg transition-colors duration-400 ease-in-out bg-transparent",
                isHovered ? "bg-white" : "bg-transparent"
              )}
            >
              <img src={props.item.icon2} width={20} height={20} />
            </div> */}

            {/* <div
                className={cn(
                  "p-2 m-2 rounded-lg transition-colors duration-400 ease-in-out bg-transparent",
                  !props.item.icon3
                    ? "hidden"
                    : isHovered
                    ? "bg-white"
                    : "bg-transparent"
                )}
              >
                <Image src="/deal.png" width={20} height={20} />
              </div> */}

            {props.item.deals && (
              <div
                className={cn(
                  "p-2 m-2 rounded-lg transition-colors duration-400 ease-in-out bg-transparent",
                  isHovered ? "bg-white" : "bg-transparent"
                )}
              >
                <Image
                  src="/deal.png"
                  width={35}
                  height={20}
                  alt="deal icon used to identify if any deal offered by tool owner"
                />
              </div>
            )}
          </div>

          <div
            className={cn(
              "absolute bottom-2 right-2 transition-opacity duration-500 ease-in-out opacity-100 ",
              isHovered ? "md:opacity-100" : "md:opacity-0"
            )}
          >
            <img src="/hoverClap.png" width={48} height={48} alt="" />
          </div>
        </div>
      </Link>

      <div className="flex justify-between items-center mt-2">
        <div href="" className="">
          <h2 className=" hover:text-dark-500  dark:text-white dark:hover:text-dark-100 transition duration-200 font-semibold text-base">
            {props.item.name}
          </h2>
          <p className="hover:text-dark-500  dark:text-white  h-16 satoshi-variable text-[#494949] text-sm font-medium">
            {props.item.shortDescription}
          </p>
        </div>
      </div>
    </div>
  );
}
