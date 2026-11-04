"use client";

import Image from "next/image";
import { use, useEffect, useState } from "react";

import { BroadcastsData } from "@/data/broadcast";
import { useBroadcast } from "@/store/useBroadcast";
import { Play } from "lucide-react";

export const BroadcastShow = ({ data }: { data: Promise<BroadcastsData> }) => {
  const allBroadcasts = use(data);
  const day = useBroadcast((state) => state.day);

  const filteredBroadcasts = allBroadcasts.filter(
    (item) => item.days && item.days.includes(day),
  );

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (filteredBroadcasts.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === filteredBroadcasts.length - 1 ? 0 : prevIndex + 1,
      );
    }, 15000);

    return () => clearInterval(interval);
  }, [filteredBroadcasts.length]);

  if (filteredBroadcasts.length === 0) {
    return (
      <div className="flex items-center justify-center p-8 text-gray-400">
        there is not any data
      </div>
    );
  }

  const currentItem = filteredBroadcasts[currentIndex] || filteredBroadcasts[0];
  const media =
    currentItem.type === "Movie" ? currentItem.movie : currentItem.serial;

  return (
    <div className="relative flex items-center gap-2 w-full">
      <div className="flex-4 relative w-full overflow-hidden rounded-3xl border border-foreground/5">
        <div className="absolute top-4 left-4 flex items-center gap-2 rounded-full border border-white/10 bg-background/35 px-3.5 py-2 backdrop-blur-xl">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>
          <span className="text-[10px] font-black uppercase tracking-[0.16em] text-white">
            Featured tonight
          </span>
        </div>
        {media && (
          <>
            {media?.backdrop && (
              <Image
                src={media?.backdrop}
                alt={media.title || "Broadcast Image"}
                width={1920}
                height={1080}
                priority
                className="object-contain aspect-video opacity-75 transition-opacity duration-1000 ease-in-out motion-reduce:transition-none"
              />
            )}
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-9 lg:max-w-[78%]">
              <div className="mb-5 flex items-center gap-4">
                <span className="text-5xl font-black leading-none text-white sm:text-6xl">
                  {currentItem.time}
                </span>
                <div className="h-9 w-px bg-white/20" />
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
                    {currentItem.label}
                  </p>
                  <p className="mt-1 text-xs text-white/35">
                    {media.durationMinutes} · Live channel
                  </p>
                </div>
              </div>
              <h3
                className="text-5xl font-black uppercase leading-[0.88] tracking-[-0.02em] text-white sm:text-7xl"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                {media.title}
              </h3>
              <div className="mt-7 flex items-center gap-3">
                <button className="flex items-center gap-2 rounded-full bg-white px-5 py-3 text-xs font-black uppercase tracking-wider text-black transition-transform hover:scale-105">
                  <Play size={13} fill="currentColor" /> Watch live
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="flex-2 flex flex-col gap-2 h-full bg-foreground/5 border border-foreground/10 rounded-3xl p-4">
        <h2 className="h-full">New Section</h2>
      </div>
    </div>
  );
};
