"use client";

import { use } from "react";
import Image from "next/image";

import { useHeroSlide } from "@/store/useHeroSlide";
import { FeaturedItems } from "@/components/features/Hero";

interface HeroBackgroundProps {
  params: Promise<{ data: FeaturedItems[] }>;
}

export const HeroBackground = ({ params }: HeroBackgroundProps) => {
  const { data } = use(params);

  const current = useHeroSlide((state) => state.current);
  const movie = data[current];

  return (
    <div className="absolute left-0 top-0 w-full h-dvh overflow-hidden">
      <Image
        src={movie.backdrop}
        className="w-full h-full object-cover transition-all duration-700 object-[70%]"
        width={1920}
        height={1080}
        loading="eager"
        alt="banner"
        preload
      />

      <div className="absolute inset-0 bg-linear-to-r from-black/90 via-black/60 to-black/30" />
      <div className="absolute inset-0 bg-linear-to-r from-black/95 via-transparent to-black/30" />
    </div>
  );
};
