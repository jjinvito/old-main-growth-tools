"use client";
import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import Hero from "@/components/Hero";
import List from "@/components/List";
import CollapsedCard from "@/components/collapsed-card/CollapsedCard";
import SEO from "@/components/SEO";
import { useDispatch } from "react-redux";
import {IoIosArrowBack} from "react-icons/io";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { fetchTools } from "@/lib/redux/features/tools/toolsSlice";
import { useRouter, useSearchParams } from "next/navigation";
import Footer from "@/components/footer";
import Filter from "@/components/filter";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const showAs = searchParams.get("showAs");

  useEffect(() => {
    dispatch(fetchTools());
  }, []);
console.log();

  return (
    <main className={`${inter.className} `}>
      <SEO
        title="Dir - A simple directory listing template"
        description="A simple directory listing template built with Next.js and Tailwind CSS."
        favicon="/favicon.ico"
        image="/og.png"
        url="https://copyui.com/"
        name="Copy UI"
      />

      <div className="flex dark:bg-black w-full h-screen">
        <Sidebar />

        <div className=" w-0 h-full  ">
        <button className=" xl:block hidden border-[1px] p-1 text-[#1F6BDA] bg-white rounded-full w-fit h-fit relative top-5 right-4 z-50   " > 
          <IoIosArrowBack size={20} />
        </button>
        </div>
        <div className="main w-full h-screen scrollbar-hide overflow-y-auto flex flex-col">
            <div><Header showSidebar setShowSidebar={true} /></div> 
          <div className=" overflow-y-scroll">
          <div className="sm:px-0 md:pl-7 px-4 h-fit">
            <Hero />
            <Filter />
            
            </div>
            {showAs == "Collapsed" ? (
              <div className="sm:px-0  px-4"><CollapsedCard />
              <Footer />
              </div>
            ) : (
              <div  >
              <div className="sm:px-0 md:pl-7 px-2">
                <List />
                <div className=" flex h-[10vh] justify-center items-center w-full ">
                  <button
                    type="button"
                    className=" w-[131px] h-[48px] text-center rounded-full  border dark:border-white border-[#000000] clash-display font-medium text-base"
                  >
                    View More
                  </button>
                </div>
                </div>
             <Footer />
              </div>
            )}
          </div>
          
        </div>
      </div>
    </main>
  );
}
