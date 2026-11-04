import { getBroadcasts } from "@/data/broadcast";
import { BroadcastHeader } from "./BroadcastHeader";
import { BroadcastShow } from "./BroadcastShow";

export function Broadcast() {
  const broadcast = getBroadcasts();
  return (
    <section className="relative overflow-hidden flex items-center min-h-dvh w-full py-14 sm:py-0">
      <div className="pointer-events-none absolute left-[15%] top-12 size-75 rounded-full bg-destructive/10 blur-[130px]" />
      <div className="pointer-events-none absolute -right-32 bottom-0 size-96 rounded-full bg-destructive/2.5 blur-[110px]" />

      <div className="flex flex-col items-center gap-10 w-full">
        <BroadcastHeader />
        <BroadcastShow data={broadcast} />
      </div>
    </section>
  );
}
