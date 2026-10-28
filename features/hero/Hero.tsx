import "server-only";
import { Suspense } from "react";

import { getFeaturedItems } from "@/data/dashboard";

import {
  CrewStrip,
  HeroContent,
  FilterDrawer,
  HeroBackground,
} from "@/features/client";
import {
  HeroNavigation,
  CrewStripSkeleton,
  HeroContentSkeleton,
  HeroBackgroundSkeleton,
} from "@/features/server";

export const Hero = () => {
  const featuredMovies = getFeaturedItems();
  return (
    <div className="flex flex-col w-full min-h-dvh">
      <Suspense fallback={<HeroBackgroundSkeleton />}>
        <HeroBackground data={featuredMovies} />
      </Suspense>
      <HeroNavigation />
      <FilterDrawer />
      <Suspense fallback={<HeroContentSkeleton />}>
        <HeroContent data={featuredMovies} />
      </Suspense>
      <Suspense fallback={<CrewStripSkeleton />}>
        <CrewStrip data={featuredMovies} />
      </Suspense>
    </div>
  );
};
