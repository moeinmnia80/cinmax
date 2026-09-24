import { ChevronLeft, ChevronRight } from "lucide-react";

export async function CrewStripSkeleton() {
  return (
    <div className="flex flex-col md:flex-row justify-center md:justify-between relative z-10 border-t border-white/10 py-5 items-center gap-6">
      <div className="w-full">
        <div className="flex items-center gap-6 overflow-auto">
          {Array.from({ length: 1 }).map((_, i) => (
            <div
              key={`crew-${i}`}
              className="flex items-center gap-2.5 shrink-0"
            >
              <div className="w-9 h-9 bg-gray-200/20 rounded-full object-cover border border-white/15 animate-pulse" />
              <div className="flex flex-col gap-1">
                <span className="inline-block w-17 h-2.5 bg-gray-200/20 rounded-md animate-pulse" />
                <span className="inline-block w-17 h-3.5 bg-gray-200/20 rounded-md animate-pulse" />
              </div>
            </div>
          ))}
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={`cast-${i}`}
              className="flex items-center gap-2.5 shrink-0"
            >
              <div className="w-9 h-9 bg-gray-200/20 rounded-full object-cover border border-white/15 animate-pulse" />
              <div className="flex flex-col gap-1 ">
                <span className="inline-block w-17 h-2.5 bg-gray-200/20 rounded-md animate-pulse" />
                <span className="inline-block w-17 h-3.5 bg-gray-200/20 rounded-md animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-4 text-sm text-white/50">
        <button
          type="button"
          className="flex items-center gap-1.5 hover:text-white transition-colors group"
        >
          <ChevronLeft
            size={16}
            className="group-hover:-translate-x-0.5 transition-transform"
          />
          Previous
        </button>
        <div className="flex gap-1.5">
          {(Array.from({ length: 3 }) || []).map((_, i) => (
            <span
              key={i}
              className={`h-0.5 rounded-full cursor-pointer transition-all ${i === 0 ? "bg-primary w-8" : "bg-white/25 hover:bg-white/50 w-5"}`}
            />
          ))}
        </div>
        <button
          type="button"
          className="flex items-center gap-1.5 hover:text-white transition-colors group"
        >
          Next
          <ChevronRight
            size={16}
            className="group-hover:translate-x-0.5 transition-transform"
          />
        </button>
      </div>
    </div>
  );
}
