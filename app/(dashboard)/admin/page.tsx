import { Suspense } from "react";

import { AdminCard } from "@/features/admin/AdminCard";
import { AdminCardSkeleton } from "@/features/admin/AdminCardSkeleton";

export default async function AdminDashboardPage() {
  return (
    <div>
      <div className="border-b border-foreground/10 py-5 px-4">
        <h1 className="text-2xl font-black text-white uppercase tracking-wide">
          Dashboard
        </h1>
        <p className="text-foreground/40 text-sm font-light tracking-widest">
          Overview of the Cinemax catalog.
        </p>
      </div>

      <Suspense fallback={<AdminCardSkeleton />}>
        <AdminCard />
      </Suspense>
    </div>
  );
}
