import { Suspense } from "react";

import { Search } from "@/components/Search";
import { getSerialCards } from "@/data/serial";
import { AdminCard } from "@/features/admin/AdminCard";
import { EditSeries } from "@/features/admin/EditSeries";
import { SerialTable } from "@/features/admin/SerialTable";
import { AdminHeader } from "@/features/admin/AdminHeader";
import { AdminCardSkeleton } from "@/features/admin/AdminCardSkeleton";
import { SerialTableSkeleton } from "@/features/admin/SerialTableSkeleton";
import { EditFormSkeleton } from "@/features/server";
import { ThemeToggle } from "@/components/ThemeToggle";

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
          <Search />
        </Suspense>
        <ThemeToggle />
      </AdminHeader>
      <div className="hidden sm:block absolute top-19 right-0 w-full h-full border-t border-l border-foreground/10 rounded-tl-2xl z-0" />
      <div className="relative z-10 flex gap-1 p-4 sm:p-3">
        <div className="flex-5 flex flex-col gap-4 sm:gap-1">
          <Suspense fallback={<AdminCardSkeleton />}>
            <AdminCard fetchCards={getSerialCards} />
          </Suspense>
          <div className="w-full bg-background/25 backdrop-blur-2xl rounded-2xl border border-foreground/10">
            <Suspense fallback={<SerialTableSkeleton />}>
              <SerialTable searchParams={searchParams} />
            </Suspense>
          </div>
        </div>
        <Suspense fallback={<EditFormSkeleton />}>
          <EditSeries searchParams={searchParams} />
        </Suspense>
      </div>
    </>
  );
};

export default SerialsPage;
