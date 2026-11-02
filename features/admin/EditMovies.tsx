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
        <div className="absolute top-1 left-1 w-full backdrop-blur-2xl animate-slide-left rounded-xl overflow-hidden border border-foreground/10 bg-background/65 p-4">
          <h2>Edit Movies</h2>
          <p className="text-sm uppercase text-foreground/30">
            {edit || "unsaved draft"}
          </p>
          <EditMovieForm edit={edit} movie={movie} />
        </div>
      )}
    </>
  );
};
