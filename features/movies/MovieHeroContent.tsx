import { Calendar, Clock, Languages } from "lucide-react";
import { Reveal, Typewriter } from "@moeinmnia/motion/react";

import { formatDuration } from "@/utils";
import { MovieType } from "@/data/movies";

interface Props {
  movie: MovieType | null;
}

export const MovieHeroContent = ({ movie }: Props) => {
  return (
    <div className="flex flex-col justify-start">
      <div className="flex items-center gap-1.5">
        {movie?.genres?.map(({ genre }, index) => (
          <Reveal key={genre.id} variant="down" delay={100 * index * 2}>
            <span className="text-sm text-destructive uppercase px-3 py-0.5 bg-destructive/20 border border-destructive/50 rounded-full">
              {genre.name}
            </span>
          </Reveal>
        ))}
        <span className="text-foreground/20">·</span>
        <Reveal variant="blur">
          <span className="uppercase text-foreground/20">
            {movie?.country?.name}
          </span>
        </Reveal>
      </div>
      <div>
        <h2 className="text-2xl sm:text-4xl lg:text-7xl font-black uppercase">
          <Typewriter speed={35} delay={800} caret={false}>
            {`${movie?.title}`}
          </Typewriter>
          <Reveal variant="fade" delay={1600} className="inline-flex">
            <span className="text-destructive">.</span>
          </Reveal>
        </h2>
        <Reveal variant="clip-up" delay={1900}>
          <p className="line-clamp-1 text-foreground/80">
            {movie?.description}
          </p>
        </Reveal>
        <div className="flex items-center gap-4">
          <Reveal variant="left" delay={2300}>
            <div className="flex items-center gap-2 text-md text-foreground/70">
              <Calendar size={15} /> {movie?.year}
            </div>
          </Reveal>
          <Reveal variant="left" delay={2200}>
            <div className="flex items-center gap-2 text-md text-foreground/70">
              <Clock size={15} /> {formatDuration(movie?.durationMinutes ?? 0)}
            </div>
          </Reveal>
          <Reveal variant="left" delay={2100}>
            <div className="flex items-center gap-2 text-md text-foreground/70">
              <Languages size={15} /> {movie?.language?.name}
            </div>
          </Reveal>
          <Reveal variant="left" delay={2000}>
            <div className="flex items-center gap-2 text-md text-foreground/70">
              <span className="text-xs font-bold uppercase bg-yellow-400 text-background px-2 rounded-md">
                imdb
              </span>
              <span className="text-foreground/40">
                {movie?.rating}
                <span className="text-foreground/40 ml-1">/ 10</span>
              </span>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
};
