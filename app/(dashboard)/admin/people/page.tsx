import { Suspense } from "react";

import { getPeople, getPeopleDetails } from "@/data/people";
import {
  AdminCard,
  EditPeople,
  PeopleSheet,
  PeopleHeader,
  AdminCardSkeleton,
  PeopleSheetSkeleton,
  PeopleHeaderSkeleton,
} from "@/features/server";

interface PeoplePageProps {
  searchParams: Promise<{ search?: string }>;
}

export default function PeoplePage({ searchParams }: PeoplePageProps) {
  const people = getPeople("");
  return (
    <>
      <Suspense fallback={<PeopleHeaderSkeleton />}>
        <PeopleHeader data={people} />
      </Suspense>
      <div className="hidden sm:block absolute top-19 right-0 w-full h-full border-t border-l border-foreground/10 rounded-tl-2xl -z-10" />
      <div className="flex gap-1 p-4 sm:p-3">
        <div className="flex-5 flex flex-col gap-1">
          <Suspense fallback={<AdminCardSkeleton />}>
            <AdminCard fetchCards={getPeopleDetails} />
          </Suspense>
          <Suspense fallback={<PeopleSheetSkeleton />}>
            <PeopleSheet searchParams={searchParams} />
          </Suspense>
        </div>
        <Suspense fallback={<></>}>
          <EditPeople searchParams={searchParams} />
        </Suspense>
      </div>
    </>
  );
}
