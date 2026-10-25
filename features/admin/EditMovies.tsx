import { Suspense } from "react";

import { getMovie } from "@/data/movies";
import { EditMovieForm } from "@/features/client";
import { EditFormSkeleton, EditFormLoader } from "@/features/server";

interface EditMoviesProps {
  searchParams: Promise<{ edit?: string }>;
}

export const EditMovies = ({ searchParams }: EditMoviesProps) => {
  return (
    <div className="flex-2 animate-slide-left">
      <div className="rounded-md border border-foreground/10 bg-foreground/5 p-4">
        <h2>Edit Movies</h2>
        <Suspense fallback={<EditFormSkeleton />}>
          <EditFormLoader
            searchParams={searchParams}
            fetcher={getMovie}
            dataProp="movie"
            Form={EditMovieForm}
          />
        </Suspense>
      </div>
    </div>
  );
};
