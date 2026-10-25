import { Suspense } from "react";

import { getMovieCards, getMovies } from "@/data/movies";
import { MovieHeader } from "@/features/admin/MovieHeader";
import { AdminCard, EditMovies, AdminCardSkeleton } from "@/features/server";

export default function MoviePage({
  searchParams,
}: {
  searchParams: Promise<{ search?: "string"; edit?: "string" }>;
}) {
  const movies = getMovies();
  return (
    <>
      <Suspense fallback={<></>}>
        <MovieHeader data={movies} />
      </Suspense>
      <div className="flex px-5 py-5">
        <div className="flex-5 flex flex-col gap-4">
          <Suspense fallback={<AdminCardSkeleton />}>
            <AdminCard key="movieCards" fetchCards={getMovieCards} />
          </Suspense>
        </div>
        <Suspense fallback={<></>}>
          <EditMovies searchParams={searchParams} />
        </Suspense>
      </div>
    </>
  );
}
