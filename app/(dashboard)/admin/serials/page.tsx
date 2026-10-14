import { Suspense } from "react";

import { AdminCard } from "@/features/admin/AdminCard";
import { getSerialCards } from "@/constants/serialCards";
import { SerialTable } from "@/features/admin/SerialTable";
import { AdminHeader } from "@/features/admin/AdminHeader";
import { SerialSearch } from "@/features/admin/SerialSearch";
import { AdminCardSkeleton } from "@/features/admin/AdminCardSkeleton";
import { SerialAddButton } from "@/features/admin/SerialAddButton";

interface SerialPageProps {
  searchParams: Promise<{ search?: string }>;
}

const SerialsPage = async ({ searchParams }: SerialPageProps) => {
  return (
    <div>
      <AdminHeader
        title="Serials"
        desc="Library / Series"
        className="flex gap-2"
      >
        <Suspense fallback={<></>}>
          <SerialSearch />
          <SerialAddButton />
        </Suspense>
      </AdminHeader>
      <Suspense fallback={<AdminCardSkeleton />}>
        <AdminCard fetchCards={getSerialCards} />
      </Suspense>
      <div className="px-4 pb-5">
        <div className="w-full min-h-12 bg-foreground/5 rounded-md border border-foreground/10">
          <h2 className="p-3 border-b border-foreground/10">All serial</h2>
          <Suspense>
            <SerialTable searchParams={searchParams} />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default SerialsPage;
