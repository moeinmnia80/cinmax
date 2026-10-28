"use client";

import { use } from "react";
import Image from "next/image";

import { getKey, getMedia } from "@/utils";
import { useHeroSlide } from "@/store/useHeroSlide";
import type { DashboardFeatured } from "@/data/dashboard";

interface HeroBackgroundProps {
  data: Promise<DashboardFeatured[]>;
}

export const HeroBackground = ({ data }: HeroBackgroundProps) => {
  const featuredContent = use(data);
  const current = useHeroSlide((state) => state.current);

  return (
    <div className="absolute left-0 top-0 h-dvh w-full overflow-hidden">
      {featuredContent.map((item, i) => {
        const media = getMedia(item);
        const active = i === current;

        return (
          <Image
            key={getKey(item)}
            src={media.backdrop ?? media.image}
            alt={active ? media.title : ""}
            aria-hidden={!active}
            fill
            sizes="100vw"
            priority={i === 0}
            className={`object-cover object-[70%] transition-opacity duration-1000 ease-in-out motion-reduce:transition-none ${
              active ? "opacity-100" : "opacity-0"
            }`}
          />
        );
      })}

      <div className="absolute inset-0 bg-linear-to-r from-black/90 via-black/60 to-black/30" />
      <div className="absolute inset-0 bg-linear-to-r from-black/95 via-transparent to-black/30" />
    </div>
  );
};
