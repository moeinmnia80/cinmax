import { Disc3, Play } from "lucide-react";

export const HeroContentLoading = () => {
  return (
    <div className="relative z-10 flex flex-1 items-center h-full py-10">
      <div className="w-full flex flex-col lg:flex-row items-start lg:items-center gap-10 lg:gap-0">
        <div className="flex-1 max-w-175">
          <div className="flex items-center gap-3 mb-5 flex-wrap">
            <span className="bg-yellow-400 text-black text-xs font-black px-2 py-0.5 rounded-sm tracking-wide">
              IMDb
            </span>
            <span className="flex items-center text-yellow-400 font-bold text-sm">
              <span className="inline-block w-4 h-4 rounded-sm bg-gray-200/20 animate-pulse mr-1" />
              <span className="text-white/40 font-normal">/ 10</span>
            </span>
            <span className="text-white/25">|</span>
            <span className="inline-block w-12 h-4 rounded-sm bg-gray-200/20 animate-pulse mr-1" />
            <span className="text-white/25">|</span>
            <span className="flex items-center">
              <span className="inline-block w-12 h-4 rounded-sm bg-gray-200/20 animate-pulse" />
              <span className="mx-1">-</span>
              <span className="inline-block w-12 h-4 rounded-sm bg-gray-200/20 animate-pulse mr-1" />
            </span>
          </div>
          <h1 className="flex flex-col gap-2 mb-6">
            <div className="inline-block w-[90vw] lg:w-160 xl:w-130 h-13 sm:h-0 xl:h-27 rounded-xl bg-gray-200/20 animate-pulse" />
            <div className="inline-block w-[80vw] lg:w-80 xl:w-110 h-13 xl:h-27 rounded-xl bg-gray-200/20 animate-pulse" />
          </h1>
          <p className="flex flex-col gap-1">
            <div className="inline-block w-[90vw] lg:w-160 xl:w-130 h-4 rounded-xl bg-gray-200/20 animate-pulse" />
            <div className="inline-block w-[90vw] lg:w-160 xl:w-130 h-4 rounded-xl bg-gray-200/20 animate-pulse" />
            <div className="inline-block w-[80vw] lg:w-80 xl:w-110 h-4 rounded-xl bg-gray-200/20 animate-pulse" />
          </p>
          <div className="flex items-center gap-4 flex-wrap mt-8">
            <div className="flex items-center gap-2.5 bg-primary hover:bg-red-600 text-white font-bold px-7 py-3.5 rounded-full transition-all duration-200 active:scale-95 shadow-lg shadow-red-900/40 text-sm tracking-wide uppercase">
              <Play size={16} fill="white" /> Watch Now
            </div>
            <button className="flex items-center gap-2.5 border border-white/40 hover:border-white/80 hover:bg-white/5 text-white/80 hover:text-white font-semibold px-7 py-3.5 rounded-full transition-all duration-200 text-sm tracking-wide uppercase cursor-pointer">
              <Disc3 size={15} />{" "}
              <span className="inline-block w-4 h-4 rounded-sm bg-gray-200/20 animate-pulse" />{" "}
              Blu-ray
            </button>
          </div>
        </div>
        <div className="hidden lg:inline-block relative ml-auto">
          <div className="inline-block relative w-60 xl:w-70 aspect-3/4 rounded-xl overflow-hidden shadow-2xl shadow-black/80 border border-white/10 group cursor-pointer">
            <div className="size-full aspect-2/3 object-cover bg-gray-200/20 animate-pulse" />
            <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
              <span className="inline-block w-10 h-3 rounded-sm bg-gray-200/20 animate-pulse" />

              <span className="inline-block w-10 h-3 rounded-sm bg-gray-200/20 animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
