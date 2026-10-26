import { cacheLife, cacheTag } from "next/cache";

import db from "@/lib/db";

type LastChange = PromiseSettledResult<{ _max: { updatedAt: Date | null } }>;

const lastChangeOf = (result: LastChange) =>
  result.status === "fulfilled" ? result.value._max.updatedAt : undefined;

const DAY = 24 * 60 * 60 * 1000;

const countOf = (result: PromiseSettledResult<number>) =>
  result.status === "fulfilled" ? result.value : undefined;

export async function getCards() {
  "use cache";
  cacheTag("dashboard-cards");
  cacheLife("hours");

  const weekAgo = new Date(Date.now() - 7 * DAY);
  const thisWeek = { where: { createdAt: { gte: weekAgo } } };

  const [
    movieCount,
    serialCount,
    genreCount,
    userCount,
    movieChange,
    serialChange,
    genreChange,
    userChange,
    movieWeek,
    serialWeek,
    genreWeek,
    userWeek,
  ] = await Promise.allSettled([
    db.movie.count(),
    db.serial.count(),
    db.genre.count(),
    db.user.count(),
    db.movie.aggregate({ _max: { updatedAt: true } }),
    db.serial.aggregate({ _max: { updatedAt: true } }),
    db.genre.aggregate({ _max: { updatedAt: true } }),
    db.user.aggregate({ _max: { updatedAt: true } }),
    db.movie.count(thisWeek),
    db.serial.count(thisWeek),
    db.genre.count(thisWeek),
    db.user.count(thisWeek),
  ]);

  return [
    {
      label: "Movies",
      value: movieCount,
      addedThisWeek: countOf(movieWeek),
      lastChange: lastChangeOf(movieChange),
    },
    {
      label: "Serials",
      value: serialCount,
      addedThisWeek: countOf(serialWeek),
      lastChange: lastChangeOf(serialChange),
    },
    {
      label: "Genres",
      value: genreCount,
      addedThisWeek: countOf(genreWeek),
      lastChange: lastChangeOf(genreChange),
    },
    {
      label: "Users",
      value: userCount,
      addedThisWeek: countOf(userWeek),
      lastChange: lastChangeOf(userChange),
    },
  ];
}
