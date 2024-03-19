import Header from "@/components/Header";
import DashboardSidebar from "@/components/dashboard/dashboard-sidebar.jsx";
import Footer from "@/components/footer";
import { cn } from "@/lib/utils";

export default function DashboardLayout({ children }) {
  return (
    <main className={cn("flex h-screen scrollbar-hide")}>
      <DashboardSidebar />
      {/* scrollbar-hide min-h-[100vh] scrollbar-hide overflow-y-auto flex flex-col justify-between */}
      <div className="main w-full ">
       <div>
       {children}
       </div>
        
        {/* <Footer/> */}
     
      </div>

     

    </main>
  );
}
