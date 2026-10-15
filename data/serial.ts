import { cacheLife, cacheTag } from "next/cache";

import db from "@/lib/db";

export const getSerial = async (slug: string) => {
  "use cache";
  cacheTag("serial-data");
  cacheLife("minutes");

  if (!slug) return null;

  return db.serial.findFirst({
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
          person: { select: { name: true, image: true } },
          role: true,
        },
      },
      cast: {
        select: {
          person: { select: { name: true, image: true } },
          role: true,
        },
      },
      language: { select: { name: true } },
    },
  });
};
