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

export async function createGenre(name: string) {
  await db.genre.create({ data: { name, slug: slugify(name) } });
  revalidatePath("/admin/metadata");
}
export async function deleteGenre(id: number) {
  await db.genre.delete({ where: { id } });
  revalidatePath("/admin/metadata");
}

export async function createLanguage(name: string, code: string) {
  await db.language.create({ data: { name, code } });
  revalidatePath("/admin/metadata");
}
export async function deleteLanguage(id: number) {
  await db.language.delete({ where: { id } });
  revalidatePath("/admin/metadata");
}

export async function createCountry(name: string, code: string) {
  await db.country.create({ data: { name, code } });
  revalidatePath("/admin/metadata");
}
export async function deleteCountry(id: number) {
  await db.country.delete({ where: { id } });
  revalidatePath("/admin/metadata");
}

export async function createStudio(name: string) {
  await db.studio.create({ data: { name } });
  revalidatePath("/admin/metadata");
}
export async function deleteStudio(id: number) {
  await db.studio.delete({ where: { id } });
  revalidatePath("/admin/metadata");
}
