import { use } from "react";

interface HeroSearchResultProps {
  searchParams: Promise<{
    search?: string;
    genre?: string;
    rating?: string;
    year?: string;
  }>;
}

export const HeroSearchResult = ({ searchParams }: HeroSearchResultProps) => {
  const { search } = use(searchParams);
  return <>{search && search}</>;
};
