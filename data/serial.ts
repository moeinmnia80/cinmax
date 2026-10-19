import { cacheLife, cacheTag } from "next/cache";

import db from "@/lib/db";

export const getSerial = async (slug?: string) => {
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
          genre: { select: { name: true, slug: true } },
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
