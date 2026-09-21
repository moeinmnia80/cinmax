"use client";

import { use } from "react";
import Link from "next/link";
import Image from "next/image";
import { Disc3, Play } from "lucide-react";

import { useHeroSlide } from "@/store/useHeroSlide";
import { FeaturedItems } from "./Hero";

export const HeroContent = ({
  params,
}: {
  params: Promise<{ data: FeaturedItems[] }>;
}) => {
  const current = useHeroSlide((state) => state.current);

  const { data } = use(params);

  const movie = data[current];

  return (
    <div className="relative z-10 flex flex-1 items-center h-full py-10">
      <div className="w-full flex flex-col lg:flex-row items-start lg:items-center gap-10 lg:gap-0">
        <div className="flex-1 max-w-175">
          <div className="flex items-center gap-3 mb-5 flex-wrap">
            <span className="bg-yellow-400 text-black text-xs font-black px-2 py-0.5 rounded-sm tracking-wide">
              IMDb
            </span>
            <span className="text-yellow-400 font-bold text-sm">
              {movie.rating}{" "}
              <span className="text-white/40 font-normal">/ 10</span>
            </span>
            <span className="text-white/25">|</span>
            <span className="text-white/70 text-sm tracking-widest uppercase font-semibold">
              {movie.genres.join(" - ")}
            </span>
            <span className="text-white/25">|</span>
            <span className="text-white/70 text-sm tracking-widest uppercase font-semibold">
              {movie.language.name}
            </span>
          </div>
          <h1 className="text-[clamp(3rem,7vw,7rem)] font-black leading-none uppercase text-white mb-6">
            {movie.title}
            <span className="text-primary text-5xl">.</span>
          </h1>
          <p className="text-white/65 text-[0.95rem] leading-relaxed max-w-130 mb-8 font-light">
            {movie.description}
          </p>
          <div className="flex items-center gap-4 flex-wrap">
            <Link
              href={`/movie/${movie.slug}`}
              className="flex items-center gap-2.5 bg-primary hover:bg-red-600 text-white font-bold px-7 py-3.5 rounded-full transition-all duration-200 active:scale-95 shadow-lg shadow-red-900/40 text-sm tracking-wide uppercase"
            >
              <Play size={16} fill="white" /> Watch Now
            </Link>
            <button className="flex items-center gap-2.5 border border-white/40 hover:border-white/80 hover:bg-white/5 text-white/80 hover:text-white font-semibold px-7 py-3.5 rounded-full transition-all duration-200 text-sm tracking-wide uppercase cursor-pointer">
              <Disc3 size={15} /> ${23.0} Blu-ray
            </button>
          </div>
        </div>
        <div className="hidden lg:inline-block relative ml-auto">
          <Link
            href={`/movie/${movie.slug}`}
            className="inline-block relative w-60 xl:w-70 aspect-3/4 rounded-xl overflow-hidden shadow-2xl shadow-black/80 border border-white/10 group cursor-pointer"
          >
            <Image
              src={movie.image}
              alt="poster"
              width={1920}
              height={1080}
              className="size-full aspect-2/3 object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
              <span className="text-xs text-white/60 font-light">
                {movie.year}
              </span>
              <span className="text-xs text-white/60 font-light">1h 10m</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};
