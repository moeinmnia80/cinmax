import { cacheLife, cacheTag } from "next/cache";

import db from "@/lib/db";
import { SerialDetail } from "@/types/types";

export interface SerialType extends Omit<
  SerialDetail,
  "rating" | "purchasePrice"
> {
  rating: number;
  purchasePrice: string | null;
}

export const getSerial = async (slug?: string): Promise<SerialType | null> => {
  "use cache";
  cacheTag("serial-data");
  cacheLife("minutes");

  if (!slug) return null;

  const serial = await db.serial.findFirst({
    where: { slug },
    include: {
      studio: { select: { name: true } },
      country: { select: { name: true } },
      genres: {
        select: {
          genre: true,
        },
      },
      crew: {
        select: {
          person: true,
          role: true,
        },
      },
      cast: {
        select: {
          person: true,
          role: true,
        },
      },
      relatedMovies: { select: { serial: true, movie: true } },
      language: { select: { name: true } },
    },
  });

  if (!serial) return null;

  return {
    ...serial,
    rating: serial.rating.toNumber(),
    purchasePrice: serial.purchasePrice?.toString() ?? null,
  };
};

export async function getSerialWithQuery(query: string) {
  return db.serial.findMany({
    where: query
      ? { title: { contains: query, mode: "insensitive" } }
      : undefined,
    orderBy: { updatedAt: "desc" },
    include: {
      genres: {
        include: {
          genre: true,
        },
      },
      country: true,
      studio: true,
      language: true,
    },
  });
}

export const DAY = 24 * 60 * 60 * 1000;
export const DAYS = 7;

type Created = PromiseSettledResult<{ createdAt: Date }[]>;
type LastChange = PromiseSettledResult<{ _max: { updatedAt: Date | null } }>;

export const lastChangeOf = (result: LastChange) =>
  result.status === "fulfilled" ? result.value._max.updatedAt : undefined;

export const weekOf = (result: Created, now: number) => {
  if (result.status !== "fulfilled") return {};

  const trend = Array<number>(DAYS).fill(0);
  for (const { createdAt } of result.value) {
    const age = Math.floor((now - createdAt.getTime()) / DAY);
    trend[DAYS - 1 - Math.min(Math.max(age, 0), DAYS - 1)]++;
  }
  return { addedThisWeek: result.value.length, trend };
};

export const recentArgs = (now: number) =>
  ({
    where: { createdAt: { gte: new Date(now - DAYS * DAY) } },
    select: { createdAt: true },
  }) as const;

export async function getSerialCards() {
  "use cache";
  cacheTag("serial-cards");
  cacheLife("hours");

  const now = Date.now();

  const [
    serialCount,
    onGoingCount,
    episodeCount,
    ongoingChange,
    recentSerials,
    recentEpisodes,
  ] = await Promise.allSettled([
    db.serial.count(),
    db.serial.count({ where: { status: "Ongoing" } }),
    db.serial.aggregate({
      _sum: { episodes: true },
      _max: { updatedAt: true },
    }),
    db.serial.aggregate({
      where: { status: "Ongoing" },
      _max: { updatedAt: true },
    }),
    db.serial.findMany(recentArgs(now)),
    db.serial.aggregate({
      where: { createdAt: { gte: new Date(now - DAYS * DAY) } },
      _sum: { episodes: true },
    }),
  ]);

  return [
    {
      label: "Total",
      value: serialCount,
      ...weekOf(recentSerials, now),
      lastChange: lastChangeOf(episodeCount),
    },
    {
      label: "Ongoing",
      value: onGoingCount,
      className: "text-destructive",
      lastChange: lastChangeOf(ongoingChange),
    },
    {
      label: "Episodes",
      value:
        episodeCount.status === "fulfilled"
          ? {
              status: "fulfilled" as const,
              value: episodeCount.value._sum.episodes ?? 0,
            }
          : episodeCount,
      lastChange: lastChangeOf(episodeCount),
      addedThisWeek:
        recentEpisodes.status === "fulfilled"
          ? (recentEpisodes.value._sum.episodes ?? 0)
          : undefined,
    },
  ];
}
