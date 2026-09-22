"use client";

import { use } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Divide } from "lucide-react";

import { useHeroSlide } from "@/store/useHeroSlide";
import { FeaturedItems } from "@/components/features/Hero";

export const CrewStrip = ({
  params,
}: {
  params: Promise<{ data: FeaturedItems[] }>;
}) => {
  const { data } = use(params);

  const prev = () =>
    setCurrent(() => (current - 1 + data.length) % data.length);
  const next = () => setCurrent(() => (current + 1) % data.length);

  const current = useHeroSlide((state) => state.current);
  const setCurrent = useHeroSlide((state) => state.setCurrent);
  const movie = data[current];

  return (
    <div className="flex flex-col md:flex-row justify-center md:justify-between relative z-10 border-t border-white/10 py-5 items-center gap-6">
      <div className="w-full">
        <div className="flex items-center gap-6 overflow-auto">
          {movie.crew.map((member, i) => (
            <div key={i} className="flex items-center gap-2.5 shrink-0">
              {member.person.image ? (
                <Image
                  preload
                  width={200}
                  height={200}
                  alt={member.person.name}
                  src={member.person.image}
                  loading="eager"
                  className="w-9 h-9 rounded-full object-cover border border-white/15"
                />
              ) : (
                <div className="w-9 h-9 bg-gray-200/20 rounded-full object-cover border border-white/15" />
              )}
              <div>
                <p className="text-[10px] text-primary font-semibold uppercase tracking-wider leading-none mb-0.5">
                  {member.role}
                </p>
                <p className="text-white/80 text-xs font-medium">
                  {member.person.name}
                </p>
              </div>
              {i < movie.crew.length - 1 && (
                <span className="ml-4 text-white/15 text-sm hidden sm:block">
                  |
                </span>
              )}
            </div>
          ))}
          {movie.cast.map((member, i) => (
            <div key={i} className="flex items-center gap-2.5 shrink-0">
              {member.person.image ? (
                <Image
                  preload
                  width={200}
                  height={200}
                  loading="eager"
                  src={member.person.image}
                  alt={member.person.name}
                  className="w-9 h-9 rounded-full object-cover border border-white/15"
                />
              ) : (
                <div className="w-9 h-9 bg-gray-200/20 rounded-full object-cover border border-white/15" />
              )}

              <div>
                <p className="text-[10px] text-primary font-semibold uppercase tracking-wider leading-none mb-0.5">
                  {member.role}
                </p>
                <p className="text-white/80 text-xs font-medium">
                  {member.person.name}
                </p>
              </div>
              {i < movie.crew.length - 1 && (
                <span className="ml-4 text-white/15 text-sm hidden sm:block">
                  |
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-4 text-sm text-white/50">
        <button
          onClick={prev}
          className="flex items-center gap-1.5 hover:text-white transition-colors group"
        >
          <ChevronLeft
            size={16}
            className="group-hover:-translate-x-0.5 transition-transform"
          />{" "}
          Previous
        </button>
        <div className="flex gap-1.5">
          {(data || []).map((_, i) => (
            <span
              key={i}
              onClick={() => setCurrent(() => i)}
              className={`h-0.5 rounded-full cursor-pointer transition-all ${i === current ? "bg-primary w-8" : "bg-white/25 hover:bg-white/50 w-5"}`}
            />
          ))}
        </div>
        <button
          onClick={next}
          className="flex items-center gap-1.5 hover:text-white transition-colors group"
        >
          Next{" "}
          <ChevronRight
            size={16}
            className="group-hover:translate-x-0.5 transition-transform"
          />
        </button>
      </div>
    </div>
  );
};
