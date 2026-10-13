import { Suspense } from "react";

import { AdminBox } from "@/features/admin/AdminBox";
import { AdminCard } from "@/features/admin/AdminCard";
import { AdminCardSkeleton } from "@/features/admin/AdminCardSkeleton";
import { AdminDashboardHeader } from "@/features/admin/AdminDashboardHeader";

export default async function AdminDashboardPage() {
  return (
    <div className="overflow-scroll">
      <AdminDashboardHeader />
      <Suspense fallback={<AdminCardSkeleton />}>
        <AdminCard />
      </Suspense>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 py-5 px-4">
        <AdminBox />
      </div>
    </div>
  );
}
