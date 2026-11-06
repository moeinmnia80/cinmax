import { Suspense } from "react";
import { SplitText } from "@moeinmnia/motion/react";

import { BroadcastNav } from "./BroadcastNav";
import { getBroadcasts } from "@/data/broadcast";

export const BroadcastHeader = () => {
  const broadcasts = getBroadcasts();
  return (
    <div className="flex flex-col gap-5 sm:flex-row sm:justify-between sm:items-end w-full">
      <div>
        <div className="mb-3 flex items-center gap-3">
          <span className="flex items-center gap-2 h-7 bg-foreground/10 text-foreground text-xs font-bold tracking-widest uppercase border border-foreground/10 rounded-full px-3">
            <span className="size-1.5 animate-pulse rounded-full bg-foreground/60" />
            Broadcast
          </span>
          <SplitText
            as="span"
            by="words"
            step={160}
            className="text-xs font-semibold uppercase tracking-widest text-foreground/20"
          >
            Cinemax One · EST
          </SplitText>
        </div>
        <h2 className="flex items-center text-4xl font-black uppercase leading-[0.9] tracking-[-0.02em] text-destructive sm:text-6xl">
          <span className="text-foreground mr-3">Tonight on</span>
          Cinemax
          <span className="text-primary">.</span>
        </h2>
      </div>

      <div className="flex items-center w-full sm:w-fit gap-1 overflow-x-auto bg-foreground/5 border border-foreground/10 rounded-full p-1.5">
        <Suspense fallback={<></>}>
          <BroadcastNav data={broadcasts} />
        </Suspense>
      </div>
    </div>
  );
};
