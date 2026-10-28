import { cacheLife, cacheTag } from "next/cache";

import db from "@/lib/db";
import { Prisma } from "@prisma/client";
import { Movie, Serial } from "@/types/types";

// Movies
export async function getLastMovies() {
  "use cache";
  cacheTag("dashboard-movie-boxes");
  cacheLife("hours");

  const movies = await db.movie.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
    skip: 0,
  });

  return movies.map((m) => ({
    ...m,
    rating: m.rating.toNumber(),
    budget: m.budget === null ? null : Number(m.budget),
  }));
}
export type DashboardMovie = Awaited<ReturnType<typeof getLastMovies>>[number];

// Series
export async function getLastSerials() {
  "use cache";
  cacheTag("dashboard-serial-boxes");
  cacheLife("hours");

  const serials = await db.serial.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
    skip: 0,
  });

  return serials.map((s) => ({ ...s, rating: s.rating.toNumber() }));
}
export type DashboardSerial = Awaited<
  ReturnType<typeof getLastSerials>
>[number];

// Featured
const mediaInclude = {
  genres: { include: { genre: true } },
  cast: { include: { person: true } },
  crew: { include: { person: true } },
  language: true,
} satisfies Prisma.MovieInclude & Prisma.SerialInclude;

const featuredInclude = {
  movie: { include: mediaInclude },
  serial: { include: mediaInclude },
} satisfies Prisma.FeaturedItemInclude;

type FeaturedRow = Prisma.FeaturedItemGetPayload<{
  include: typeof featuredInclude;
}>;
type MovieRow = NonNullable<FeaturedRow["movie"]>;
type SerialRow = NonNullable<FeaturedRow["serial"]>;

export type SerializedMovie<T extends Movie = Movie> = Omit<
  T,
  "rating" | "purchasePrice" | "budget" | "boxOffice"
> & {
  rating: string;
  purchasePrice: number | null;
  budget: number | null;
  boxOffice: number | null;
};

export type SerializedSerial<T extends Serial = Serial> = Omit<
  T,
  "rating" | "purchasePrice"
> & {
  rating: string;
  purchasePrice: number | null;
};

export type FeaturedMedia =
  | { type: "Movie"; movie: SerializedMovie }
  | { type: "Serial"; serial: SerializedSerial };

export type DashboardFeatured = {
  id: number;
  order: number;
  active: boolean;
} & (
  | { type: "Movie"; movie: SerializedMovie<MovieRow> }
  | { type: "Serial"; serial: SerializedSerial<SerialRow> }
);

export const serializeMovie = <T extends Movie>(m: T) =>
  ({
    ...m,
    rating: Number(m.rating).toFixed(1),
    purchasePrice: Number(m.purchasePrice),
    budget: Number(m.budget),
    boxOffice: Number(m.boxOffice),
  }) as SerializedMovie<T>;

export const serializeSerial = <T extends Serial>(s: T) =>
  ({
    ...s,
    rating: Number(s.rating).toFixed(1),
    purchasePrice: Number(s.purchasePrice),
  }) as SerializedSerial<T>;

export async function getFeaturedItems(): Promise<DashboardFeatured[]> {
  "use cache";
  cacheTag("dashboard-boxes", "dashboard-featured");
  cacheLife("hours");

  const rows = await db.featuredItem.findMany({
    orderBy: { order: "asc" },
    include: featuredInclude,
  });

  return rows.flatMap((row): DashboardFeatured[] => {
    const base = { id: row.id, order: row.order, active: row.active };

    if (row.type === "Movie" && row.movie)
      return [{ ...base, type: "Movie", movie: serializeMovie(row.movie) }];

    if (row.type === "Serial" && row.serial)
      return [{ ...base, type: "Serial", serial: serializeSerial(row.serial) }];

    return [];
  });
}

export type FeaturedKind = "Movie" | "Serial";

const DAY = 24 * 60 * 60 * 1000;
const MAX_NAMES = 6;

