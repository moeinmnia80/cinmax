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

type FieldErrors = Partial<Record<BroadcastField, string[]>>;

export type SaveBroadcastState = {
  errors?: FieldErrors;
  message: string;
  success: boolean;
};

const prismaCode = (e: unknown) =>
  typeof e === "object" && e !== null && "code" in e ? String(e.code) : null;

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

  const target = isMovie
    ? await db.movie.findUnique({
        where: { id: movieId! },
        select: { id: true },
      })
    : await db.serial.findUnique({
        where: { id: serialId! },
        select: { id: true },
      });

  if (!target) {
    return {
      success: false,
      errors: {
        [targetField]: [
          `This ${isMovie ? "movie" : "serial"} no longer exists.`,
        ],
      },
      message: "Invalid title.",
    };
  }

  const data = {
    ...rest,
    type,
    label: label ?? null,
    endDate: endDate ?? null,
    movieId: isMovie ? movieId! : null,
    serialId: isMovie ? null : serialId!,
  };

  let savedId: number;

  try {
    const saved = id
      ? await db.broadcast.update({ where: { id }, data, select: { id: true } })
      : await db.broadcast.create({ data, select: { id: true } });
    savedId = saved.id;
  } catch (error) {
    console.error("Save broadcast error:", error);

    const code = prismaCode(error);
    if (code === "P2025") {
      return { success: false, message: "This broadcast no longer exists." };
    }
    if (code === "P2003") {
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

  if (!id) redirect(`/admin/broadcasts/${savedId}`);

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
  redirect("/admin/broadcasts");
}
