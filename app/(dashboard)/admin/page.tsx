import { Suspense } from "react";

import { getCards } from "@/constants/adminCards";
import { AdminBox } from "@/features/admin/AdminBox";
import { AdminCard } from "@/features/admin/AdminCard";
import { AdminCardSkeleton } from "@/features/admin/AdminCardSkeleton";
import { AdminHeader } from "@/features/admin/AdminHeader";

export default async function AdminDashboardPage() {
  return (
    <div>
      <AdminHeader title="Dashboard" desc="Overview of the Cinemax catalog." />
      <Suspense fallback={<AdminCardSkeleton />}>
        <AdminCard fetchCards={getCards} />
      </Suspense>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 py-5 px-4">
        <AdminBox />
      </div>
    </div>
  );
}
