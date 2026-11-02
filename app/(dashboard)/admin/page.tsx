import { Suspense } from "react";

import { getCards } from "@/data/adminCards";
import { AdminHeader } from "@/features/server";
import { AdminBox } from "@/features/admin/AdminBox";
import { AdminCard } from "@/features/admin/AdminCard";
import { ThemeToggle } from "@/components/ThemeToggle";
import { AdminCardSkeleton } from "@/features/admin/AdminCardSkeleton";

export default async function AdminDashboardPage() {
  return (
    <div>
      <AdminHeader title="Dashboard" desc="Detail" className="flex gap-2">
        <ThemeToggle />
      </AdminHeader>
      <div className="hidden sm:block absolute top-19 right-0 w-full h-full border-t border-l border-foreground/10 rounded-tl-2xl -z-10" />
      <div className="flex flex-col gap-1 p-4 sm:p-3">
        <Suspense fallback={<AdminCardSkeleton />}>
          <AdminCard fetchCards={getCards} />
        </Suspense>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 auto-rows-auto gap-1">
          <AdminBox />
        </div>
      </div>
    </div>
  );
}
