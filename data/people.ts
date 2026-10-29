import { cacheLife, cacheTag } from "next/cache";

import db from "@/lib/db";
import { Person } from "@/types/types";
import { DAY, DAYS, lastChangeOf, weekOf } from "@/utils";

export async function getPeopleDetails() {
  "use cache";
  cacheTag("people-cards");
  cacheLife("hours");

  const now = Date.now();

  const [
    personCount,
    directorCount,
    writerCount,
    producerCount,
    lastActorCount,
    recentActors,
    lastDirectorCount,
    recentDirector,
    lastWriterCount,
    recentWriter,
    lastProducerCount,
    recentProducer,
  ] = await Promise.allSettled([
    db.person.count({ where: { role: "Actor" } }),
    db.person.count({ where: { role: "Director" } }),
    db.person.count({ where: { role: "Writer" } }),
    db.person.count({ where: { role: "Producer" } }),
    db.person.aggregate({
      where: { role: "Actor" },
      _max: { updatedAt: true },
    }),
    db.person.findMany({
      where: { role: "Actor", createdAt: { gte: new Date(now - DAYS * DAY) } },
      select: { createdAt: true },
    }),
    db.person.aggregate({
      where: { role: "Director" },
      _max: { updatedAt: true },
    }),
    db.person.findMany({
      where: {
        role: "Director",
        createdAt: { gte: new Date(now - DAYS * DAY) },
      },
      select: { createdAt: true },
    }),
    db.person.aggregate({
      where: { role: "Writer" },
      _max: { updatedAt: true },
    }),
    db.person.findMany({
      where: {
        role: "Writer",
        createdAt: { gte: new Date(now - DAYS * DAY) },
      },
      select: { createdAt: true },
    }),
    db.person.aggregate({
      where: { role: "Producer" },
      _max: { updatedAt: true },
    }),
    db.person.findMany({
      where: {
        role: "Producer",
        createdAt: { gte: new Date(now - DAYS * DAY) },
      },
      select: { createdAt: true },
    }),
  ]);

  return [
    {
      label: "Actor",
      value: personCount,
      ...weekOf(recentActors, now),
      lastChange: lastChangeOf(lastActorCount),
    },
    {
      label: "Directors",
      value: directorCount,
      ...weekOf(recentDirector, now),
      lastChange: lastChangeOf(lastDirectorCount),
      className: "text-destructive",
    },
    {
      label: "Writers",
      value: writerCount,
      ...weekOf(recentWriter, now),
      lastChange: lastChangeOf(lastWriterCount),
    },
    {
      label: "Producers",
      value: producerCount,
      ...weekOf(recentProducer, now),
      lastChange: lastChangeOf(lastProducerCount),
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
