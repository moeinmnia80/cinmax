import { Clapperboard, Tags, Globe2, Tv, Building2 } from "lucide-react";

import db from "@/lib/db";

async function getStats() {
  const [movieCount, serialCount, genreCount, languageCount, studioCount] =
    await Promise.all([
      db.movie.count(),
      db.serial.count(),
      db.genre.count(),
      db.language.count(),
      db.studio.count(),
    ]);
  return { movieCount, serialCount, genreCount, languageCount, studioCount };
}
const stats = await getStats();

export const cards = [
  {
    label: "Movies",
    value: stats.movieCount,
    icon: Clapperboard,
    href: "/admin/movies",
  },
  {
    label: "Serials",
    value: stats.serialCount,
    icon: Tv,
    href: "/admin/serials",
  },

  {
    label: "Genres",
    value: stats.genreCount,
    icon: Tags,
    href: "/admin/metadata",
  },
  {
    label: "Languages",
    value: stats.languageCount,
    icon: Globe2,
    href: "/admin/metadata",
  },
  {
    label: "Studios",
    value: stats.studioCount,
    icon: Building2,
    href: "/admin/metadata",
  },
];
