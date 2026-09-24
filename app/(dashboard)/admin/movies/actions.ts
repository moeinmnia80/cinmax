"use server";

import { revalidatePath } from "next/cache";

import db from "@/lib/db";

import {
  movieFormSchema,
  type MovieFormValues,
} from "@/app/(dashboard)/admin/movies/schema";

function serializeMovie<
  T extends {
    rating: unknown;
    budget: bigint | null;
    boxOffice: bigint | null;
    genres?: { genreId: number }[];
  },
>(movie: T) {
  return {
    ...movie,
    rating: Number(movie.rating),
    budget: movie.budget !== null ? Number(movie.budget) : 0,
    boxOffice: movie.boxOffice !== null ? Number(movie.boxOffice) : 0,
    genreIds: movie.genres?.map((g) => g.genreId) ?? [],
  };
}

function toBigIntOrNull(value: number) {
  return value > 0 ? BigInt(value) : null;
}

export async function getMovies(options?: {
  search?: string;
  page?: number;
  pageSize?: number;
}) {
  const search = options?.search?.trim() ?? "";
  const page = options?.page ?? 1;
  const pageSize = options?.pageSize ?? 10;

  const where = search
    ? { title: { contains: search, mode: "insensitive" as const } }
    : {};

  const [movies, total] = await Promise.all([
    db.movie.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
      select: {
        id: true,
        slug: true,
        title: true,
        image: true,
        year: true,
        category: true,
        rating: true,
        language: { select: { name: true } },
      },
    }),
    db.movie.count({ where }),
  ]);

  return {
    movies: movies.map((m) => ({ ...m, rating: Number(m.rating) })),
    total,
    pageCount: Math.max(1, Math.ceil(total / pageSize)),
    page,
  };
}

export async function getMovieById(id: number) {
  const movie = await db.movie.findUnique({
    where: { id },
    include: { genres: true },
  });

  if (!movie) return null;
  return serializeMovie(movie);
}

export async function getMovieFormOptions() {
  const [genres, languages, countries, studios] = await Promise.all([
    db.genre.findMany({ orderBy: { name: "asc" } }),
    db.language.findMany({ orderBy: { name: "asc" } }),
    db.country.findMany({ orderBy: { name: "asc" } }),
    db.studio.findMany({ orderBy: { name: "asc" } }),
  ]);

  return { genres, languages, countries, studios };
}

export async function createMovie(values: MovieFormValues) {
  const { genreIds, budget, boxOffice, ...data } =
    movieFormSchema.parse(values);

  const movie = await db.movie.create({
    data: {
      ...data,
      budget: toBigIntOrNull(budget),
      boxOffice: toBigIntOrNull(boxOffice),
      genres: { create: genreIds.map((genreId) => ({ genreId })) },
    },
  });

  revalidatePath("/admin/movies");
  return { id: movie.id };
}

export async function updateMovie(id: number, values: MovieFormValues) {
  const { genreIds, budget, boxOffice, ...data } =
    movieFormSchema.parse(values);

  await db.$transaction([
    db.movieGenre.deleteMany({ where: { movieId: id } }),
    db.movie.update({
      where: { id },
      data: {
        ...data,
        budget: toBigIntOrNull(budget),
        boxOffice: toBigIntOrNull(boxOffice),
        genres: { create: genreIds.map((genreId) => ({ genreId })) },
      },
    }),
  ]);

  revalidatePath("/admin/movies");
  revalidatePath(`/admin/movies/${id}`);
}

export async function deleteMovie(id: number) {
  await db.movie.delete({ where: { id } });
  revalidatePath("/admin/movies");
}
