import { BsDiscord } from "react-icons/bs";
import { BiLogoTiktok } from "react-icons/bi";
import { BiLogoInstagramAlt } from "react-icons/bi";
import { FaTwitter } from "react-icons/fa";
import Image from "next/image";
import { cn } from "@/lib/utils";

export default function Footer({ className }) {
  return (
    <div
      className={cn(
        "bg-white  dark:bg-black shadow-2xl  lg:block",
        className
      )}
    >
      <div className="w-full px-8 pb-[20px] flex justify-evenly items-center sm:flex-row flex-col gap-2 custom_shadow">
        <div className="flex justify-between  sm:flex-row flex-col sm:gap-0 gap-3 w-full font-clash-display">
          <div className="flex">
            <div className="h-7 mr-2 pt-1">
              <Image
                width="28"
                height="28"
                src="/tool.png"
                alt="Growth verality logo"
              />
            </div>

            <div>
              <h3 className="text-lg follow_text mb-[-7px]  ">Growth</h3>
              <span className="text-[#868686] dark:text-white">tools</span>
            </div>
          </div>
          <div className="flex space-x-16">
            <div>
              <h3 className="text-lg main_menu pl-[15px]">Menu</h3>
              <nav className="mt-4">
                <ul className="space-y-3">
                  <li>
                    <a className="  font-medium text-nowrap" href="#">
                      Growth Virality
                    </a>
                  </li>
                  <li>
                    <a className="  font-medium text-nowrap" href="#">
                      Growth Newsletter
                    </a>
                  </li>
                  <li>
                    <a className=" font-medium text-nowrap" href="#">
                      Growth Articles
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
            <div className="pt-[43px]">
              <h3 className="font-medium  text-center flex">Get in touch</h3>
              <nav className="mt-4">
                <ul className="space-y-3 ">
                  <li>
                    <a
                      className="flex sm:flex-row flex-col font-medium items-center text-nowrap gap-2 text-center"
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
                <h3 className="text-lg follow_text text-nowrap">Follow Us</h3>
                <nav className="mt-4 flex items-center sm:flex-row flex-col gap-6  ">
                  <a className=" dark:text-white" href="#">
                    <BiLogoTiktok className="h-8 w-8 bg-black text-white p-[3px] rounded-sm" />
                  </a>
                  <a className=" dark:text-white" href="#">
                    <FaTwitter className="h-8 w-8" />
                  </a>
                  <a className=" dark:text-white" href="#">
                    <BiLogoInstagramAlt className="h-8 w-8" />
                  </a>
                </nav>
                
              </div>
              <div>
                <button
                  className="py-1.5 text-sm ml-2 bg-white text-black footer_btn  px-3 rounded-full w-[134px] h-[48px] border border-black font-semibold"
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
    </div>
  );
}
