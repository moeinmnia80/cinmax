import { use } from "react";
import Link from "next/link";
import Image from "next/image";
import { Reveal } from "@moeinmnia/motion/react";

import { MovieType } from "@/data/movies";

export const MovieList = ({ data }: { data: Promise<MovieType[]> }) => {
  const movies = use(data);
  return (
    <div className="flex items-center gap-3 mt-5 overflow-x-auto pb-2">
      {movies.map((movie, index) => (
        <Reveal key={movie.id} variant="left" delay={500 * index}>
          <Link
            href={`/movie/${movie.slug}`}
            prefetch={false}
            className="group flex flex-col gap-2 shrink-0 w-40 md:w-60 overflow-hidden rounded-2xl border border-foreground/10"
          >
            <div className="relative aspect-2/3 w-full">
              {movie.image && (
                <Image
                  src={movie.image}
                  alt={movie.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 351px"
                  priority
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              )}
            </div>
          </Link>
        </Reveal>
      ))}
    </div>
  );
};
