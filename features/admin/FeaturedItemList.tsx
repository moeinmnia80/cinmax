"use client";
import { use, useOptimistic, useState, useTransition } from "react";

import { getKey, getMedia } from "@/utils";
import { Search } from "@/components/Search";
import { useSlider } from "@/hooks/useSlider";
import { Navigation } from "./FeatureNavigation";
import { FeaturedSlider } from "./FeaturedSlider";
import { addFeaturedItem } from "@/app/actions/feature";
import { useFeaturedSearch } from "@/hooks/useFeaturedSearch";
import { FeaturedSearchResults } from "./FeaturedSearchResults";
import type { DashboardFeatured } from "@/data/dashboard";

interface FeaturedItemsListProps {
  data: Promise<DashboardFeatured[]>;
}

export function FeaturedItemList({ data }: FeaturedItemsListProps) {
  const serverItems = use(data);

  const [items, addOptimisticItem] = useOptimistic(
    serverItems,
    (state, item: DashboardFeatured) => [...state, item],
  );

  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const { showResults, results, isFetching, clearSearch } = useFeaturedSearch();
  const { sliderRef, current, handleScroll, scrollTo, scrollOnNextRender } =
    useSlider(items.length);

  const addedKeys = new Set(items.map(getKey));

  const handleAdd = (media: DashboardFeatured) => {
    if (addedKeys.has(getKey(media))) return;

    setError(null);
    scrollOnNextRender(items.length);

    startTransition(async () => {
      addOptimisticItem({
        ...media,
        id: -1,
        order: items.length,
        active: true,
      });

      const result = await addFeaturedItem({
        type: media.type,
        id: getMedia(media).id,
      });

      if (result.success) clearSearch();
      else setError(result.message);
    });
  };

  return (
    <div className="relative col-span-1 row-span-2 overflow-hidden rounded-2xl border border-foreground/20 bg-foreground/5">
      <div className="pointer-events-none absolute inset-x-0 top-0 z-30 px-4 py-5">
        <div className="pointer-events-auto">
          <Search variant="lighter" size="lg" />

          {showResults && (
            <FeaturedSearchResults
              results={results}
              addedKeys={addedKeys}
              isLoading={isFetching}
              disabled={isPending}
              error={error}
              onAdd={handleAdd}
            />
          )}
        </div>
      </div>

      <FeaturedSlider
        items={items}
        sliderRef={sliderRef}
        onScroll={handleScroll}
      />

      <Navigation length={items.length} current={current} onChange={scrollTo} />
    </div>
  );
}
