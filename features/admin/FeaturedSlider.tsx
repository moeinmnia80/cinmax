import Image from "next/image";
import type { RefObject } from "react";

import { getKey, getMedia } from "@/utils";
import { DashboardFeatured } from "@/data/dashboard";

interface FeaturedSliderProps {
  items: DashboardFeatured[];
  sliderRef: RefObject<HTMLDivElement | null>;
  onScroll: () => void;
}

export function FeaturedSlider({
  items,
  sliderRef,
  onScroll,
}: FeaturedSliderProps) {
  return (
    <div
      ref={sliderRef}
      onScroll={onScroll}
      className="flex snap-x snap-mandatory overflow-x-auto overflow-y-hidden overscroll-x-contain touch-pan-x scroll-smooth"
    >
      {items.map((item, index) => {
        const media = getMedia(item);
        return (
          <div
            key={getKey(item)}
            className="relative aspect-2/3 w-full shrink-0 snap-start snap-always"
          >
            {media?.image && (
              <Image
                src={media.image}
                alt={media.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover"
                priority={index === 0}
                draggable={false}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
