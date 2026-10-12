import { connection } from "next/server";
import { Tv, Tags, Clapperboard } from "lucide-react";

import db from "@/lib/db";

export async function getCards() {
  await connection();
  const [movieCount, serialCount, genreCount] = await Promise.all([
    db.movie.count(),
    db.serial.count(),
    db.genre.count(),
  ]);

  return [
    {
      label: "Movies",
      value: movieCount,
      icon: Clapperboard,
      href: "/admin/movies",
    },
    {
      label: "Serials",
      value: serialCount,
      icon: Tv,
      href: "/admin/serials",
    },
    {
      label: "Genres",
      value: genreCount,
      icon: Tags,
      href: "/admin/metadata",
    },
  ];
}
