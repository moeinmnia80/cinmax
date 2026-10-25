import db from "@/lib/db";
import { cacheLife, cacheTag } from "next/cache";

export async function getMetadata() {
  "use cache";
  cacheTag("metadata");
  cacheLife("days");

  const [genres, languages, countries, studios] = await Promise.allSettled([
    db.genre.findMany({ orderBy: { name: "asc" } }),
    db.language.findMany({ orderBy: { name: "asc" } }),
    db.country.findMany({ orderBy: { name: "asc" } }),
    db.studio.findMany({ orderBy: { name: "asc" } }),
  ]);
  return { genres, languages, countries, studios };
}
