import { AdminSidebarNav } from "@/features/client";
import { AdminSidebarHeader } from "@/features/server";

export const AdminSidebar = () => (
  <aside className="hidden md:flex md:flex-col w-64 shrink-0 sticky top-0 h-dvh border-r border-foreground/10 animate-slide-right">
    <AdminSidebarHeader />
    <AdminSidebarNav />
  </aside>
);
