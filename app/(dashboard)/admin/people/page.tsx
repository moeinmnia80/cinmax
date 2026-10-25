import { Suspense } from "react";

import { getPeople, getPeopleDetails } from "@/data/people";
import {
  AdminCardSkeleton,
  PeopleSheetSkeleton,
  PeopleHeaderSkeleton,
} from "@/features/server";
import {
  AdminCard,
  EditPeople,
  PeopleSheet,
  PeopleHeader,
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
      <div className="flex gap-4 py-5 px-4">
        <div className="flex-5 flex flex-col gap-4">
          <Suspense fallback={<AdminCardSkeleton />}>
            <AdminCard fetchCards={getPeopleDetails} />
          </Suspense>
          <Suspense fallback={<PeopleSheetSkeleton />}>
            <PeopleSheet searchParams={searchParams} />
          </Suspense>
        </div>
        <div className="flex-2">
          <Suspense fallback={<></>}>
            <EditPeople searchParams={searchParams} />
          </Suspense>
        </div>
      </div>
    </>
  );
}
