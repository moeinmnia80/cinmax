import { HeroNavigation, HeroContent, HeroBackground } from "@/components";
import { FilterDrawer } from "./FilterDrawer";

export const Hero = () => {
  return (
    <div className="flex flex-col w-full h-dvh">
      <HeroBackground />
      <HeroNavigation />
      <FilterDrawer />
      <HeroContent />
      {/* Filter drawer */}
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
