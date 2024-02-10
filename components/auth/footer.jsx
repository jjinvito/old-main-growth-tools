import { BsDiscord } from "react-icons/bs";
import { BiLogoTiktok } from "react-icons/bi";
import { BiLogoInstagramAlt } from "react-icons/bi";
import { FaTwitter } from "react-icons/fa";
import Image from "next/image";

export default function AuthFooter() {
  return (
    <div className="bg-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div>
            <Image
                width="94"
                height="29"
              src="/footerLogo.png"
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
              <h3 className="text-lg font-semibold">Get in touch</h3>
              <nav className="mt-4">
                <ul className="space-y-3">
                  <li>
                    <a
                      className="flex items-center text-gray-600 hover:text-gray-800 gap-2"
                      href="#"
                    >
                      <Image src="/discord.png" width="20" height="14"/>
                      Join our Discord community
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Follow Us</h3>
              <nav className="mt-4 flex space-x-4">
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
