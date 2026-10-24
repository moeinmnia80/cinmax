import { Suspense } from "react";

import { getSerialCards } from "@/data/serial";
import { AdminCard } from "@/features/admin/AdminCard";
import { EditSeries } from "@/features/admin/EditSeries";
import { SerialTable } from "@/features/admin/SerialTable";
import { AdminHeader } from "@/features/admin/AdminHeader";
import { SerialSearch } from "@/components/Search";
import { AdminCardSkeleton } from "@/features/admin/AdminCardSkeleton";
import { SerialTableSkeleton } from "@/features/admin/SerialTableSkeleton";

interface SerialPageProps {
  searchParams: Promise<{ search?: string; edit?: string }>;
}

const SerialsPage = ({ searchParams }: SerialPageProps) => {
  return (
    <>
      <AdminHeader
        title="Serials"
        desc="Library / Series"
        className="flex gap-2"
      >
        <Suspense fallback={<></>}>
          <SerialSearch />
        </Suspense>
      </AdminHeader>
      <div className="flex gap-4 px-4 py-5">
        <div className="flex-5 flex flex-col gap-4">
          <Suspense fallback={<AdminCardSkeleton />}>
            <AdminCard fetchCards={getSerialCards} />
          </Suspense>
          <div className="w-full min-h-12 bg-foreground/5 rounded-md border border-foreground/10">
            <h2 className="p-3 border-b border-foreground/10">All serial</h2>
            <Suspense fallback={<SerialTableSkeleton />}>
              <SerialTable searchParams={searchParams} />
            </Suspense>
          </div>
        </div>
        <Suspense fallback={<></>}>
          <EditSeries searchParams={searchParams} />
        </Suspense>
      </div>
    </>
  );
};

export default SerialsPage;
