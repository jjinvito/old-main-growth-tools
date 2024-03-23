import * as React from "react"
import { useEffect } from "react"
import { DropdownMenu, DropdownMenuContent } from "@/components/ui/dropdown-menu"
import Image from "next/image"
import img1 from "../public/File Manager.png";
import img2 from "../public/Project Manager.png";
import img3 from "../public/Influencer Management.png";
import img4 from "../public/Ads Management.png";
import img5 from "../public/CleanShot.png"; 
import img6 from "../public/SaleMate.png"; 
import img7 from "../public/mailReach.png"; 
import searcbot from "@/public/searchBot.png"
const SearchDropDown =({ open, setOpen })=> {
 
  const catorgies = [
    {
      name: "File Management",
      pic: img1
    },
    {
      name: "Project Management",
      pic: img2
    },
    {
      name: "Influencer Management",
      pic: img3
    },
    {
      name: "Ads Management",
      pic: img4
    },
  ]
  const websites = [
    {
      name: "iNewsletter",
      pic: img5,
      link: "https://website.com"
    },
    {
      name: "Salesmate",
      pic: img6,
      link: "https://website.com"
    },
    {
      name: "MailReach",
      pic: img7,
      link: "https://website.com"
    },
  
  ]
  const closeDropdown = () => {
    setOpen(false)
  }
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!event.target.closest(".dropdown-container")) {
        closeDropdown()
      }
    }
    if (open) {
      document.addEventListener("click", handleOutsideClick)
    } else {
      document.removeEventListener("click", handleOutsideClick)
    }
    return () => {
      document.removeEventListener("click", handleOutsideClick)
    }
  }, [open])
  return (
    <div className="fixed top-[70px] border mt-2 sm:left-[27%] left-0 right-0 bg-white rounded-xl pb-1 shadow ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none  sm:w-[430px] w-full h-[500px] z-50 p-4 flex flex-col gap-10">
      <DropdownMenu open={open} onOpenChange={setOpen}  >
        {/* Catogeries Div */}
        <div className="flex flex-col gap-2 w-full">
            <h1 className="clash-display font-semibold text-[16px]
            ">Catogeries </h1>
            {catorgies.map((item)=>{
              return(
                <div className="inline-flex gap-2 items-center">
                  <Image src={item.pic} width={20}/>
                  <h1 className=" text-[#636363] satoshi-variable text-sm font-medium">{item.name}</h1>
                
                </div>
              )
            })}
     {/* Websites Div */}
        </div>
        <div className="flex flex-col gap-4 border-none ">
            <h1 className="clash-display font-semibold text-[16px]
            ">Websites </h1>
            {websites.map((item)=>{
              return(
                <div className="inline-flex gap-4 items-center ">
                 
                  <Image src={item.pic} width={45} className=" bg-white border-[1px]  p-[6px] rounded-[8px]"/>
                  <div className=" flex flex-col gap-1">
                  <h1 className="  clash-display font-semibold text-sm">{item.name}</h1>
                  <p className="satoshi-variable text-[#636363] font-mediun text-sm">{item.link}</p>
                  </div>
                
                </div>
              )
            })}
           <button  className=" mt-6 bg-[#2173DB] inline-flex gap-2 rounded-full w-full  h-[40px]  justify-center items-center ">
          <Image src={searcbot} width={15} height={15}  />
          <p className="  text-white text-sm satoshi-variable font-bold">Try AI Search</p>
          </button>
        </div>

      </DropdownMenu>
    </div>
  )
}

export default SearchDropDown