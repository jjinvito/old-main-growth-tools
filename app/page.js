"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Hero from "@/components/Hero";
import List from "@/components/List";
import SEO from "@/components/SEO";
import SignIn from "@/components/SignIn";
import SignUp from "@/components/SignUp";
import Link from "next/link";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
// import CheckAuthStatus from "../lib/checkAuthStatus";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // setIsAuthenticated(CheckAuthStatus());
    if (localStorage.getItem("darkMode")) {
      setDarkMode(localStorage.getItem("darkMode") === "true");
    } else {
      setDarkMode(false);
    }
  }, []);

  return (
    <main className={`${inter.className} ${darkMode ? "dark" : ""}`}>
      <SEO
        title="Dir - A simple directory listing template"
        description="A simple directory listing template built with Next.js and Tailwind CSS."
        favicon="/favicon.ico"
        image="/og.png"
        url="https://copyui.com/"
        name="Copy UI"
      />

      <div className="flex dark:bg-black">
        {/* Sidebar */}
        <Sidebar showSidebar={showSidebar} />

        <div className="main w-full max-h-[100vh] scrollbar-hide overflow-y-auto">
          {/* Header */}
          <Header
            showSidebar={showSidebar}
            setShowSidebar={setShowSidebar}
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            isAuthenticated={isAuthenticated}
          />

          {/* Hero */}
          <Hero />

          {/* List */}
          <List />
        </div>
      </div>
    </main>
  );
}
