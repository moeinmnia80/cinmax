import Link from "next/link";
import { Suspense, useId } from "react";
import { ChevronRight } from "lucide-react";
import { ScrollFill, Typewriter } from "@moeinmnia/motion/react";

import { getSerials } from "@/data/serial";
import { Container } from "@/features/server";
import { SerialList } from "./SerialList";

export const Serials = () => {
  const id = useId();
  const serials = getSerials({ limit: 10 });
  return (
    <section
      aria-labelledby={id}
      className="flex flex-col justify-center gap-4 w-full min-h-dvh border-t border-foreground/5 "
    >
      <Container className="">
        <div className="flex items-center justify-between">
          <div>
            <div className="uppercase text-destructive">
              <span className="">—</span>
              <Typewriter
                speed={15}
                delay={400}
                caret={false}
                className="text-lg font-semibold tracking-wider ms-1"
              >
                new releases
              </Typewriter>
            </div>
            <ScrollFill
              as="h2"
              id={id}
              className="text-5xl font-black uppercase"
            >
              serials
            </ScrollFill>
          </div>
          <Link
            href="/movies"
            prefetch={false}
            className="flex items-center gap-1 text-foreground/30 tracking-wider capitalize"
          >
            view all
            <ChevronRight size={15} />
          </Link>
        </div>
        <Suspense fallback={<></>}>
          <SerialList data={serials} />
        </Suspense>
      </Container>
    </section>
  );
};
