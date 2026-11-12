import { Suspense, useId } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { ScrollFill, Typewriter } from "@moeinmnia/motion/react";

import { Container } from "@/features/server";
import { getMovies } from "@/data/movies";
import { MovieList } from "./MovieList";

export const Movies = () => {
  const id = useId();
  const movies = getMovies({ limit: 10 });
  return (
    <section
      aria-labelledby={id}
      className="relative gap-4 w-full border-t border-foreground/5"
    >
      <span className="absolute top-20 left-20 -z-10 block size-95 bg-destructive blur-3xl rounded-full opacity-20" />
      <Container className="flex flex-col justify-center bg-foreground/5  min-h-dvh backdrop-blur-lg">
        <div className="flex items-center justify-between">
          <div>
            <div className="uppercase text-destructive">
              <span className="">—</span>
              <Typewriter
                speed={15}
                delay={400}
                caret={false}
                className="text-lg font-semibold tracking-wider ms-1"
              >
                new releases
              </Typewriter>
            </div>
            <ScrollFill
              as="h2"
              id={id}
              className="text-5xl font-black uppercase"
            >
              movies
            </ScrollFill>
          </div>
          <Link
            href="/movies"
            prefetch={false}
            className="flex items-center gap-1 text-foreground/30 tracking-wider capitalize"
          >
            view all
            <ChevronRight size={15} />
          </Link>
        </div>
        <Suspense fallback={<></>}>
          <MovieList data={movies} />
        </Suspense>
      </Container>
    </section>
  );
};
