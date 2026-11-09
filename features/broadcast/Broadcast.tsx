import { Suspense } from "react";
import { Reveal } from "@moeinmnia/motion/react";

import { Container } from "@/features/server";
import { BroadcastShow } from "./BroadcastShow";
import { getBroadcasts } from "@/data/broadcast";
import { BroadcastHeader } from "./BroadcastHeader";

export function Broadcast() {
  const broadcast = getBroadcasts();
  return (
    <Reveal
      variant="fade"
      delay={150}
      className="relative w-full bg-background"
    >
      <Container>
        <section className="overflow-hidden flex items-center min-h-dvh w-full py-14 sm:py-0">
          <div className="pointer-events-none absolute left-[15%] top-12 size-75 rounded-full bg-destructive/10 blur-[110px]" />
          <div className="pointer-events-none absolute -right-32 bottom-0 size-96 rounded-full bg-destructive/2.5 blur-[100px]" />

          <div className="flex flex-col items-center gap-10 w-full">
            <BroadcastHeader />
            <Suspense fallback={<></>}>
              <BroadcastShow data={broadcast} />
            </Suspense>
          </div>
        </section>
      </Container>
    </Reveal>
  );
}
