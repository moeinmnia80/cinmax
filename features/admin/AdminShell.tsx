import { AdminMobileNav } from "@/features/client";
import { AdminSidebar, AdminSidebarHeader } from "@/features/server";

export const AdminShell = ({ children }: { children: React.ReactNode }) => (
  <div className="flex min-h-dvh">
    <AdminSidebar />
    <AdminMobileNav sidebarHeader={<AdminSidebarHeader />}>
      {children}
    </AdminMobileNav>
  </div>
);
