import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/Sidebar";
import { AdminSidebar } from "./_components/AdminSidebar";

// NOTE: there is no auth check here yet. HeroNavActions.tsx currently
// hardcodes `isAuthenticated: false`, so this project doesn't have a
// working auth system to gate this route with. Before shipping,
// wrap this layout (or use middleware.ts) to require an authenticated
// admin user — right now /admin is open to anyone who finds the URL.

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AdminSidebar />
      <SidebarInset>
        <header className="flex items-center gap-3 border-b border-white/8 px-6 py-4">
          <SidebarTrigger />
          <span className="text-white/40 text-sm">Admin panel</span>
        </header>
        <main className="flex-1 p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
