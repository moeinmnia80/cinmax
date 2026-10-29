"use client";

import { use } from "react";
import Link from "next/link";
import Image from "next/image";
import { Disc3, Play } from "lucide-react";

import { useHeroSlide } from "@/store/useHeroSlide";
import { DashboardFeatured } from "@/data/dashboard";
import { getKey, getMedia, getYear } from "@/utils";

interface HeroContentProps {
  data: Promise<DashboardFeatured[]>;
}

const formatDuration = (minutes: number) => {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return [h > 0 && `${h}h`, m > 0 && `${m}m`].filter(Boolean).join(" ");
};

export const HeroContent = ({ data }: HeroContentProps) => {
  const featuredContent = use(data);

  const current = useHeroSlide((state) => state.current);

  const item = featuredContent[current];
  if (!item) return null;

  const media = getMedia(item);
  const year = getYear(item);

  return (
    <div className="flex-1 relative z-10 flex flex-col h-full w-full py-10 lg:flex-row items-start lg:items-center gap-10 lg:gap-0">
      <div className="flex-1 flex flex-col justify-center max-w-175">
        <div className="flex items-center gap-3 mb-5 flex-wrap">
          <span className="bg-yellow-400 text-black text-xs font-black px-2 py-0.5 rounded-sm tracking-wide">
            IMDb
          </span>
          <span className="text-yellow-400 font-bold text-sm">
            {media?.rating}
            <span className="text-foreground/40 font-normal mx-1">/</span>
            <span className="text-foreground/40 font-normal">10</span>
          </span>
          <span className="text-foreground/25">|</span>
          <span className="text-foreground/70 text-sm tracking-widest uppercase font-semibold">
            {media?.genres.map((item) => item.genre.name).join(" - ")}
          </span>
          <span className="text-foreground/25">|</span>
          <span className="text-foreground/70 text-sm tracking-widest uppercase font-semibold">
            {media?.language.name}
          </span>
        </div>
        <h1 className="text-[clamp(3rem,7vw,7rem)] font-black leading-none uppercase text-foreground mb-6">
          {media?.title}
          <span className="text-destructive text-5xl">.</span>
        </h1>
        <p className="text-foreground/55 text-[0.85rem] max-w-130 mb-8 font-light line-clamp-3">
          {media?.description}
        </p>
        <div className="flex items-center gap-4 flex-wrap">
          <Link
            href={`/${item?.type.toLowerCase()}/${media?.slug}`}
            className="flex items-center gap-2.5 bg-destructive hover:bg-red-600 text-foreground font-bold px-7 py-3.5 rounded-full transition-all duration-200 active:scale-95 shadow-lg shadow-red-900/40 text-sm tracking-wide uppercase hover:opacity-50"
          >
            <Play size={16} fill="white" /> Watch Now
          </Link>
          {Boolean(media?.purchasePrice) && (
            <button className="flex items-center gap-2.5 border border-foreground/40 hover:border-foreground/80 hover:bg-foreground/5 text-foreground/80 hover:text-foreground font-semibold px-7 py-3.5 rounded-full transition-all duration-200 text-sm tracking-wide uppercase cursor-pointer">
              <Disc3 size={15} /> ${media?.purchasePrice} Blu-ray
            </button>
          )}
        </div>
      </div>
      <div className="relative ml-auto hidden lg:inline-block">
        <Link
          href={`/${item.type.toLowerCase()}/${media.slug}`}
          className="group relative block aspect-2/3 w-60 overflow-hidden rounded-xl border border-foreground/10 shadow-2xl shadow-black/80 xl:w-70"
        >
          {featuredContent.map((it, i) => {
            const m = getMedia(it);
            const active = i === current;
            return (
              <Image
                key={getKey(it)}
                src={m.image}
                alt={active ? `${m.title} poster` : ""}
                aria-hidden={!active}
                fill
                sizes="(min-width: 1280px) 280px, 240px"
                priority={i === 0}
                className={`object-cover transition-[opacity,transform, scale] duration-700 group-hover:scale-110 motion-reduce:transition-none ${
                  active ? "opacity-100" : "opacity-0"
                }`}
              />
            );
          })}

          <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
          <div className="absolute inset-x-3 bottom-3 flex items-center justify-between">
            <span className="text-xs font-light text-foreground/60">
              {year}
            </span>
            <span className="text-xs font-light text-foreground/60">
              {formatDuration(media.durationMinutes)}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
};
