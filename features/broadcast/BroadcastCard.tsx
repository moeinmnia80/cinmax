import Image from "next/image";
import Link from "next/link";

import { formatDuration } from "../hero/HeroContent";
import type { BroadcastsData } from "@/data/broadcast";

export type Broadcast = NonNullable<BroadcastsData[number]>;

export const BroadcastCard = ({
  item,
  index,
}: {
  item: Broadcast;
  index: number;
}) => {
  const isMovie = item.type === "Movie";
  const media = isMovie ? item.movie : item.serial;
  if (!media) return null;

  const year = isMovie ? item.movie?.year : item.serial?.startYear;
  const meta = [
    item.type,
    year,
    media.durationMinutes && formatDuration(media.durationMinutes),
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <Link
      href={`/${item.type.toLowerCase()}/${media.slug}`}
      className="group relative w-full min-w-full shrink-0 snap-center overflow-hidden rounded-2xl border border-foreground/10 sm:w-52 sm:min-w-0 sm:snap-start md:w-56 motion-safe:animate-slide-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
    >
      <div className="relative aspect-2/3">
        {media.image && (
          <Image
            src={media.image}
            alt={media.title}
            fill
            sizes="(min-width: 768px) 224px, (min-width: 640px) 208px, 100vw"
            priority={index < 3}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
        <div className="absolute inset-0 bg-linear-to-t from-background via-background/30 to-transparent" />

        <span className="absolute top-2 right-2 rounded-full border border-foreground/10 bg-background/40 px-3 py-1 text-xs font-semibold uppercase backdrop-blur-sm">
          {item.time}
        </span>

        <div className="absolute inset-x-3 bottom-3">
          <h2 className="line-clamp-2 font-bold capitalize leading-tight">
            {media.title}
          </h2>
          <p className="mt-1 text-xs text-foreground/70">{meta}</p>
        </div>
      </div>
    </Link>
  );
};
