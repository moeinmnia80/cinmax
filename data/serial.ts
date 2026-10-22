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

export async function getSerialCards() {
  "use cache";
  cacheTag("serial-cards");
  cacheLife("hours");

  const [serialCount, onGoingCount, episodeCount] = await Promise.allSettled([
    db.serial.count(),
    db.serial.count({ where: { status: "Ongoing" } }),
    db.serial.aggregate({
      _sum: {
        episodes: true,
      },
    }),
  ]);

  return [
    {
      label: "Total",
      value: serialCount,
    },
    {
      label: "Ongoing",
      value: onGoingCount,
      className: "text-destructive",
    },
    {
      label: "episodes",
      value:
        episodeCount.status === "fulfilled"
          ? {
              status: "fulfilled" as const,
              value: episodeCount.value._sum.episodes ?? 0,
            }
          : episodeCount,
    },
  ];
}
