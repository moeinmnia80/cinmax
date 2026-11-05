"use client";

import { use, useMemo } from "react";

import { useBroadcast } from "@/store/useBroadcast";
import { broadcastDays } from "@/constants/broadcast";
import type { BroadcastsData } from "@/data/broadcast";

export const BroadcastNav = ({ data }: { data: Promise<BroadcastsData> }) => {
  const broadcasts = use(data);

  const day = useBroadcast((state) => state.day);
  const setDay = useBroadcast((state) => state.setDay);

  const availableDays = useMemo(
    () => new Set(broadcasts.flatMap((item) => item?.days ?? [])),
    [broadcasts],
  );

  const activeDay = availableDays.has(day)
    ? day
    : (broadcastDays.find((d) => availableDays.has(d.day))?.day ?? day);

  return (
    <>
      {broadcastDays.map((broadcastDay) => {
        const isActive = activeDay === broadcastDay.day;
        const isDisabled = !availableDays.has(broadcastDay.day);

        return (
          <button
            key={`${broadcastDay.day}-${broadcastDay.date}`}
            type="button"
            disabled={isDisabled}
            aria-pressed={isActive}
            title={isDisabled ? "No broadcast this day" : undefined}
            onClick={() => setDay(broadcastDay.day)}
            className={`flex items-center justify-center gap-1 rounded-full px-5 py-2.5 outline-none transition-all duration-300 focus-visible:ring-2 focus-visible:ring-foreground disabled:cursor-default disabled:opacity-25 disabled:hover:bg-transparent disabled:hover:text-foreground/35 ${
              isActive
                ? "bg-foreground text-background shadow-xl shadow-black/30"
                : "text-foreground/35 hover:bg-foreground/6 hover:text-foreground"
            }`}
          >
            <span className="text-[10px] font-bold uppercase tracking-wider">
              {broadcastDay.day}
            </span>
            <span className="text-sm font-black">{broadcastDay.date}</span>
          </button>
        );
      })}
    </>
  );
};
