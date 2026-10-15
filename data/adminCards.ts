import { cacheLife, cacheTag } from "next/cache";

import db from "@/lib/db";

export async function getCards() {
  "use cache";
  cacheTag("dashboard-cards");
  cacheLife("hours");

  const [movieCount, serialCount, genreCount, userCount] =
    await Promise.allSettled([
      db.movie.count(),
      db.serial.count(),
      db.genre.count(),
      db.user.count(),
    ]);

  return [
    {
      label: "Movies",
      value: movieCount,
    },
    {
      label: "Serials",
      value: serialCount,
    },
    {
      label: "Genres",
      value: genreCount,
    },
    {
      label: "Users",
      value: userCount,
    },
  ];
}
