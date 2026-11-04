import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";
import { Clapperboard, Clock, Tv } from "lucide-react";

import { getBroadcasts } from "@/data/broadcast";
import { WEEKDAYS } from "@/constants/broadcast";
import { AdminHeader } from "@/features/server";
import { EditBroadcast } from "@/features/broadcast/EditBroadcast";
import { NewButton } from "@/features/admin/NewButton";

export default async function BroadcastsPage({
  searchParams,
}: {
  searchParams: Promise<{ edit?: string }>;
}) {
  const broadcasts = await getBroadcasts();

  return (
    <>
      <AdminHeader title="Broadcast" desc="Schedule time" className="flex">
        <Suspense fallback={null}>
          <NewButton />
        </Suspense>
      </AdminHeader>
      <div className="absolute top-19 right-0 -z-10 hidden h-full w-full rounded-tl-2xl border-t border-l border-foreground/10 sm:block" />

      <div className="grid gap-3 p-4 sm:grid-cols-2 sm:gap-1 sm:p-3 xl:grid-cols-4">
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

                  if (!content) return null;

                  return (
                    <li key={b.id}>
                      <Link
                        href={`?edit=${content?.slug}`}
                        replace
                        scroll={false}
                        className="group flex gap-3 rounded-xl border border-transparent bg-background/40 p-2 outline-none transition hover:border-foreground/15 focus-visible:ring-2 focus-visible:ring-foreground/30"
                      >
                        <div className="relative h-16 w-11 shrink-0 overflow-hidden rounded-md bg-foreground/10">
                          {content.image && (
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
                            {content.title}
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

      <Suspense fallback={null}>
        <EditBroadcast searchParams={searchParams} />
      </Suspense>
    </>
  );
}
