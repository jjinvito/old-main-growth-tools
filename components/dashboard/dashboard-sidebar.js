"use client";
import Link from "next/link";
import Image from "next/image";
import { BiHome, BiWrench } from "react-icons/bi";
import { BiNotepad } from "react-icons/bi";
import { BiRecycle } from "react-icons/bi";
import { cn } from "@/lib/util";
import { usePathname } from "next/navigation";

export default function DashboardSidebar() {
  const currentPath = usePathname();

  return (
    <div className="flex h-screen">
      <div className="hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4">
            <Link className="flex items-center gap-2 font-semibold" href="/">
              <Image width="105" height="29" src="/logo.png" />
            </Link>
          </div>
          <div className="flex-1 overflow-auto py-2 w-48">
            <nav className="grid items-start px-4 text-sm font-medium">
              <Link
                className={cn(
                  "flex items-center gap-3 rounded-lg  px-3 py-2 text-gray-900  transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50",
                  currentPath == "/dashboard" ? "bg-gray-100" : ""
                )}
                href="/dashboard"
              >
                {/* <HomeIcon  /> */}
                <BiHome className="h-4 w-4" />
                Home
              </Link>
              <Link
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50",
                  currentPath == "/dashboard/billing-info" ? "bg-gray-100" : ""
                )}
                href="/dashboard/billing-info"
              >
                <BiNotepad className="h-4 w-4" />
                Billing Info
              </Link>
              <Link
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50",
                  currentPath == "/dashboard/update-tool-info" ? "bg-gray-100" : ""
                )}
                href="/dashboard/update-tool-info"
              >
                <BiRecycle />
                Update Info
              </Link>
              <Link
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50",
                  currentPath == "/dashboard/add-new-tool" ? "bg-gray-100" : ""
                )}
                href="/dashboard/add-new-tool"
              >
                <BiWrench />
                Add New Tool
              </Link>
              <Link
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                href="#"
              >
                {/* <LogOutIcon className="h-4 w-4" /> */}
                Logout
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
