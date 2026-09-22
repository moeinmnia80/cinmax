"use server";

import { revalidatePath } from "next/cache";

// Adjust this import to wherever your Prisma client instance actually
// lives (the `db.ts` you shared exports `export const db = new PrismaClient(...)`).
import db from "@/lib/db";

import { movieFormSchema, type MovieFormValues } from "./schema";

// Prisma's `Decimal` (rating) and `BigInt` (budget/boxOffice) types
// can't cross the server/client boundary as-is — every movie handed to
// a Client Component has to go through this first. `0` for budget/
// boxOffice is treated as "not entered" and comes back as `null`.
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

// `budget`/`boxOffice` come out of the form as plain numbers (0 = not
// entered) and go into Prisma as `bigint | null`.
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
    // Explicit `select` here (rather than the full model) so we never
    // accidentally hand a BigInt field to the Client Component table.
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

// Options needed to populate the selects/checkboxes in the movie form.
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

  // MovieGenre is an explicit join model, so there's no Prisma `set`
  // shorthand for many-to-many here — clear and re-create instead.
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
