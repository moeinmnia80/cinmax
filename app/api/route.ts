import { NextRequest, NextResponse } from "next/server";

export type MovieDTO = Omit<Movie, "rating" | "purchasePrice"> & {
  rating: string;
  purchasePrice: number;
};
export type SerialDTO = Omit<Serial, "rating" | "purchasePrice"> & {
  rating: string;
  purchasePrice: number;
};

export type FeaturedMedia =
  | { type: "Movie"; movie: MovieDTO }
  | { type: "Serial"; serial: SerialDTO };

export type DashboardFeatured = FeaturedMedia & {
  id: number;
  order: number;
  active: boolean;
};

export const serializeMovie = (m: Movie): MovieDTO => ({
  ...m,
  rating: Number(m.rating).toFixed(1),
  purchasePrice: Number(m.purchasePrice),
});

export const serializeSerial = (s: Serial): SerialDTO => ({
  ...s,
  rating: Number(s.rating).toFixed(1),
  purchasePrice: Number(s.purchasePrice),
});

import db from "@/lib/db";
import { Movie, Serial } from "@/types/types";

const MIN_QUERY_LENGTH = 2;
const LIMIT = 10;

export async function GET(request: NextRequest) {
  try {
    const search = request.nextUrl.searchParams.get("search")?.trim() ?? "";

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
