import "server-only";
import { Suspense } from "react";
import { notFound } from "next/navigation";

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

export interface HeroResponse {
  success: boolean;
  data: FeaturedItem[];
}

export interface Person {
  name: string;
  image: string;
}

export interface CrewMember {
  person: Person;
  role: string;
}

export interface FeaturedItem {
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
  crew: CrewMember[];
  cast: CrewMember[];
  language: {
    name: string;
  };
}

const getFeaturedData = async (): Promise<FeaturedItem[]> => {
  try {
    const res = await fetch(`${process.env.BASE_URL}/api`, {
      next: { revalidate: 86400 },
    });

    if (!res.ok) {
      if (res.status === 404) notFound();
      throw new Error(`Failed to fetch featured data: ${res.statusText}`);
    }
    const { data }: HeroResponse = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching hero data:", error);
    notFound();
  }
};

export const Hero = () => {
  const featuredMovies = getFeaturedData();
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
