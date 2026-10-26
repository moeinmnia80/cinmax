"use client";
import Image from "next/image";
import { use, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

import { Navigation } from "./FeatureNavigation";
import { DashboardFeatured } from "@/data/dashboard";
import { Search } from "@/components/Search";
import { getData } from "@/lib/axios";
import { Movie, Serial } from "@/types/types";

interface FeaturedItemsListProps {
  data: Promise<DashboardFeatured[]>;
}
export function FeaturedItemList({ data }: FeaturedItemsListProps) {
  const featureItems = use(data);

  const searchParams = useSearchParams();
  const search = searchParams.get("search");

  // TODO: write route
  const { data: content, isFetching } = useQuery<{
    success: boolean;
    persons: Movie | Serial;
  }>({
    queryKey: ["persons", search],
    queryFn: () => getData("/api", { params: { search } }),
    enabled: !!search,
    refetchOnWindowFocus: false,
  });

  const [current, setCurrent] = useState(0);
  const length = featureItems?.length ?? 0;

  const sliderRef = useRef<HTMLDivElement | null>(null);
  const scrollTo = (index: number) => {
    const container = sliderRef.current;
    if (!container) return;

    const itemWidth = container.scrollWidth / length;
    container.scrollTo({ left: itemWidth * index, behavior: "smooth" });
    setCurrent(index);
  };

  return (
    <div className="col-span-1 row-span-2 relative overflow-hidden bg-foreground/5 border border-foreground/20 rounded-2xl">
      <div className="absolute top-0 left-0 right-0 z-30 px-4 py-5">
        <Search variant="lighter" size="lg" />
      </div>
      <div className="flex overflow-scroll" ref={sliderRef}>
        {featureItems.map((item) => {
          const data = item?.type === "Movie" ? item.movie : item?.serial;
          return (
            <div key={data?.id} className="relative shrink-0 w-full">
              {data?.image ? (
                <div className="aspect-2/3">
                  <Image
                    src={data?.image}
                    alt={data.title}
                    width={200}
                    height={200}
                    className="size-full object-cover"
                    loading="eager"
                    priority
                  />
                </div>
              ) : (
                <span />
              )}
            </div>
          );
        })}
      </div>

      <Navigation length={length} current={current} onChange={scrollTo} />
    </div>
  );
}
