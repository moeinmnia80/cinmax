"use server";

import { revalidatePath } from "next/cache";

import db from "@/lib/db";

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");
}

export async function getMetadata() {
  const [genres, languages, countries, studios] = await Promise.all([
    db.genre.findMany({ orderBy: { name: "asc" } }),
    db.language.findMany({ orderBy: { name: "asc" } }),
    db.country.findMany({ orderBy: { name: "asc" } }),
    db.studio.findMany({ orderBy: { name: "asc" } }),
  ]);
  return { genres, languages, countries, studios };
}

// ---------- Genre ----------
export async function createGenre(name: string) {
  await db.genre.create({ data: { name, slug: slugify(name) } });
  revalidatePath("/admin/metadata");
}
export async function deleteGenre(id: number) {
  await db.genre.delete({ where: { id } });
  revalidatePath("/admin/metadata");
}

// ---------- Language ----------
export async function createLanguage(name: string, code: string) {
  await db.language.create({ data: { name, code } });
  revalidatePath("/admin/metadata");
}
export async function deleteLanguage(id: number) {
  await db.language.delete({ where: { id } });
  revalidatePath("/admin/metadata");
}

// ---------- Country ----------
export async function createCountry(name: string, code: string) {
  await db.country.create({ data: { name, code } });
  revalidatePath("/admin/metadata");
}
export async function deleteCountry(id: number) {
  await db.country.delete({ where: { id } });
  revalidatePath("/admin/metadata");
}

// ---------- Studio ----------
export async function createStudio(name: string) {
  await db.studio.create({ data: { name } });
  revalidatePath("/admin/metadata");
}
export async function deleteStudio(id: number) {
  await db.studio.delete({ where: { id } });
  revalidatePath("/admin/metadata");
}
