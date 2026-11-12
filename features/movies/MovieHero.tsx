import { use } from "react";
import { ChevronLeft, Star } from "lucide-react";

import { MovieType } from "@/data/movies";
import { Container } from "@/features/server";
import { HeroPoster } from "../shared/HeroPoster";
import { HeroBackground } from "../shared/HeroBackground";
import { MovieHeroContent } from "./MovieHeroContent";

interface Props {
  data: Promise<MovieType | null>;
}

export const MovieHero = ({ data }: Props) => {
  const movie = use(data);
  console.log("movie", movie);

  return (
    <div className="relative">
      <Container className="flex flex-col justify-center sm:justify-between min-h-dvh py-10">
        <div className="hidden sm:flex justify-between items-center">
          <div className="flex items-center gap-2 text-foreground/70 bg-background border border-foreground/10 rounded-full px-3 py-1 hover:text-foreground transition-colors duration-200">
            <ChevronLeft size={15} />
            Back
          </div>
          <div className="flex items-center text-foreground/70 bg-background border border-foreground/10 rounded-full px-3 py-1">
            <Star size={15} className="text-yellow-400 mr-2" />
            <span className="text-foreground font-bold">{movie?.rating}</span>
            <span className="mx-1">/ 10</span>
          </div>
        </div>
        <div className="flex flex-col items-center sm:flex-row gap-10">
          <HeroPoster image={movie?.image} title={movie?.title} />
          <MovieHeroContent movie={movie} />
        </div>
      </Container>
      <HeroBackground backdrop={movie?.backdrop} title={movie?.title} />
    </div>
  );
};
