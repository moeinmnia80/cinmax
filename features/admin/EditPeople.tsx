import { Suspense } from "react";

import { getPerson } from "@/data/people";
import { EditPersonForm } from "./EditPersonForm";
import { EditFormLoader } from "@/features/server";

interface EditPeopleProps {
  searchParams: Promise<{ search?: string; edit?: string }>;
}

export const EditPeople = ({ searchParams }: EditPeopleProps) => {
  return (
    <div className="flex-2 animate-slide-left">
      <div className="rounded-md border border-foreground/10 bg-foreground/5 p-4">
        <h2>Edit People</h2>
        <Suspense fallback={<></>}>
          <EditFormLoader
            searchParams={searchParams}
            fetcher={getPerson}
            dataProp="person"
            Form={EditPersonForm}
          />
        </Suspense>
      </div>
    </div>
  );
};
