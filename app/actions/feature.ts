"use server";

import { z } from "zod";
import { updateTag } from "next/cache";
import { Prisma } from "@prisma/client";

import db from "@/lib/db";

const addFeaturedSchema = z.object({
  type: z.enum(["Movie", "Serial"]),
  id: z.number().int().positive(),
});

export type AddFeaturedResult =
  | { success: true; id: number; order: number }
  | { success: false; message: string };

export async function addFeaturedItem(
  input: z.infer<typeof addFeaturedSchema>,
): Promise<AddFeaturedResult> {
  const parsed = addFeaturedSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, message: "Invalid data" };
  }

  const { type, id } = parsed.data;

  try {
    const last = await db.featuredItem.aggregate({ _max: { order: true } });
    const order = (last._max.order ?? -1) + 1;

    const item = await db.featuredItem.create({
      data: {
        type,
        order,
        ...(type === "Movie" ? { movieId: id } : { serialId: id }),
      },
      select: { id: true, order: true },
    });

    updateTag("dashboard-featured");
    updateTag("dashboard-boxes");

    return { success: true, ...item };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return { success: false, message: "Already in featured items" };
      }
      if (error.code === "P2003") {
        return { success: false, message: "Movie or serial not found" };
      }
    }
    console.error("addFeaturedItem error:", error);
    return { success: false, message: "Failed to add featured item" };
  }
}

const removeFeaturedSchema = z.object({
  type: z.enum(["Movie", "Serial"]),
  id: z.number().int().positive(),
});

export type RemoveFeaturedResult =
  | { success: true }
  | { success: false; message: string };

export async function removeFeaturedItem(
  input: z.infer<typeof removeFeaturedSchema>,
): Promise<RemoveFeaturedResult> {
  const parsed = removeFeaturedSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, message: "Invalid data" };
  }

  const { type, id } = parsed.data;

  try {
    await db.featuredItem.deleteMany({
      where: type === "Movie" ? { movieId: id } : { serialId: id },
    });

    updateTag("dashboard-featured");
    updateTag("dashboard-boxes");

    return { success: true };
  } catch (error) {
    console.error("removeFeaturedItem error:", error);
    return { success: false, message: "Failed to remove featured item" };
  }
}
