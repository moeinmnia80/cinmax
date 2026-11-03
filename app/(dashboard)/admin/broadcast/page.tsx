import Link from "next/link";
import Image from "next/image";
import { Clapperboard, Clock, Plus, Tv } from "lucide-react";

import { getBroadcasts } from "@/data/broadcast";
import { WEEKDAYS } from "@/constants/broadcast";

export default async function BroadcastsPage() {
  const broadcasts = await getBroadcasts();

  return (
    <section className="p-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Broadcast schedule</h1>
        <Link
          href="/admin/broadcasts/new"
          className="inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background transition hover:opacity-90"
        >
          <Plus className="size-4" aria-hidden /> New
        </Link>
      </header>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {WEEKDAYS.map((day) => {
          const items = broadcasts.filter((b) => b.days.includes(day.id));

          return (
            <div
              key={day.id}
              className="rounded-2xl border border-foreground/10 bg-foreground/5 p-3"
            >
              <h2 className="px-1 text-xs font-bold uppercase tracking-widest text-foreground/60">
                {day.label}
              </h2>

              <ul className="mt-3 flex flex-col gap-2">
                {items.length === 0 && (
                  <li className="px-1 py-4 text-sm text-foreground/30">
                    Nothing scheduled
                  </li>
                )}

                {items.map((b) => {
                  const isMovie = b.movieId !== null;
                  const content = isMovie ? b.movie : b.serial;
                  const Icon = isMovie ? Clapperboard : Tv;

                  return (
                    <li key={b.id}>
                      <Link
                        href={`/admin/broadcast/${b.id}`}
                        className="group flex gap-3 rounded-xl border border-transparent bg-background/40 p-2 outline-none transition hover:border-foreground/15 focus-visible:ring-2 focus-visible:ring-foreground/30"
                      >
                        <div className="relative h-16 w-11 shrink-0 overflow-hidden rounded-md bg-foreground/10">
                          {content?.image && (
                            <Image
                              src={content.image}
                              alt=""
                              fill
                              sizes="44px"
                              className="object-cover transition group-hover:scale-105"
                            />
                          )}
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium">
                            {content?.title}
                          </p>
                          <p className="mt-0.5 flex items-center gap-1 text-xs text-foreground/60">
                            <Clock className="size-3" aria-hidden /> {b.time}
                          </p>
                          <span className="mt-1.5 inline-flex items-center gap-1 rounded-full bg-foreground/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-foreground/70">
                            <Icon className="size-3" aria-hidden />
                            {b.label ?? b.type}
                          </span>
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}
