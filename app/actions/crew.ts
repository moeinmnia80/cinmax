"use server";

import { z } from "zod";
import { cookies } from "next/headers";

import db from "@/lib/db";
import { decrypt } from "@/lib/session";
import { CREW_ROLES, CrewRole } from "@/constants/crew";
import type { CastTarget, CastActionResult } from "@/app/actions/cast";

const addCrewSchema = z.object({
  target: z.object({
    type: z.enum(["movie", "serial"]),
    id: z.number().int().positive(),
  }),
  personId: z.number().int().positive(),
  role: z.enum(CREW_ROLES),
});

async function requireUser() {
  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);
  return session?.userId ?? null;
}

export async function addCrew(
  input: z.input<typeof addCrewSchema>,
): Promise<CastActionResult> {
  if (!(await requireUser())) return { success: false, error: "Unauthorized" };

  const parsed = addCrewSchema.safeParse(input);
  if (!parsed.success) return { success: false, error: "Invalid data" };

  const { target, personId, role } = parsed.data;

  try {
    if (target.type === "movie") {
      await db.movieCrew.upsert({
        where: {
          movieId_personId_role: { movieId: target.id, personId, role },
        },
        update: {},
        create: { movieId: target.id, personId, role },
      });
    } else {
      await db.serialCrew.upsert({
        where: {
          serialId_personId_role: { serialId: target.id, personId, role },
        },
        update: {},
        create: { serialId: target.id, personId, role },
      });
    }
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Could not add crew member" };
  }
}

export async function removeCrew(
  target: CastTarget,
  personId: number,
  role: CrewRole,
): Promise<CastActionResult> {
  if (!(await requireUser())) return { success: false, error: "Unauthorized" };

  try {
    if (target.type === "movie") {
      await db.movieCrew.deleteMany({
        where: { movieId: target.id, personId, role },
      });
    } else {
      await db.serialCrew.deleteMany({
        where: { serialId: target.id, personId, role },
      });
    }
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Could not remove crew member" };
  }
}
