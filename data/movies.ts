import { cacheLife, cacheTag } from "next/cache";

import db from "@/lib/db";
import { MovieDetail } from "@/types/types";
import { lastChangeOf, recentArgs, weekOf } from "@/utils";

export async function getMovies() {
  "use cache";
  cacheTag("movies");
  cacheLife("hours");

  const movies = await db.movie.findMany();

  return movies.map((movie) => ({
    ...movie,
    rating: movie.rating.toNumber(),
    purchasePrice: movie.purchasePrice?.toString() ?? null,
  }));
}

export async function getMovieCards() {
  "use cache";
  cacheTag("movie-cards");
  cacheLife("hours");

  const now = Date.now();

  const [movieCount, movieAVGRating, recentMovies, movieChange] =
    await Promise.allSettled([
      db.movie.count(),
      db.movie.aggregate({
        _count: true,
        _sum: {
          rating: true,
        },
      }),
      db.movie.findMany(recentArgs(now)),
      db.movie.aggregate({
        _max: { updatedAt: true },
      }),
    ]);

  return [
    {
      label: "Total",
      value: movieCount,
      ...weekOf(recentMovies, now),
      lastChange: lastChangeOf(movieChange),
    },
    {
      label: "AVG RATING",
      value:
        movieAVGRating.status === "fulfilled"
          ? {
              status: "fulfilled" as const,
              value: movieAVGRating.value._sum.rating
                ? (
                    Number(movieAVGRating.value._sum.rating) /
                    movieAVGRating.value._count
                  ).toFixed(1)
                : 0,
            }
          : movieAVGRating,
      className: "text-destructive",

      lastChange: lastChangeOf(movieChange),
    },
  ];
}

export interface MovieType extends Omit<
  MovieDetail,
  "rating" | "purchasePrice"
> {
  rating: number;
  purchasePrice: string | null;
}

export const getMovie = async (slug?: string): Promise<MovieType | null> => {
  "use cache";
  cacheTag("movie-data");
  cacheLife("minutes");

  if (!slug) return null;

  const movie = await db.movie.findFirst({
    where: { slug },
    include: {
      studio: true,
      country: true,
      genres: {
        select: {
          genre: true,
        },
      },
      crew: { select: { person: true } },
      cast: { select: { person: true } },
      relatedMovies: { select: { targetMovie: true } },
      language: true,
    },
  });

  if (!movie) return null;

  return {
    ...movie,
    rating: movie.rating.toNumber(),
    purchasePrice: movie.purchasePrice?.toString() ?? null,
  };
};

export async function getMovieWithQuery(query: string) {
  return db.movie.findMany({
    where: query
      ? { title: { contains: query, mode: "insensitive" } }
      : undefined,
    orderBy: { updatedAt: "desc" },
    include: {
      genres: {
        include: {
          genre: true,
        },
      },
      crew: { select: { person: true } },
      featuredItems: { select: { movie: true, serial: true } },
      country: true,
      studio: true,
      language: true,
    },
  });
}
