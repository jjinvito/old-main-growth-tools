import DashboardSidebar from "@/components/dashboard/dashboard-sidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex">
      <DashboardSidebar />
      {children}
    </div>
  );
}
