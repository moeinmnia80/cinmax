import { AdminSidebar } from "@/features/admin/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex-5">
        <main className="">{children}</main>
      </div>
    </div>
  );
}
