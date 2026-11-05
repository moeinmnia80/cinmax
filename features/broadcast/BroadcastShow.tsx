"use client";

import Image from "next/image";
import { use, useMemo } from "react";

import { useBroadcast } from "@/store/useBroadcast";
import { formatDuration } from "../hero/HeroContent";
import { broadcastDays } from "@/constants/broadcast";
import type { BroadcastsData } from "@/data/broadcast";
import Link from "next/link";

export const BroadcastShow = ({ data }: { data: Promise<BroadcastsData> }) => {
  const allBroadcasts = use(data);
  const storedDay = useBroadcast((state) => state.day);

  const day = useMemo(() => {
    const available = new Set(
      allBroadcasts.flatMap((item) => item?.days ?? []),
    );
    return available.has(storedDay)
      ? storedDay
      : (broadcastDays.find((d) => available.has(d.day))?.day ?? storedDay);
  }, [allBroadcasts, storedDay]);

  const broadcasts = useMemo(
    () => allBroadcasts.filter((item) => item?.days?.includes(day)),
    [allBroadcasts, day],
  );

  return (
    <>
      <div className="flex gap-2 w-full">
        {broadcasts.map((item) => {
          const media = item?.type === "Movie" ? item.movie : item?.serial;
          return (
            <Link
              href={`/${item?.type.toLowerCase()}/${media?.slug}`}
              key={item?.id}
              className="relative rounded-2xl overflow-hidden animate-slide-left"
            >
              {media?.image && (
                <Image
                  src={media.image}
                  alt="x"
                  width={300}
                  height={400}
                  className="aspect-2/3 "
                />
              )}
              <span className="absolute inset-0 bg-linear-to-t from-background/60 to-background/20" />
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-center gap-1">
                <span className="w-fit text-xs uppercase bg-background/10 backdrop-blur-sm px-5 py-1 border border-foreground/10 rounded-full">
                  {item?.type}
                </span>
                <span className="w-fit text-xs font-semibold uppercase bg-background/10 backdrop-blur-sm px-5 py-1 border border-foreground/10 rounded-full">
                  {item?.time}
                </span>
                <span className="w-fit text-xs bg-background/10 backdrop-blur-sm px-5 py-1 border border-foreground/10 rounded-full">
                  {media?.durationMinutes &&
                    formatDuration(media.durationMinutes)}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
};
