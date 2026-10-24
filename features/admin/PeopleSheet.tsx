import { connection } from "next/server";

import { PersonRow } from "./PersonRow";
import { getPersonWithQuery } from "@/data/people";

interface PeopleSheetProps {
  searchParams: Promise<{ search?: string }>;
}

export async function PeopleSheet({ searchParams }: PeopleSheetProps) {
  await connection();
  const { search } = await searchParams;
  const query = search?.trim() ?? "";
  const people = await getPersonWithQuery(query);

  return (
    <section className="overflow-hidden rounded-xl border border-foreground/10 bg-foreground/3 animate-slide-up">
      <header className="flex items-center justify-between border-b border-foreground/10 px-6 py-5">
        <h2 className="font-condensed text-2xl font-bold tracking-widest uppercase">
          People
        </h2>
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-foreground/50">
          {people.length.toLocaleString()} records · by role
        </p>
      </header>

      <ul className="-mb-px grid grid-cols-2">
        {people.map((person) => (
          <PersonRow key={person.id} person={person} />
        ))}
      </ul>
    </section>
  );
}
