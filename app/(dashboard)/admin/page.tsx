import { Suspense } from "react";

import { getCards } from "@/data/adminCards";
import { AdminBox } from "@/features/admin/AdminBox";
import { AdminCard } from "@/features/admin/AdminCard";
import { AdminCardSkeleton } from "@/features/admin/AdminCardSkeleton";

export default async function AdminDashboardPage() {
  return (
    <div>
      <div className="flex flex-col gap-4 py-5 px-4">
        <Suspense fallback={<AdminCardSkeleton />}>
          <AdminCard fetchCards={getCards} />
        </Suspense>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 auto-rows-auto gap-4">
          <AdminBox />
        </div>
      </div>
    </div>
  );
}
