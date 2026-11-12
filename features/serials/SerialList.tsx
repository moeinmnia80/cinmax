import { use } from "react";
import Link from "next/link";
import Image from "next/image";
import { Reveal } from "@moeinmnia/motion/react";

import { SerialType } from "@/data/serial";

export const SerialList = ({ data }: { data: Promise<SerialType[]> }) => {
  const serials = use(data);
  return (
    <div className="flex items-center gap-3 mt-5 overflow-x-auto pb-2">
      {serials.map((serial, index) => (
        <Reveal key={serial.id} variant="left" delay={500 * index}>
          <Link
            href={`/serial/${serial.slug}`}
            prefetch={false}
            className="group flex flex-col gap-2 shrink-0 w-40 md:w-60 overflow-hidden rounded-2xl border border-foreground/10"
          >
            <div className="relative aspect-2/3 w-full">
              {serial.image && (
                <Image
                  src={serial.image}
                  alt={serial.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 351px"
                  priority
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              )}
            </div>
          </Link>
        </Reveal>
      ))}
    </div>
  );
};
