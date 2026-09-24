"use client";

import { use } from "react";
import Image from "next/image";

import { FeaturedItem } from "@/features/server";
import { useHeroSlide } from "@/store/useHeroSlide";

interface HeroBackgroundProps {
  data: Promise<FeaturedItem[]>;
}

export const HeroBackground = ({ data }: HeroBackgroundProps) => {
  const featuredContent = use(data);

  const current = useHeroSlide((state) => state.current);
  const movie = featuredContent[current];

  return (
    <div className="absolute left-0 top-0 w-full h-dvh overflow-hidden">
      <Image
        priority
        alt={movie.title || "hero banner"}
        width={1920}
        height={1080}
        src={movie.backdrop}
        className="w-full h-full object-cover transition-all duration-700 object-[70%]"
      />

      <div className="absolute inset-0 bg-linear-to-r from-black/90 via-black/60 to-black/30" />
      <div className="absolute inset-0 bg-linear-to-r from-black/95 via-transparent to-black/30" />
    </div>
  );
};
