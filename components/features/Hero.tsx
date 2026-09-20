import Image from "next/image";

import { HeroNavigation, HeroContent } from "@/components";

export const Hero = () => {
  return (
    <div className="flex flex-col w-full h-dvh">
      <div className="absolute left-0 top-0 w-full h-dvh overflow-hidden">
        <Image
          src="https://res.cloudinary.com/imsawsxo/image/upload/v1789903644/6712f815b3f85.webp"
          className="w-full h-full object-cover transition-all duration-700 object-[70%]"
          width={1920}
          height={1080}
          loading="eager"
          alt="banner"
        />

        <div className="absolute inset-0 bg-linear-to-r from-black/90 via-black/60 to-black/30" />
        <div className="absolute inset-0 bg-linear-to-r from-black/95 via-transparent to-black/30" />
      </div>
      <HeroNavigation />
      <HeroContent />
      {/* Filter drawer */}
      {/* {filterOpen && (
        <div className="relative z-20 mx-10 mb-2">
          <div className="bg-[#141414]/95 backdrop-blur-md border border-white/10 rounded-2xl p-5 shadow-2xl">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <Filter size={14} className="text-primary" />
                <span
                  className="text-white font-bold text-sm uppercase tracking-wider"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                >
                  Filter Results
                </span>
              </div>
              {activeFilterCount > 0 && (
                <button
                  onClick={() => {
                    setActiveGenres([]);
                    setActiveRating(null);
                    setActiveYear(null);
                  }}
                  className="text-primary text-xs hover:underline"
                >
                  Clear all
                </button>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <p className="text-white/40 text-[10px] uppercase tracking-widest font-semibold mb-2.5">
                  Genre
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {filterGenres.map((g) => (
                    <button
                      key={g}
                      onClick={() => toggleGenre(g)}
                      className={`text-xs px-3 py-1.5 rounded-full border transition-all ${activeGenres.includes(g) ? "bg-primary border-primary text-white" : "border-white/12 text-white/45 hover:border-white/30 hover:text-white/70"}`}
                      style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-white/40 text-[10px] uppercase tracking-widest font-semibold mb-2.5">
                  Min Rating
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {filterRatings.map((r) => (
                    <button
                      key={r}
                      onClick={() =>
                        setActiveRating(activeRating === r ? null : r)
                      }
                      className={`text-xs px-3 py-1.5 rounded-full border transition-all ${activeRating === r ? "bg-primary border-primary text-white" : "border-white/12 text-white/45 hover:border-white/30"}`}
                      style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-white/40 text-[10px] uppercase tracking-widest font-semibold mb-2.5">
                  Release Year
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {filterYears.map((y) => (
                    <button
                      key={y}
                      onClick={() => setActiveYear(activeYear === y ? null : y)}
                      className={`text-xs px-3 py-1.5 rounded-full border transition-all ${activeYear === y ? "bg-primary border-primary text-white" : "border-white/12 text-white/45 hover:border-white/30"}`}
                      style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                    >
                      {y}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )} */}

      {/* Crew strip */}
      {/* <div className="relative z-10 border-t border-white/10 px-10 lg:px-16 py-5 flex items-center justify-between gap-6 flex-wrap">
        <div>
          <p className="text-xs text-white/40 uppercase tracking-widest font-semibold mb-3">
            Producers
          </p>
          <div className="flex items-center gap-6 flex-wrap">
            {movie.crew.map((member, i) => (
              <div key={i} className="flex items-center gap-2.5">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-9 h-9 rounded-full object-cover border border-white/15"
                />
                <div>
                  <p className="text-[10px] text-primary font-semibold uppercase tracking-wider leading-none mb-0.5">
                    {member.role}
                  </p>
                  <p className="text-white/80 text-xs font-medium">
                    {member.name}
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
        <div className="flex items-center gap-4 text-sm text-white/50 ml-auto">
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
            {featuredMovies.map((_, i) => (
              <span
                key={i}
                onClick={() => setCurrent(i)}
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
      </div> */}
    </div>
  );
};
