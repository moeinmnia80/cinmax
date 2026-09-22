import { Suspense } from "react";
import { notFound } from "next/navigation";

import {
  CrewStrip,
  HeroContent,
  FilterDrawer,
  HeroBackground,
  HeroNavigation,
} from "@/components";
import { HeroBackgroundLoading } from "../Loadings/HeroBackgroundLoading";
import { HeroContentLoading } from "../Loadings/HeroContentLoading";

export interface FeaturedItems {
  featuredId: number;
  type: "Serial" | "Movie";
  id: number;
  slug: string;
  title: string;
  rating: number;
  description: string;
  durationMinutes: number;
  image: string;
  backdrop: string;
  genres: string[];
  year: number;
  crew: {
    person: { name: string; image: string };
    role: string;
  }[];
  cast: {
    person: { name: string; image: string };
    role: string;
  }[];
  language: {
    name: string;
  };
}

const getFeaturedData = async () => {
  const res = await fetch(`${process.env.BASE_URL}/api`, {
    next: { revalidate: 86400 },
  });
  if (!res.ok) {
    notFound();
  }

  const data = await res.json();
  return data;
};

export const Hero = () => {
  const featuredMovies = getFeaturedData();
  return (
    <div className="flex flex-col w-full min-h-dvh">
      <Suspense fallback={<HeroBackgroundLoading />}>
        <HeroBackground params={featuredMovies} />
      </Suspense>
      <HeroNavigation />
      <FilterDrawer />
      <Suspense fallback={<HeroContentLoading />}>
        <HeroContent params={featuredMovies} />
      </Suspense>
      <Suspense>
        <CrewStrip params={featuredMovies} />
      </Suspense>
    </div>
  );
};
