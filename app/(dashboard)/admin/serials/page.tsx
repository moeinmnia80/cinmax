import { Suspense } from "react";

import { Search } from "@/components/Search";
import { getSerialCards } from "@/data/serial";
import { EditFormSkeleton } from "@/features/server";
import { ThemeToggle } from "@/components/ThemeToggle";
import { NewButton } from "@/features/admin/NewButton";
import { AdminCard } from "@/features/admin/AdminCard";
import { EditSeries } from "@/features/admin/EditSeries";
import { SerialTable } from "@/features/admin/SerialTable";
import { AdminHeader } from "@/features/admin/AdminHeader";
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
        className="flex gap-1"
      >
        <Suspense fallback={<></>}>
          <Search />
        </Suspense>
        <ThemeToggle />
        <Suspense fallback={<></>}>
          <NewButton slug="unsaved-draft" />
        </Suspense>
      </AdminHeader>
      <div className="hidden sm:block absolute top-19 right-0 w-full h-full border-t border-l border-foreground/10 rounded-tl-2xl z-0" />
      <div className="relative z-10 flex-col flex gap-3 sm:gap-1 p-4 sm:p-3">
        <Suspense fallback={<AdminCardSkeleton />}>
          <AdminCard fetchCards={getSerialCards} />
        </Suspense>
        <div className="w-full bg-background/25 backdrop-blur-2xl rounded-2xl border border-foreground/10">
          <Suspense fallback={<SerialTableSkeleton />}>
            <SerialTable searchParams={searchParams} />
          </Suspense>
        </div>
        <Suspense fallback={<EditFormSkeleton />}>
          <EditSeries searchParams={searchParams} />
        </Suspense>
      </div>
    </>
  );
};

export default SerialsPage;
