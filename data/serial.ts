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