function timeAgo(date: Date, now: number) {
  const days = Math.floor((now - date.getTime()) / DAY);
  if (days <= 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 30) return `${days} days ago`;

  const months = Math.floor(days / 30);
  if (months < 12) return `${months} month${months > 1 ? "s" : ""} ago`;

  const years = Math.floor(days / 365);
  return `${years} year${years > 1 ? "s" : ""} ago`;
}

const mediaTitle = { select: { title: true } } as const;

export async function getFeaturedSummary() {
  "use cache";
  cacheTag("dashboard-featured", "featured-admin", "dashboard-boxes");
  cacheLife("hours");

  const now = Date.now();

  const [byType, active, changed, latest, rows] = await Promise.all([
    db.featuredItem.groupBy({ by: ["type"], _count: { _all: true } }),
    db.featuredItem.count({ where: { active: true } }),
    db.featuredItem.aggregate({ _max: { updatedAt: true } }),
    db.featuredItem.findFirst({
      orderBy: { createdAt: "desc" },
      select: {
        type: true,
        createdAt: true,
        movie: mediaTitle,
        serial: mediaTitle,
      },
    }),
    db.featuredItem.findMany({
      orderBy: { order: "asc" },
      take: MAX_NAMES,
      include: {
        movie: true,
        serial: true,
      },
    }),
  ]);

  const countOf = (type: "Movie" | "Serial") =>
    byType.find((g) => g.type === type)?._count._all ?? 0;

  const movies = countOf("Movie");
  const serials = countOf("Serial");
  const total = movies + serials;

  return {
    total,
    active,
    hidden: total - active,
    movies,
    serials,
    lastChange: changed._max.updatedAt,
    lastAdded: latest
      ? {
          kind: latest.type,
          title:
            (latest.type === "Movie" ? latest.movie : latest.serial)?.title ??
            "Unknown",
          ago: timeAgo(latest.createdAt, now),
        }
      : null,
    names: rows.map((row) => ({
      id: row.id,
      active: row.active,
      kind: row.type,
      title:
        (row.type === "Movie" ? row.movie : row.serial)?.title ?? "Unknown",
    })),
    all: rows.map((item) => {
      const isMovie = item.type === "Movie" && item.movie;
      const target = isMovie ? item.movie : item.serial;

      if (!target) return null;

      return {
        ...item,
        movie: item.movie
          ? {
              ...item.movie,
              rating: Number(item.movie?.rating).toFixed(1),
              purchasePrice: Number(item.movie?.purchasePrice),
            }
          : null,
        serial: item.serial
          ? {
              ...item.serial,
              rating: Number(item.serial?.rating).toFixed(1),
              purchasePrice: Number(item.movie?.purchasePrice),
            }
          : null,
      };
    }),
  };
}
export type FeaturedSummaryData = Awaited<
  ReturnType<typeof getFeaturedSummary>
>;

const MAX_GENRES = 6;

export async function getGenreStats() {
  "use cache";
  cacheTag("dashboard-genres");
  cacheLife("hours");

  const select = {
    genres: { select: { genre: true } },
  } as const;

  const [movies, serials] = await Promise.all([
    db.movie.findMany({ select }),
    db.serial.findMany({ select }),
  ]);

  const counts = new Map<string, number>();
  for (const { genres } of [...movies, ...serials]) {
    for (const { genre } of genres) {
      counts.set(genre.name, (counts.get(genre.name) ?? 0) + 1);
    }
  }

  const sorted = [...counts.entries()].sort((a, b) => b[1] - a[1]);
  const total = sorted.reduce((sum, [, n]) => sum + n, 0);

  const top = sorted.slice(0, MAX_GENRES);
  const otherCount = sorted
    .slice(MAX_GENRES)
    .reduce((sum, [, n]) => sum + n, 0);
  if (otherCount > 0) top.push(["Other", otherCount]);

  return {
    titles: movies.length + serials.length,
    items: top.map(([genre, count]) => ({
      genre,
      count,
      percent: total ? Math.round((count / total) * 1000) / 10 : 0,
    })),
  };
}
export type GenreStatsData = Awaited<ReturnType<typeof getGenreStats>>;
