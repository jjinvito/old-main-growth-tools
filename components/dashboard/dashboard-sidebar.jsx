"use client";
import Link from "next/link";
import Image from "next/image";
import { BiHome, BiWrench } from "react-icons/bi";
import { BiNotepad } from "react-icons/bi";
import { BiRecycle } from "react-icons/bi";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { MdOutlinePublishedWithChanges } from "react-icons/md";

export default function DashboardSidebar() {
  const currentPath = usePathname();

  return (
    <div className="flex dark:bg-black xl:mt-0 mt-[70px] h-screen">
      <div className="hidden border-r  lg:block dark:bg-black">
        <div className="flex h-full max-h-screen flex-col gap-2">
          {/* <div className="flex h-14 items-center border-b px-4">
            <Link className="flex items-center gap-2 font-semibold" href="/">
              <Image
                width="105"
                height="29"
                // src={darkMode ? "/logo-dark.png" : "/logo.png"}
                src="/logo.png"
              />
            </Link>
          </div> */}
          <div className="flex-1 overflow-auto py-2 w-48">
            <nav className="grid items-start px-4 text-sm font-medium">
              <Link
                className={cn(
                  "flex items-center gap-3 rounded-lg  px-3 py-2 text-gray-900  transition-all hover:text-gray-900 dark:text-gray-50 dark:hover:text-gray-50",
                  currentPath == "/dashboard"
                    ? "bg-gray-100 dark:bg-dark-600"
                    : ""
                )}
                href="/dashboard"
              >
                {/* <HomeIcon  /> */}
                <BiHome className="h-4 w-4" />
                Home
              </Link>
              <Link
                className={cn(
                  "flex items-center gap-3 rounded-lg  px-3 py-2 text-gray-900  transition-all hover:text-gray-900 dark:text-gray-50 dark:hover:text-gray-50",
                  currentPath == "/dashboard/billing-info"
                    ? "bg-gray-100 dark:bg-dark-600"
                    : ""
                )}
                href="/dashboard/billing-info"
              >
                <BiNotepad className="h-4 w-4" />
                Billing Info
              </Link>
              <Link
                className={cn(
                  "flex items-center gap-3 rounded-lg  px-3 py-2 text-gray-900  transition-all hover:text-gray-900 dark:text-gray-50 dark:hover:text-gray-50",
                  currentPath == "/dashboard/add-new-tool"
                    ? "bg-gray-100 dark:bg-dark-600"
                    : ""
                )}
                href="/dashboard/published-tools"
              >
                <MdOutlinePublishedWithChanges />
                Published Tools
              </Link>
              <Link
                className={cn(
                  "flex items-center gap-3 rounded-lg  px-3 py-2 text-gray-900  transition-all hover:text-gray-900 dark:text-gray-50 dark:hover:text-gray-50",
                  currentPath == "/dashboard/buy-subscription"
                    ? "bg-gray-100 dark:bg-dark-600"
                    : ""
                )}
                href="/dashboard/buy-subscription"
              >
                <BiWrench />
                Buy Subscription
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
