import { AdminSidebarNav } from "@/features/client";
import { AdminSidebarHeader } from "@/features/server";

export const AdminSidebar = () => (
  <aside className="relative hidden w-15 md:flex md:flex-col items-center gap-3 shrink-0 animate-slide-right p-2 mt-25 z-30">
    <AdminSidebarHeader />
    <AdminSidebarNav />
  </aside>
);
