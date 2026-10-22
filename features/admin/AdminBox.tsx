import "server-only";
import { Suspense } from "react";

import {
  MovieList,
  SerialList,
  AdminBoxSkeleton,
  FeaturedItemsList,
} from "@/features/server";
import {
  getLastMovies,
  getLastSerials,
  getFeaturedItems,
} from "@/data/dashboard";

export const AdminBox = () => {
  const movies = getLastMovies();
  const serials = getLastSerials();
  const featuredItems = getFeaturedItems();
  return (
    <>
      <Suspense fallback={<AdminBoxSkeleton />}>
        <MovieList data={movies} />
      </Suspense>
      <Suspense fallback={<AdminBoxSkeleton />}>
        <SerialList data={serials} />
      </Suspense>
      <Suspense fallback={<AdminBoxSkeleton />}>
        <FeaturedItemsList data={featuredItems} />
      </Suspense>
    </>
  );
};
