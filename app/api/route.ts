import { NextRequest, NextResponse } from "next/server";

import db from "@/lib/db";
import {
  FeaturedMedia,
  serializeMovie,
  serializeSerial,
} from "@/data/dashboard";

const MIN_QUERY_LENGTH = 2;
const LIMIT = 10;

export async function GET(request: NextRequest) {
  const search = request.nextUrl.searchParams.get("search")?.trim() ?? "";
  try {
    if (search.length < MIN_QUERY_LENGTH) {
      return NextResponse.json({ success: true, results: [] });
    }

    const where = {
      title: { contains: search, mode: "insensitive" as const },
    };

    const [movies, serials] = await Promise.all([
      db.movie.findMany({ where, take: LIMIT, orderBy: { title: "asc" } }),
      db.serial.findMany({ where, take: LIMIT, orderBy: { title: "asc" } }),
    ]);

    const results: FeaturedMedia[] = [
      ...movies.map((movie) => ({
        type: "Movie" as const,
        movie: serializeMovie(movie),
      })),
      ...serials.map((serial) => ({
        type: "Serial" as const,
        serial: serializeSerial(serial),
      })),
    ];

    return NextResponse.json({ success: true, results });
  } catch (error) {
    console.error("search content error:", error);

    return NextResponse.json(
      { success: false, message: "Failed to search content" },
      { status: 500 },
    );
  }
}
