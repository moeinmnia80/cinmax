"use server";

import { updateTag } from "next/cache";

import db from "@/lib/db";
import type { FeaturedKind } from "@/data/dashboard";

export type ActionResult = { ok: true } | { ok: false; error: string };

function refresh() {
  updateTag("featured-admin");
  updateTag("dashboard-featured");
  updateTag("dashboard-boxes");
}

async function safely(fn: () => Promise<void>): Promise<ActionResult> {
  try {
    await fn();
    refresh();
    return { ok: true };
  } catch (error) {
    console.error(error);
    return { ok: false, error: "Something went wrong. Please try again." };
  }
}

export async function addFeaturedItem(
  kind: FeaturedKind,
  mediaId: number,
): Promise<ActionResult> {
  return safely(async () => {
    const alreadyFeatured = await db.featuredItem.findFirst({
      where: kind === "Movie" ? { movieId: mediaId } : { serialId: mediaId },
      select: { id: true },
    });
    if (alreadyFeatured) return;

    const { _max } = await db.featuredItem.aggregate({ _max: { order: true } });

    await db.featuredItem.create({
      data: {
        type: kind,
        order: (_max.order ?? 0) + 1,
        active: true,
        ...(kind === "Movie" ? { movieId: mediaId } : { serialId: mediaId }),
      },
    });
  });
}

export async function removeFeaturedItem(id: number): Promise<ActionResult> {
  return safely(async () => {
    await db.featuredItem.delete({ where: { id } });
  });
}

export async function toggleFeaturedActive(
  id: number,
  active: boolean,
): Promise<ActionResult> {
  return safely(async () => {
    await db.featuredItem.update({ where: { id }, data: { active } });
  });
}

export async function moveFeaturedItem(
  id: number,
  direction: "up" | "down",
): Promise<ActionResult> {
  return safely(async () => {
    const items = await db.featuredItem.findMany({
      orderBy: { order: "asc" },
      select: { id: true },
    });

    const from = items.findIndex((item) => item.id === id);
    const to = from + (direction === "up" ? -1 : 1);
    if (from < 0 || to < 0 || to >= items.length) return;

    [items[from], items[to]] = [items[to], items[from]];

    await db.$transaction(
      items.map((item, index) =>
        db.featuredItem.update({
          where: { id: item.id },
          data: { order: index + 1 },
        }),
      ),
    );
  });
}
