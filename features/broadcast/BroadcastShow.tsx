"use client";

import Image from "next/image";
import { Play } from "lucide-react";
import {
  use,
  memo,
  useRef,
  useMemo,
  useState,
  useCallback,
  type KeyboardEvent,
} from "react";

import { BroadcastsData } from "@/data/broadcast";
import { useBroadcast } from "@/store/useBroadcast";
import { formatDuration } from "../hero/HeroContent";

type BroadcastItem = BroadcastsData[number];

const getMedia = (item: BroadcastItem) =>
  item?.type === "Movie" ? item?.movie : item?.serial;

type PanelProps = {
  item: BroadcastItem;
  index: number;
  total: number;
  isActive: boolean;
  onSelect: (index: number) => void;
};

const Panel = memo(function Panel({
  item,
  index,
  total,
  isActive,
  onSelect,
}: PanelProps) {
  const media = getMedia(item);
  if (!media) return null;

  return (
    <li
      className={`relative min-h-0 min-w-0 basis-0 transition-[flex-grow] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] contain-[layout_paint] motion-reduce:transition-none ${
        isActive ? "grow-6" : "grow"
      }`}
    >
      <button
        type="button"
        aria-current={isActive}
        aria-label={`${item?.time} ${media.title}`}
        onClick={() => onSelect(index)}
        onFocus={() => onSelect(index)}
        className="group absolute inset-0 overflow-hidden rounded-3xl border border-foreground/10 bg-neutral-950 text-left outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        {/* ===== Fixed-size layer: never reflows while the panel animates ===== */}
        <div className="absolute left-0 top-0 w-full h-[calc((100cqh-(var(--n)-1)*0.5rem)*6/(var(--n)+5))] lg:h-full lg:w-[calc((100cqw-(var(--n)-1)*0.5rem)*6/(var(--n)+5))]">
          {media.backdrop && (
            <Image
              src={media.backdrop}
              alt=""
              fill
              sizes="(min-width: 1024px) 60vw, 100vw"
              priority={index === 0}
              className="object-cover"
            />
          )}

          {/* expanded gradient */}
          <div
            aria-hidden
            className="absolute inset-0 bg-linear-to-t from-black via-black/30 to-transparent"
          />

          {/* expanded content: always mounted, only opacity changes */}
          <div
            className={`absolute inset-0 flex flex-col justify-between p-5 sm:p-8 transition-opacity duration-300 motion-reduce:transition-none ${
              isActive
                ? "opacity-100 delay-200"
                : "pointer-events-none opacity-0"
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2 rounded-full border border-white/15 bg-black/50 px-3.5 py-2">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60 motion-reduce:animate-none" />
                  <span className="relative inline-flex size-2 rounded-full bg-primary" />
                </span>
                <span className="text-[10px] font-black uppercase tracking-[0.16em] text-white">
                  Featured tonight
                </span>
              </div>

              <span className="text-xs font-bold tabular-nums text-white/60">
                {String(index + 1).padStart(2, "0")} /{" "}
                {String(total).padStart(2, "0")}
              </span>
            </div>

            <div className="max-w-xl">
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-primary px-3 py-1 text-xs font-black tabular-nums text-primary-foreground">
                  {item?.time}
                </span>
                <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white">
                  {item?.type === "Movie"
                    ? item?.movie?.recognition
                    : item?.serial?.badge}
                </span>
                <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white/70">
                  {item?.type}
                </span>
              </div>

              <h3 className="text-balance text-4xl font-black uppercase leading-[0.92] tracking-[-0.02em] text-white sm:text-6xl">
                {media.title}
              </h3>

              <div className="mt-6 flex items-center gap-4">
                <span
                  aria-hidden
                  className="flex items-center gap-2 rounded-full bg-white px-5 py-3 text-xs font-black uppercase tracking-wider text-black"
                >
                  <Play size={13} fill="currentColor" /> Watch live
                </span>
                {media.durationMinutes && (
                  <span className="text-xs text-white/60">
                    {formatDuration(media.durationMinutes)}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ===== Collapsed overlay: dims the image + shows the strip label ===== */}
        <div
          aria-hidden
          className={`absolute inset-0 bg-black/60 transition-opacity duration-300 motion-reduce:transition-none ${
            isActive ? "opacity-0" : "opacity-100 group-hover:bg-black/40"
          }`}
        >
          <div className="absolute inset-0 flex items-center justify-between gap-3 p-4 lg:flex-col lg:py-6">
            <span className="text-xs font-bold tabular-nums text-white/50">
              {String(index + 1).padStart(2, "0")}
            </span>

            <div className="flex min-w-0 flex-1 items-center gap-3 lg:flex-none lg:flex-col lg:gap-4">
              <span className="text-lg font-black tabular-nums text-white lg:[writing-mode:vertical-rl] lg:rotate-180">
                {item?.time}
              </span>
              <span className="hidden max-h-40 truncate text-[11px] font-semibold uppercase tracking-[0.2em] text-white/60 lg:block lg:[writing-mode:vertical-rl] lg:rotate-180">
                {media.title}
              </span>
              <span className="truncate text-sm font-semibold text-white/80 lg:hidden">
                {media.title}
              </span>
            </div>

            <Play
              size={14}
              fill="currentColor"
              className="shrink-0 text-white/60"
            />
          </div>
        </div>
      </button>
    </li>
  );
});

/* ---------------------------------- Main ---------------------------------- */

export const BroadcastShow = ({ data }: { data: Promise<BroadcastsData> }) => {
  const allBroadcasts = use(data);
  const day = useBroadcast((state) => state.day);
  const listRef = useRef<HTMLUListElement>(null);

  const broadcasts = useMemo(
    () => allBroadcasts.filter((item) => item?.days?.includes(day)),
    [allBroadcasts, day],
  );

  // Selection is bound to `day`: when the day changes it falls back to 0 (no useEffect)
  const [selection, setSelection] = useState({ day, index: 0 });
  const activeIndex =
    selection.day === day && selection.index < broadcasts.length
      ? selection.index
      : 0;

  const handleSelect = useCallback(
    (index: number) => setSelection({ day, index }),
    [day],
  );

  // Arrow-key navigation: move focus, and onFocus selects the panel
  const handleKeyDown = (e: KeyboardEvent<HTMLUListElement>) => {
    const forward = e.key === "ArrowRight" || e.key === "ArrowDown";
    const backward = e.key === "ArrowLeft" || e.key === "ArrowUp";
    if (!forward && !backward) return;

    e.preventDefault();
    const next = Math.min(
      Math.max(activeIndex + (forward ? 1 : -1), 0),
      broadcasts.length - 1,
    );
    listRef.current
      ?.querySelectorAll<HTMLButtonElement>("button")
      [next]?.focus();
  };

  return (
    <section aria-label="Tonight's broadcast" className="w-full">
      <ul
        ref={listRef}
        onKeyDown={handleKeyDown}
        style={{ "--n": broadcasts.length } as React.CSSProperties}
        className="flex h-144 flex-col gap-2 @container-size lg:h-136 lg:flex-row"
      >
        {broadcasts.map((item, i) => (
          <Panel
            key={`${item?.time}-${i}`}
            item={item}
            index={i}
            total={broadcasts.length}
            isActive={i === activeIndex}
            onSelect={handleSelect}
          />
        ))}
      </ul>
    </section>
  );
};
