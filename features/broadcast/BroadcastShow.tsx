"use client";

import { use, useMemo } from "react";

import { useBroadcast } from "@/store/useBroadcast";
import { broadcastDays } from "@/constants/broadcast";
import type { BroadcastsData } from "@/data/broadcast";
import { type Broadcast, BroadcastCard } from "./BroadcastCard";

export const BroadcastShow = ({ data }: { data: Promise<BroadcastsData> }) => {
  const allBroadcasts = use(data);
  const storedDay = useBroadcast((state) => state.day);

  const day = useMemo(() => {
    const available = new Set(allBroadcasts.flatMap((i) => i?.days ?? []));
    return available.has(storedDay)
      ? storedDay
      : (broadcastDays.find((d) => available.has(d.day))?.day ?? storedDay);
  }, [allBroadcasts, storedDay]);

  const broadcasts = useMemo(
    () =>
      allBroadcasts.filter((i): i is Broadcast => !!i && i.days?.includes(day)),
    [allBroadcasts, day],
  );

  return (
    <div
      key={day}
      className="flex w-full snap-x snap-mandatory gap-3 overflow-x-auto pb-2"
    >
      {broadcasts.map((item, i) => (
        <BroadcastCard key={item.id} item={item} index={i} />
      ))}
    </div>
  );
};
