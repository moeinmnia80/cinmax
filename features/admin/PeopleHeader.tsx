import React, { use } from "react";

import { AdminHeader } from "./AdminHeader";
import { Person } from "@/types/types";
import { SerialSearch } from "../../components/Search";

export function PeopleHeader({ data }: { data: Promise<Person[]> }) {
  const people = use(data);

  return (
    <AdminHeader
      title="Cast & Crew"
      desc={`PEOPLE / ${people.length.toLocaleString().toUpperCase()} RECORDS`}
    >
      <SerialSearch />
    </AdminHeader>
  );
}
