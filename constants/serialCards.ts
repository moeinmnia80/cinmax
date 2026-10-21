import db from "@/lib/db";
import { cacheLife, cacheTag } from "next/cache";

export async function getSerialCards() {
  "use cache";
  cacheTag("serial-cards");
  cacheLife("hours");

  const [serialCount, onGoingCount, episodeCount] = await Promise.allSettled([
    db.serial.count(),
    db.serial.count({ where: { status: "Ongoing" } }),
    db.serial.aggregate({
      _sum: {
        episodes: true,
      },
    }),
  ]);

  return [
    {
      label: "Total",
      value: serialCount,
    },
    {
      label: "Ongoing",
      value: onGoingCount,
      className: "text-destructive",
    },
    {
      label: "episodes",
      value:
        episodeCount.status === "fulfilled"
          ? {
              status: "fulfilled" as const,
              value: episodeCount.value._sum.episodes ?? 0,
            }
          : episodeCount,
    },
  ];
}
