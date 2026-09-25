import Image from "next/image";
import { Play, Star } from "lucide-react";

import { showcaseMovies } from "@/constants/movieShowCase";

export const LoginShowCase = () => {
  return (
    <div className="flex gap-4 mb-10">
      {showcaseMovies.map((m, i) => (
        <div
          key={m.title}
          className="relative rounded-xl overflow-hidden shrink-0 border border-white/10 group cursor-pointer"
          style={{
            width: i === 0 ? 140 : 110,
            height: i === 0 ? 200 : 160,
            marginTop: i === 0 ? 0 : i * 16,
            opacity: i === 0 ? 1 : 0.6 + i * 0.1,
            transform: `rotate(${(i - 1.5) * 2}deg)`,
            zIndex: showcaseMovies.length - i,
          }}
        >
          <Image
            src={m.image}
            alt={m.title}
            priority
            width={1920}
            height={1080}
            loading="eager"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-2">
            <p className="text-white text-[10px] font-bold uppercase leading-tight">
              {m.title}
            </p>
            <div className="flex items-center gap-1 mt-0.5">
              <Star size={8} className="text-yellow-400 fill-yellow-400" />
              <span className="text-yellow-400 text-[9px] font-bold">
                {m.rating}
              </span>
            </div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="w-8 h-8 rounded-full bg-destructive/90 flex items-center justify-center shadow-lg">
              <Play size={12} fill="white" className="text-white ml-0.5" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
