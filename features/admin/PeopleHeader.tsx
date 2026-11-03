import { use } from "react";

import { Person } from "@/types/types";
import { Search } from "@/components/Search";
import { AdminHeader } from "@/features/server";

import { NewButton } from "./NewButton";
import { ThemeToggle } from "@/components/ThemeToggle";

export function PeopleHeader({ data }: { data: Promise<Person[]> }) {
  const people = use(data);

  return (
    <AdminHeader
      title="Cast & Crew"
      desc={`PEOPLE / ${people.length.toLocaleString().toUpperCase()} RECORDS`}
      className="flex items-center gap-2"
    >
      <Search />
      <ThemeToggle />
      <NewButton slug="unsaved-draft" />
    </AdminHeader>
  );
}
