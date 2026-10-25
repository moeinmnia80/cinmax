import { use } from "react";

import { Person } from "@/types/types";
import { Search } from "@/components/Search";
import { AdminHeader } from "@/features/server";

export function PeopleHeader({ data }: { data: Promise<Person[]> }) {
  const people = use(data);

  return (
    <AdminHeader
      title="Cast & Crew"
      desc={`PEOPLE / ${people.length.toLocaleString().toUpperCase()} RECORDS`}
    >
      <Search />
    </AdminHeader>
  );
}
