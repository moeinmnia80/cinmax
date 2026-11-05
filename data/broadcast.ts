import { cacheLife, cacheTag } from "next/cache";

import { db } from "@/lib/db";
import { serializeMovie, serializeSerial } from "./dashboard";

const include = {
  movie: true,
  serial: true,
} as const;

export const getBroadcasts = async () => {
  "use cache";
  cacheTag("broadcasts");
  cacheLife("minutes");
  const broadcasts = await db.broadcast.findMany({
    include,
    orderBy: { time: "asc" },
  });

  return broadcasts.map((item) => {
    if (item.type === "Movie") {
      return {
        ...item,
        movie: item.movie ? serializeMovie(item.movie) : null,
      };
    }
    if (item.type === "Serial") {
      return {
        ...item,
        serial: item.serial ? serializeSerial(item.serial) : null,
      };
    }
  });
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
      orderBy: { title: "asc" },
    }),
    db.serial.findMany({
      orderBy: { title: "asc" },
    }),
  ]);
  return {
    movies: movies.map((movie) => ({
      ...serializeMovie(movie),
    })),
    serials: serials.map((serial) => ({
      ...serializeSerial(serial),
    })),
  };
};

export const getBroadcastByContentSlug = async (slug: string) => {
  "use cache";
  cacheTag("broadcasts");
  cacheLife("minutes");
  return db.broadcast.findFirst({
    where: { OR: [{ movie: { slug } }, { serial: { slug } }] },
    include,
  });
};

export type BroadcastData = NonNullable<
  Awaited<ReturnType<typeof getBroadcast>>
>;
export type BroadcastsData = NonNullable<
  Awaited<ReturnType<typeof getBroadcasts>>
>;
