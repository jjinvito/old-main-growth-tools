"use client";

import DashboardSidebar from "@/components/dashboard/dashboard-sidebar.jsx";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export default function DashboardLayout({ children }) {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("darkMode")) {
      setDarkMode(localStorage.getItem("darkMode") === "true");
    } else {
      setDarkMode(false);
    }
  }, []);

  return (
    <main className={cn("flex h-screen", darkMode ? "dark" : "")}>
      <DashboardSidebar darkMode={darkMode} setDarkMode={setDarkMode} />
      {children}
    </main>
  );
}
