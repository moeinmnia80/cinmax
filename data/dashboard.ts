import { cacheLife, cacheTag } from "next/cache";

import db from "@/lib/db";

export async function getLastMovies() {
  "use cache";
  cacheTag("dashboard-boxes");
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

export async function getLastSerials() {
  "use cache";
  cacheTag("dashboard-boxes");
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

export async function getFeaturedItems() {
  "use cache";
  cacheTag("dashboard-boxes", "dashboard-featured");
  cacheLife("hours");

  return db.featuredItem.findMany({
    orderBy: [{ order: "asc" }],
    select: {
      id: true,
      type: true,
      order: true,
      active: true,
      movie: true,
      serial: true,
    },
  });
}

export type DashboardFeatured = Awaited<
  ReturnType<typeof getFeaturedItems>
>[number];
