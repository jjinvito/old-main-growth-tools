import Header from "@/components/Header";
import DashboardSidebar from "@/components/dashboard/dashboard-sidebar.jsx";
import { cn } from "@/lib/utils";

export default function DashboardLayout({ children }) {
  return (
    <main className={cn("flex h-screen scrollbar-hide")}>
      <DashboardSidebar />
      <div className="main w-full scrollbar-hide">
        {children}
      </div>
    </main>
  );
}
