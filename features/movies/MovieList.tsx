import { use } from "react";
import Link from "next/link";
import Image from "next/image";
import { Reveal } from "@moeinmnia/motion/react";

import { MovieType } from "@/data/movies";
import { formatDuration } from "@/utils";

export const MovieList = ({ data }: { data: Promise<MovieType[]> }) => {
  const movies = use(data);
  return (
    <div className="flex items-center gap-3 mt-5 overflow-x-auto pb-2">
      {movies.map((movie, index) => (
        <Reveal key={movie.id} variant="left" delay={500 * index}>
          <Link
            href={`/movie/${movie.slug}`}
            prefetch={false}
            className="relative group flex flex-col gap-2 shrink-0 w-40 md:w-60 overflow-hidden rounded-2xl border border-foreground/10"
          >
            <div className="relative aspect-2/3 w-full">
              {movie.image && (
                <Image
                  src={movie.image}
                  alt={movie.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 351px"
                  loading="lazy"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              )}
            </div>
            <div className="absolute inset-0 bg-linear-to-t from-background via-background/30 to-transparent" />
            <div className="absolute bottom-0 left-0 text-sm bg-background/5 p-3">
              <h2 className=" ine-clamp-2 font-bold capitalize leading-tight">
                {movie.title}
              </h2>
              <p className="mt-1 text-xs text-foreground/70 capitalize">
                {`movie · ${movie.year} · ${formatDuration(movie.durationMinutes ?? 0)}`}
              </p>
            </div>
          </Link>
        </Reveal>
      ))}
    </div>
  );
};
