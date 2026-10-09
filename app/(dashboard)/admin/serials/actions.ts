"use server";

import { revalidatePath } from "next/cache";

// Adjust this import to wherever your Prisma client instance actually lives.
import db from "@/lib/db";

import { serialFormSchema, type SerialFormValues } from "./schema";
// import { toFriendlyError } from "../../_lib/prismaErrors";

// Prisma's `Decimal` (rating) type can't cross the server/client boundary
// as-is — every serial handed to a Client Component goes through this.
function serializeSerial<
  T extends { rating: unknown; genres?: { genreId: number }[] },
>(serial: T) {
  return {
    ...serial,
    rating: Number(serial.rating),
    genreIds: serial.genres?.map((g) => g.genreId) ?? [],
  };
}

// `endYear` comes out of the form as a plain number (0 = "not entered" /
// still ongoing) and goes into Prisma as `number | null`.
function toIntOrNull(value: number) {
  return value > 0 ? value : null;
}

export async function getSerials(options?: {
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

  const [serials, total] = await Promise.all([
    db.serial.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
      select: {
        id: true,
        slug: true,
        title: true,
        image: true,
        startYear: true,
        endYear: true,
        status: true,
        rating: true,
        seasons: true,
        language: { select: { name: true } },
      },
    }),
    db.serial.count({ where }),
  ]);

  return {
    serials: serials.map((s) => ({ ...s, rating: Number(s.rating) })),
    total,
    pageCount: Math.max(1, Math.ceil(total / pageSize)),
    page,
  };
}

export async function getSerialById(id: number) {
  const serial = await db.serial.findUnique({
    where: { id },
    include: { genres: true },
  });

  if (!serial) return null;
  return serializeSerial(serial);
}

// Serials share the exact same reference data (genres/languages/
// countries/studios) as movies.
export async function getSerialFormOptions() {
  const [genres, languages, countries, studios] = await Promise.all([
    db.genre.findMany({ orderBy: { name: "asc" } }),
    db.language.findMany({ orderBy: { name: "asc" } }),
    db.country.findMany({ orderBy: { name: "asc" } }),
    db.studio.findMany({ orderBy: { name: "asc" } }),
  ]);

  return { genres, languages, countries, studios };
}

export async function createSerial(values: SerialFormValues) {
  const { genreIds, endYear, backdrop, badge, ...data } =
    serialFormSchema.parse(values);

  try {
    const serial = await db.serial.create({
      data: {
        ...data,
        endYear: toIntOrNull(endYear),
        backdrop: backdrop || null,
        badge: badge || null,
        genres: { create: genreIds.map((genreId) => ({ genreId })) },
      },
    });

    revalidatePath("/admin/serials");
    return { id: serial.id };
  } catch (err) {
    // throw toFriendlyError(err, "serial");
  }
}

export async function updateSerial(id: number, values: SerialFormValues) {
  const { genreIds, endYear, backdrop, badge, ...data } =
    serialFormSchema.parse(values);

  try {
    // SerialGenre is an explicit join model, so there's no Prisma `set`
    // shorthand for many-to-many here — clear and re-create instead.
    await db.$transaction([
      db.serialGenre.deleteMany({ where: { serialId: id } }),
      db.serial.update({
        where: { id },
        data: {
          ...data,
          endYear: toIntOrNull(endYear),
          backdrop: backdrop || null,
          badge: badge || null,
          genres: { create: genreIds.map((genreId) => ({ genreId })) },
        },
      }),
    ]);

    revalidatePath("/admin/serials");
    revalidatePath(`/admin/serials/${id}`);
  } catch (err) {
    // throw toFriendlyError(err, "serial");
  }
}

export async function deleteSerial(id: number) {
  await db.serial.delete({ where: { id } });
  revalidatePath("/admin/serials");
}
