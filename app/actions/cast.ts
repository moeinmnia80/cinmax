"use server";

import { z } from "zod";
import { cookies } from "next/headers";

import db from "@/lib/db";
import { decrypt } from "@/lib/session";

const targetSchema = z.object({
  type: z.enum(["movie", "serial"]),
  id: z.number().int().positive(),
});

const addCastSchema = z.object({
  target: targetSchema,
  personId: z.number().int().positive(),
  role: z
    .string()
    .trim()
    .min(2, "Role is too short")
    .max(50, "Role is too long"),
  character: z.string().trim().max(100).optional(),
});

export type CastTarget = z.infer<typeof targetSchema>;
export type CastActionResult =
  | { success: true }
  | { success: false; error: string };

async function requireUser() {
  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);
  return session?.userId ?? null;
}

export async function addCast(
  input: z.input<typeof addCastSchema>,
): Promise<CastActionResult> {
  if (!(await requireUser())) return { success: false, error: "Unauthorized" };

  const parsed = addCastSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message };
  }

  const { target, personId, role } = parsed.data;

  try {
    if (target.type === "movie") {
      await db.movieCast.upsert({
        where: { movieId_personId: { movieId: target.id, personId } },
        update: {},
        create: { movieId: target.id, personId, role },
      });
    } else {
      await db.serialCast.upsert({
        where: { serialId_personId: { serialId: target.id, personId } },
        update: {},
        create: { serialId: target.id, personId, role },
      });
    }
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Could not add cast member" };
  }
}

export async function removeCast(
  target: CastTarget,
  personId: number,
): Promise<CastActionResult> {
  if (!(await requireUser())) return { success: false, error: "Unauthorized" };

  try {
    if (target.type === "movie") {
      await db.movieCast.deleteMany({
        where: { movieId: target.id, personId },
      });
    } else {
      await db.serialCast.deleteMany({
        where: { serialId: target.id, personId },
      });
    }
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Could not remove cast member" };
  }
}
