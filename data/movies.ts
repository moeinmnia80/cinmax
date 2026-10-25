import { cacheLife, cacheTag } from "next/cache";

import db from "@/lib/db";
import { MovieDetail } from "@/types/types";

export async function getMovies() {
  "use cache";
  cacheTag("movies");
  cacheLife("hours");

  return db.movie.findMany();
}

export async function getMovieCards() {
  "use cache";
  cacheTag("movie-cards");
  cacheLife("hours");

  const [movieCount, movieAVGRating] = await Promise.allSettled([
    db.movie.count(),
    db.movie.aggregate({
      _sum: {
        rating: true,
      },
    }),
  ]);

  return [
    {
      label: "Total",
      value: movieCount,
    },
    {
      label: "AVG RATING",
      value:
        movieAVGRating.status === "fulfilled"
          ? {
              status: "fulfilled" as const,
              value: movieAVGRating.value._sum.rating
                ? Number(movieAVGRating.value._sum.rating).toFixed(1)
                : 0,
            }
          : movieAVGRating,
      className: "text-destructive",
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
