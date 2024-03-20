import { BsDiscord } from "react-icons/bs";
import { BiLogoTiktok } from "react-icons/bi";
import { BiLogoInstagramAlt } from "react-icons/bi";
import { FaTwitter } from "react-icons/fa";
import Image from "next/image";
import { cn } from "@/lib/utils";

export default function Footer({ className }) {
  return (
    <div className={cn("bg-white py-8 h-[195px] dark:bg-black shadow-2xl hidden lg:block", className)}>
      <div className="w-full  lg:px-8 flex justify-evenly items-center sm:flex-row flex-col gap-2">
        <div className="flex justify-between items-center sm:flex-row flex-col sm:gap-0 gap-3 w-full">
          <div className="flex">
            <div className="h-7 mr-2">
            <Image
              width="28"
              height="28"
              src="/tool.png"
              alt="Growth verality logo"
            />
            </div>
         
            <div>
            <h3 className="text-lg font-semibold">Growth</h3>
            <span className="text-[#868686] dark:text-white">tool</span>
            </div>

          </div>
          <div className="flex space-x-12">
            <div>
              <h3 className="text-lg font-semibold">Menu</h3>
              <nav className="mt-4">
                <ul className="space-y-3">
                  <li>
                    <a className="text-gray-600 dark:text-white hover:text-gray-800" href="#">
                      Growth Virality
                    </a>
                  </li>
                  <li>
                    <a className="text-gray-600 dark:text-white hover:text-gray-800" href="#">
                      Growth Newsletter
                    </a>
                  </li>
                  <li>
                    <a className="text-gray-600 dark:text-white hover:text-gray-800" href="#">
                      Growth Articles
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-center">
                Get in touch
              </h3>
              <nav className="mt-4">
                <ul className="space-y-3 ">
                  <li>
                    <a
                      className="flex sm:flex-row flex-col dark:text-white  items-center text-gray-600 hover:text-gray-800 gap-2 text-center"
                      href="#"
                    >
                      <Image
                        src="/discord.png"
                        width="20"
                        height="14"
                        alt="Discord logo"
                      />
                      Join our Discord community
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Follow Us</h3>
              <nav className="mt-4 flex items-center sm:flex-row flex-col">
                <a className=" hover:text-gray-800 dark:text-white" href="#">
                  <BiLogoTiktok className="h-5 w-5" />
                </a>
                <a className=" hover:text-gray-800 dark:text-white" href="#">
                  <FaTwitter className="h-5 w-5" />
                </a>
                <a className=" hover:text-gray-800 dark:text-white" href="#">
                  <BiLogoInstagramAlt className="h-5 w-5" />
                </a>
              </nav>
            </div>
          </div>
          <div>
            <button
              className="py-1.5 text-sm ml-2 bg-white text-black  px-3 rounded-full w-[134px] h-[48px] border border-black font-semibold"
              // onClick={() => {
              //   setShowSignUpModal(!showSignUpModal);
              // }}
            >
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
