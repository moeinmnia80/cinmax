import { Logo, SearchBox, HeroNavActions } from "@/components";

export const HeroNavigation = () => {
  return (
    <nav className="z-20 flex items-center justify-between py-7 gap-4 w-full">
      <Logo />
      <SearchBox />
      <HeroNavActions />
    </nav>
  );
};
