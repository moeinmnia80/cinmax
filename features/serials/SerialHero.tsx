import { use } from "react";
import { ChevronLeft, Star } from "lucide-react";

import { SerialType } from "@/data/serial";
import { Container } from "@/features/server";
import { HeroPoster } from "../shared/HeroPoster";
import { SerialHeroContent } from "./SerialHeroContent";
import { HeroBackground } from "../shared/HeroBackground";

interface Props {
  data: Promise<SerialType | null>;
}

export const SerialHero = ({ data }: Props) => {
  const serial = use(data);
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
            <span className="text-foreground font-bold">{serial?.rating}</span>
            <span className="mx-1">/ 10</span>
          </div>
        </div>
        <div className="flex flex-col items-center sm:flex-row gap-10">
          <HeroPoster image={serial?.image} title={serial?.title} />
          <SerialHeroContent serial={serial} />
        </div>
      </Container>
      <HeroBackground backdrop={serial?.backdrop} title={serial?.title} />
    </div>
  );
};
