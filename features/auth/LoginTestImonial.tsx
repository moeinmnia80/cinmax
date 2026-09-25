import Image from "next/image";
import { Star } from "lucide-react";

import { testimonials } from "@/constants/movieShowCase";

export const LoginTestImonial = () => {
  return (
    <div className="bg-white/4 backdrop-blur-sm border border-white/10 rounded-2xl p-5 max-w-sm">
      <div className="flex gap-1 mb-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} size={12} className="text-yellow-400 fill-yellow-400" />
        ))}
      </div>
      <p className="text-white/80 text-sm leading-relaxed mb-4">
        {testimonials[0].text}
      </p>
      <div className="flex items-center gap-3">
        <Image
          src={testimonials[0].avatar}
          alt={testimonials[0].name}
          width={200}
          height={200}
          loading="eager"
          className="w-9 h-9 rounded-full object-cover border border-white/15"
        />
        <div>
          <p className="text-white text-sm font-bold">{testimonials[0].name}</p>
          <p className="text-destructive text-[10px] font-bold uppercase tracking-wider">
            {testimonials[0].tier} Member
          </p>
        </div>
      </div>
    </div>
  );
};
