import { getMovie } from "@/data/movies";
import { EditMovieForm } from "@/features/client";

interface EditMoviesProps {
  searchParams: Promise<{ edit?: string }>;
}

export const EditMovies = async ({ searchParams }: EditMoviesProps) => {
  const { edit } = await searchParams;
  const movie = await getMovie(edit);
  return (
    <>
      {edit && (
        <div
          data-scroll-lock
          role="dialog"
          aria-modal="true"
          aria-label="Edit movie"
          className="fixed inset-0 mt-14 sm:mt-0 z-50 overflow-y-auto overscroll-contain bg-background/40"
        >
          <div className="mx-auto min-h-full w-full max-w-3xl p-3 sm:p-6">
            <div className="animate-slide-left rounded-xl border border-foreground/10 bg-background/65 p-4 backdrop-blur-2xl">
              <h2>{movie ? "Edit movie" : "New movie"}</h2>
              <p className="text-sm uppercase text-foreground/30">
                {movie ? edit : "unsaved draft"}
              </p>
              <EditMovieForm edit={edit} movie={movie} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
