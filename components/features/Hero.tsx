import { HeroNavigation, HeroContent, HeroBackground } from "@/components";
import { FilterDrawer } from "./FilterDrawer";
import { CrewStrip } from "./CrewStrip";

export const Hero = () => {
  return (
    <div className="flex flex-col w-full min-h-dvh">
      <HeroBackground />
      <HeroNavigation />
      <FilterDrawer />
      <HeroContent />
      <CrewStrip />
    </div>
  );
};
