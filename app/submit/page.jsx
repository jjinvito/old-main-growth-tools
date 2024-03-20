'use client';

import { useState, useEffect } from "react";

import Hero from "@/components/Hero";
import List from "@/components/List";
import SEO from "@/components/SEO";
import "@/styles/globals.css";

import { Inter } from "next/font/google";
import SubmitForm from "@/components/SubmitForm";
import SubmitReview from "@/components/SubmitReview";
const inter = Inter({ subsets: ["latin"] });

export default function Submit() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("darkMode")) {
      setDarkMode(localStorage.getItem("darkMode") === "true");
    } else {
      setDarkMode(false);
    }
  }, []);

  return (
    <div className={`${inter.className} ${darkMode ? "dark" : ""}`}>
      <SEO
        title="Dir - A simple directory listing template"
        description="A simple directory listing template built with Next.js and Tailwind CSS."
        favicon="/favicon.ico"
        image="/og.png"
        url="https://copyui.com/"
        name="Copy UI"
      />

      <div className="flex dark:bg-black">
        <div className="main w-full  scrollbar-hide overflow-y-auto">
          <div className="grid grid-cols-12 ">
           
            <div className="col-span-12 md:col-span-6 h-[100vh]">
              <SubmitForm backButton/>
            </div>
            <div className="col-span-12 md:col-span-6 h-[100vh] overflow-auto">
              <SubmitReview />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
