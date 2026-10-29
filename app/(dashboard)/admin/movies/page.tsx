import { Suspense } from "react";

import { getMovieCards, getMovies } from "@/data/movies";
import { MovieTable } from "@/features/admin/MovieTable";
import { MovieHeader } from "@/features/admin/MovieHeader";
import {
  AdminCard,
  EditMovies,
  AdminCardSkeleton,
  SerialTableSkeleton,
} from "@/features/server";

interface MoviePageProps {
  searchParams: Promise<{ search?: "string"; edit?: "string" }>;
}

export default function MoviePage({ searchParams }: MoviePageProps) {
  const movies = getMovies();
  return (
    <>
      <Suspense fallback={<></>}>
        <MovieHeader data={movies} />
      </Suspense>
      <div className="flex gap-4 px-5 py-5">
        <div className="flex-5 flex flex-col gap-4">
          <Suspense fallback={<AdminCardSkeleton />}>
            <AdminCard key="movieCards" fetchCards={getMovieCards} />
          </Suspense>
          <div className="w-full min-h-12 bg-foreground/5 rounded-md border border-foreground/10">
            <h2 className="p-3 border-b border-foreground/10 capitalize">
              all movies
            </h2>
            <Suspense fallback={<SerialTableSkeleton />}>
              <MovieTable searchParams={searchParams} />
            </Suspense>
          </div>
        </div>
        <Suspense fallback={<></>}>
          <EditMovies searchParams={searchParams} />
        </Suspense>
      </div>
    </>
  );
}
