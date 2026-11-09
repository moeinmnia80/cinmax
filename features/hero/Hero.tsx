import "server-only";
import { Suspense } from "react";

import { Search } from "@/components/Search";
import { getFeaturedItems } from "@/data/dashboard";
import { HeroSearchResult } from "./HeroSearchResult";

import {
  CrewStrip,
  HeroContent,
  HeroBackground,
  HeroNavActions,
} from "@/features/client";
import {
  Logo,
  CrewStripSkeleton,
  HeroContentSkeleton,
  HeroBackgroundSkeleton,
  Container,
} from "@/features/server";

interface HeroProps {
  searchParams: Promise<{ search?: string }>;
}

export const Hero = ({ searchParams }: HeroProps) => {
  const featuredMovies = getFeaturedItems();
  return (
    <div className="flex flex-col w-full">
      <Container className="flex flex-col w-full min-h-dvh">
        <Suspense fallback={<HeroBackgroundSkeleton />}>
          <HeroBackground data={featuredMovies} />
        </Suspense>
        <nav className="z-20 flex items-center justify-between py-7 gap-4 w-full">
          <Logo />
          <div className="relative flex flex-col items-center">
            <Suspense fallback={<></>}>
              <Search className="relative z-60 max-w-lg" />
            </Suspense>
            <Suspense fallback={<></>}>
              <HeroSearchResult searchParams={searchParams} />
            </Suspense>
          </div>

          <HeroNavActions />
        </nav>
        <Suspense fallback={<HeroContentSkeleton />}>
          <HeroContent data={featuredMovies} />
        </Suspense>
        <Suspense fallback={<CrewStripSkeleton />}>
          <CrewStrip data={featuredMovies} />
        </Suspense>
      </Container>
    </div>
  );
};
