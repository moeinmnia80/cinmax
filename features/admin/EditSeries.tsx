import { Suspense } from "react";

import { getSerial } from "@/data/serial";
import { EditForm } from "@/features/client";
import { EditFormSkeleton, EditFormLoader } from "@/features/server";

interface EditSeriesProps {
  searchParams: Promise<{ edit?: string }>;
}

export const EditSeries = ({ searchParams }: EditSeriesProps) => {
  return (
    <div className="flex-2 animate-slide-left">
      <div className="rounded-md border border-foreground/10 bg-foreground/5 p-4">
        <h2>Edit Series</h2>
        <Suspense fallback={<EditFormSkeleton />}>
          <EditFormLoader
            searchParams={searchParams}
            fetcher={getSerial}
            dataProp="serial"
            Form={EditForm}
          />
        </Suspense>
      </div>
    </div>
  );
};
