import { cacheLife, cacheTag } from "next/cache";

import { db } from "@/lib/db";

const include = {
  movie: { select: { id: true, title: true, image: true } },
  serial: { select: { id: true, title: true, image: true } },
} as const;

export const getBroadcasts = async () => {
  "use cache";
  cacheTag("broadcasts");
  cacheLife("minutes");
  return db.broadcast.findMany({ include, orderBy: { time: "asc" } });
};

export const getBroadcast = async (id: number) => {
  "use cache";
  cacheTag("broadcasts");
  cacheLife("minutes");
  return db.broadcast.findUnique({ where: { id }, include });
};

export const getBroadcastOptions = async () => {
  "use cache";
  cacheTag("serial-data", "movie-data");
  cacheLife("minutes");
  const [movies, serials] = await Promise.all([
    db.movie.findMany({
      select: { id: true, title: true },
      orderBy: { title: "asc" },
    }),
    db.serial.findMany({
      select: { id: true, title: true },
      orderBy: { title: "asc" },
    }),
  ]);
  return { movies, serials };
};

export type BroadcastData = NonNullable<
  Awaited<ReturnType<typeof getBroadcast>>
>;
