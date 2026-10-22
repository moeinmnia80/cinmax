import { Suspense } from "react";

import { EditFormSkeleton, EditFormLoading } from "@/features/server";

interface EditSeriesProps {
  searchParams: Promise<{ edit?: string }>;
}

export const EditSeries = ({ searchParams }: EditSeriesProps) => {
  return (
    <div className="flex-2 animate-slide-left py-5 pr-4">
      <div className="rounded-md border border-foreground/10 bg-foreground/5 p-4">
        <h2>Edit Series</h2>
        <p className="text-sm uppercase text-foreground/30">unsaved draft</p>
        <Suspense fallback={<EditFormSkeleton />}>
          <EditFormLoading searchParams={searchParams} />
        </Suspense>
      </div>
    </div>
  );
};
