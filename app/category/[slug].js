import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { Inter } from "next/font/google";
import List from "@/components/List";
const inter = Inter({ subsets: ["latin"] });

export default function View() {
  const router = useRouter();
  const { slug } = router.query;

  const [darkMode, setDarkMode] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("darkMode")) {
      setDarkMode(localStorage.getItem("darkMode") === "true");
    } else {
      setDarkMode(false);
    }
  }, []);

  return (
    <div className={`${inter.className} ${darkMode ? "dark" : ""}`}>
      <div className="flex dark:bg-black">
        <Sidebar showSidebar={showSidebar} />

        {/* view details here */}
        <div className="main w-full max-h-[100vh] scrollbar-hide overflow-y-auto">
          <Header
            showSidebar={showSidebar}
            setShowSidebar={setShowSidebar}
            darkMode={darkMode}
            setDarkMode={setDarkMode}
          />

          {/* hero */}
          <div className=" max-w-[600px] text-center mx-auto mt-10">
            <h1 className="text-4xl font-bold  capitalize text-transparent bg-clip-text bg-gradient-to-r from-[#dcdcdc] dark:from-white dark:via-white to-black dark:to-dark-400">
              {slug}
            </h1>
          </div>

          {/* list */}
          <List />
        </div>
      </div>
    </div>
  );
}
