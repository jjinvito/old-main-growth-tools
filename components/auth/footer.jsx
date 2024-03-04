import { BsDiscord } from "react-icons/bs";
import { BiLogoTiktok } from "react-icons/bi";
import { BiLogoInstagramAlt } from "react-icons/bi";
import { FaTwitter } from "react-icons/fa";
import Image from "next/image";

export default function AuthFooter() {
  return (
    <div className="bg-white py-8 ">
      <div className="w-full  lg:px-8 flex justify-evenly items-center sm:flex-row flex-col gap-2">
        <div className="flex justify-between items-center sm:flex-row flex-col sm:gap-0 gap-3 w-full">
          <div>
            <Image
                width="94"
                height="29"
              src="/footerLogo.png"
              alt="Growth verality logo"
            />
          </div>
          <div className="flex space-x-12">
            <div>
              <h3 className="text-lg font-semibold">Menu</h3>
              <nav className="mt-4">
                <ul className="space-y-3">
                  <li>
                    <a className="text-gray-600 hover:text-gray-800" href="#">
                      Growth Virality
                    </a>
                  </li>
                  <li>
                    <a className="text-gray-600 hover:text-gray-800" href="#">
                      Growth Newsletter
                    </a>
                  </li>
                  <li>
                    <a className="text-gray-600 hover:text-gray-800" href="#">
                      Growth Articles
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-center">Get in touch</h3>
              <nav className="mt-4">
                <ul className="space-y-3 ">
                  <li>
                    <a
                      className="flex sm:flex-row flex-col  items-center text-gray-600 hover:text-gray-800 gap-2 text-center"
                      href="#"
                    >
                      <Image src="/discord.png" width="20" height="14" alt="Discord logo"/>
                      Join our Discord community
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Follow Us</h3>
              <nav className="mt-4 flex items-center sm:flex-row flex-col">
                <a className=" hover:text-gray-800" href="#">
                  <BiLogoTiktok className="h-5 w-5" />
                </a>
                <a className=" hover:text-gray-800" href="#">
                  <FaTwitter className="h-5 w-5" />
                </a>
                <a className=" hover:text-gray-800" href="#">
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
