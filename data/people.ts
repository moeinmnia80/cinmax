import { cacheLife, cacheTag } from "next/cache";

import db from "@/lib/db";
import { Person } from "@/types/types";

export async function getPeopleDetails() {
  "use cache";
  cacheTag("people-cards");
  cacheLife("hours");

  const [personCount, directorCount, writerCount, producerCount] =
    await Promise.allSettled([
      db.person.count({ where: { role: "Actor" } }),
      db.person.count({ where: { role: "Director" } }),
      db.person.count({ where: { role: "Writer" } }),
      db.person.count({ where: { role: "Producer" } }),
    ]);

  return [
    {
      label: "Actor",
      value: personCount,
    },
    {
      label: "Directors",
      value: directorCount,
      className: "text-destructive",
    },
    {
      label: "Writers",
      value: writerCount,
    },
    {
      label: "Producers",
      value: producerCount,
    },
  ];
}

export async function getPeople(query: string = "") {
  "use cache";
  cacheTag("people-data");
  cacheLife("minutes");

  return db.person.findMany({
    where: query
      ? { name: { contains: query, mode: "insensitive" } }
      : undefined,
    orderBy: { updatedAt: "desc" },
  });
}
// export interface PersonType extends Person {
//   rating: number;
//   purchasePrice: string | null;
// }

export const getPerson = async (slug?: string): Promise<Person | null> => {
  "use cache";
  cacheTag("person-data");
  cacheLife("minutes");

  if (!slug) return null;

  const person = await db.person.findFirst({
    where: { slug },
  });

  if (!person) return null;

  return {
    ...person,
  };
};

export async function getPersonWithQuery(query: string) {
  return db.person.findMany({
    where: query
      ? { slug: { contains: query, mode: "insensitive" } }
      : undefined,
  });
}
