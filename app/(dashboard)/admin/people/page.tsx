import { Suspense } from "react";

import { AdminCard } from "@/features/admin/AdminCard";
import { EditPeople } from "@/features/admin/EditPeople";
import { PeopleSheet } from "@/features/admin/PeopleSheet";
import { getPeople, getPeopleDetails } from "@/data/people";
import { PeopleHeader } from "@/features/admin/PeopleHeader";

interface PeoplePageProps {
  searchParams: Promise<{ search?: string }>;
}

export default function PeoplePage({ searchParams }: PeoplePageProps) {
  const people = getPeople("");
  return (
    <>
      <Suspense fallback={<></>}>
        <PeopleHeader data={people} />
      </Suspense>
      <div className="flex gap-4 py-5 px-4">
        <div className="flex-5 flex flex-col gap-4">
          <Suspense fallback={<></>}>
            <AdminCard fetchCards={getPeopleDetails} />
          </Suspense>
          <Suspense fallback={<></>}>
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
