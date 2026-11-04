"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidateTag } from "next/cache";

import { db } from "@/lib/db";
import { FeaturedType } from "@/types/types";
import { broadcastSchema } from "@/lib/validations/broadcast.schema";

export type BroadcastField =
  | "type"
  | "movieId"
  | "serialId"
  | "label"
  | "days"
  | "time"
  | "startDate"
  | "endDate";

export type SaveBroadcastState = {
  errors?: Partial<Record<BroadcastField, string[]>>;
  message: string;
  success: boolean;
};

const prismaCode = (error: unknown) =>
  typeof error === "object" && error !== null && "code" in error
    ? String(error.code)
    : null;

export async function saveBroadcast(
  _prevState: SaveBroadcastState,
  formData: FormData,
): Promise<SaveBroadcastState> {
  const parsed = broadcastSchema.safeParse({
    ...Object.fromEntries(formData),
    days: formData.getAll("days"),
  });

  if (!parsed.success) {
    return {
      success: false,
      errors: z.flattenError(parsed.error).fieldErrors,
      message: "Missing or invalid fields.",
    };
  }

  const { type, movieId, serialId, endDate, label, ...rest } = parsed.data;
  const isMovie = type === FeaturedType.Movie;
  const targetField = isMovie ? "movieId" : "serialId";

  const rawId = formData.get("id");
  const id = rawId ? Number(rawId) : null;
  if (id !== null && (!Number.isInteger(id) || id <= 0)) {
    return { success: false, message: "Invalid broadcast ID." };
  }

  const schedule = { ...rest, label: label ?? null, endDate: endDate ?? null };
  let createdSlug = "";

  try {
    if (id) {
      await db.broadcast.update({
        where: { id },
        data: schedule,
        select: { id: true },
      });
    } else {
      const where = isMovie ? { movieId: movieId! } : { serialId: serialId! };

      const duplicate = await db.broadcast.findFirst({
        where,
        select: { id: true },
      });
      if (duplicate) {
        return {
          success: false,
          errors: {
            [targetField]: [
              "This title already has a broadcast. Open it to edit.",
            ],
          },
          message: "Duplicate broadcast.",
        };
      }

      const created = await db.broadcast.create({
        data: { ...schedule, type, ...where },
        select: {
          movie: { select: { slug: true } },
          serial: { select: { slug: true } },
        },
      });
      createdSlug = created.movie?.slug ?? created.serial?.slug ?? "";
    }
  } catch (error) {
    console.error("Save broadcast error:", error);

    switch (prismaCode(error)) {
      case "P2025":
        return { success: false, message: "This broadcast no longer exists." };
      case "P2002":
        return {
          success: false,
          errors: { [targetField]: ["This title already has a broadcast."] },
          message: "Duplicate broadcast.",
        };
      case "P2003":
        return {
          success: false,
          errors: { [targetField]: ["Selected title is no longer available."] },
          message: "Invalid title.",
        };
    }

    return {
      success: false,
      message: "Failed to save broadcast. Please try again.",
    };
  }

  revalidateTag("broadcasts", "max");

  if (createdSlug) redirect(`/admin/broadcast?edit=${createdSlug}`);

  return { success: true, message: "Broadcast saved successfully!" };
}

export async function deleteBroadcast(formData: FormData) {
  const id = Number(formData.get("id"));

  if (!Number.isInteger(id) || id <= 0) {
    throw new Error("Invalid broadcast ID provided.");
  }

  try {
    await db.broadcast.delete({ where: { id } });
  } catch (error) {
    if (prismaCode(error) !== "P2025") {
      console.error("Failed to delete broadcast:", error);
      throw new Error("Failed to delete the broadcast from database.");
    }
  }

  revalidateTag("broadcasts", "max");
  redirect("/admin/broadcast");
}
