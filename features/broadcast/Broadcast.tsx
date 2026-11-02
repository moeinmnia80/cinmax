"use client";

import { broadcastDays } from "@/constants/broadcast";
import { Bell, CalendarClock, ChevronRight, Play } from "lucide-react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useState } from "react";
import { BroadcastHeader } from "./BroadcastHeader";

export function Broadcast() {
  const [selectedBroadcastDay] = useState(0);
  const [broadcastReminders, setBroadcastReminders] = useState<number[]>([]);

  const toggleBroadcastReminder = (id: number) =>
    setBroadcastReminders((currentReminders) =>
      currentReminders.includes(id)
        ? currentReminders.filter((reminderId) => reminderId !== id)
        : [...currentReminders, id],
    );
  return (
    <section className="relative overflow-hidden flex items-center min-h-dvh w-full py-14 sm:py-0">
      <div className="pointer-events-none absolute left-[15%] top-12 size-75 rounded-full bg-destructive/10 blur-[130px]" />
      <div className="pointer-events-none absolute -right-32 bottom-0 size-96 rounded-full bg-destructive/2.5 blur-[110px]" />

      <div className="flex flex-col items-center gap-10 w-full">
        <BroadcastHeader />
        {(() => {
          const [featuredBroadcast, ...upcomingBroadcasts] =
            broadcastDays[selectedBroadcastDay].programs;
          return (
            <div className="flex w-full">
              <article
                onClick={() => redirect(`/movie/${featuredBroadcast.slug}`)}
                className="flex-2 group relative cursor-pointer overflow-hidden rounded-[2rem] border border-white/10 bg-[#111113] shadow-2xl shadow-black/30"
              >
                <Image
                  src={featuredBroadcast.image}
                  alt={featuredBroadcast.title}
                  width={500}
                  height={500}
                  className="absolute inset-0 h-full w-full object-cover opacity-75 transition duration-1000 ease-out group-hover:scale-[1.04] group-hover:opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/65 to-black/5" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/20" />

                <div className="absolute left-5 right-5 top-5 flex items-center justify-between sm:left-8 sm:right-8 sm:top-8">
                  <div className="flex items-center gap-2 rounded-full border border-white/10 bg-black/35 px-3.5 py-2 backdrop-blur-xl">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                    </span>
                    <span className="text-[10px] font-black uppercase tracking-[0.16em] text-white">
                      {featuredBroadcast?.live
                        ? "Now playing"
                        : "Featured tonight"}
                    </span>
                  </div>
                  <button
                    onClick={(event) => {
                      event.stopPropagation();
                      toggleBroadcastReminder(featuredBroadcast.id);
                    }}
                    aria-label={
                      broadcastReminders.includes(featuredBroadcast.id)
                        ? `Remove reminder for ${featuredBroadcast.title}`
                        : `Set reminder for ${featuredBroadcast.title}`
                    }
                    className={`flex h-11 w-11 items-center justify-center rounded-full border backdrop-blur-xl transition-all ${
                      broadcastReminders.includes(featuredBroadcast.id)
                        ? "border-primary bg-primary text-white shadow-lg shadow-primary/30"
                        : "border-white/15 bg-black/30 text-white/65 hover:bg-white hover:text-black"
                    }`}
                  >
                    <Bell
                      size={15}
                      fill={
                        broadcastReminders.includes(featuredBroadcast.id)
                          ? "currentColor"
                          : "none"
                      }
                    />
                  </button>
                </div>

                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-9 lg:max-w-[78%]">
                  <div className="mb-5 flex items-center gap-4">
                    <span
                      className="text-5xl font-black leading-none text-white sm:text-6xl"
                      style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                    >
                      {featuredBroadcast.time}
                    </span>
                    <div className="h-9 w-px bg-white/20" />
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
                        {featuredBroadcast.label}
                      </p>
                      <p className="mt-1 text-xs text-white/35">
                        {featuredBroadcast.duration} · Live channel
                      </p>
                    </div>
                  </div>
                  <h3
                    className="text-5xl font-black uppercase leading-[0.88] tracking-[-0.02em] text-white sm:text-7xl"
                    style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                  >
                    {featuredBroadcast.title}
                  </h3>
                  <div className="mt-7 flex items-center gap-3">
                    <button className="flex items-center gap-2 rounded-full bg-white px-5 py-3 text-xs font-black uppercase tracking-wider text-black transition-transform hover:scale-105">
                      <Play size={13} fill="currentColor" /> Watch live
                    </button>
                    <span className="hidden text-xs text-white/35 sm:block">
                      Started 37 minutes ago
                    </span>
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
                  <div className="h-full w-[31%] bg-primary shadow-[0_0_16px_rgba(229,9,20,0.8)]" />
                </div>
              </article>

              <div className="flex flex-col rounded-[2rem] border border-white/10 bg-white/[0.025] p-3 backdrop-blur-sm">
                <div className="flex items-center justify-between px-3 pb-3 pt-2">
                  <div>
                    <p className="text-sm font-bold text-white">Up next</p>
                    <p className="mt-0.5 text-[10px] text-white/30">
                      {broadcastDays[selectedBroadcastDay].month}{" "}
                      {broadcastDays[selectedBroadcastDay].date} · Eastern time
                    </p>
                  </div>
                  <CalendarClock size={17} className="text-white/25" />
                </div>

                <div className="flex flex-1 flex-col gap-2">
                  {upcomingBroadcasts.map((program, index) => (
                    <article
                      key={program.id}
                      onClick={() => redirect(`/movie/${program.slug}`)}
                      className="group relative flex min-h-[112px] cursor-pointer items-center gap-4 overflow-hidden rounded-2xl border border-transparent bg-white/[0.035] p-3 transition-all duration-300 hover:border-white/10 hover:bg-white/[0.065]"
                    >
                      <div className="relative h-[88px] w-[104px] shrink-0 overflow-hidden rounded-xl bg-white/5">
                        <Image
                          src={program.image}
                          alt=""
                          width={500}
                          height={500}
                          className="h-full w-full object-cover opacity-70 transition duration-500 group-hover:scale-110 group-hover:opacity-100"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                        <span className="absolute bottom-2 left-2 rounded-md bg-black/60 px-2 py-1 text-[10px] font-bold text-white backdrop-blur-md">
                          {program.time}
                        </span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="mb-1.5 flex items-center gap-2">
                          <span className="text-[9px] font-bold uppercase tracking-[0.16em] text-primary">
                            {index === 0 ? "Next" : `In ${index + 1} slots`}
                          </span>
                          <span className="h-px flex-1 bg-white/[0.07]" />
                        </div>
                        <h3
                          className="truncate text-lg font-black uppercase leading-none text-white transition-colors group-hover:text-primary"
                          style={{
                            fontFamily: "'Barlow Condensed', sans-serif",
                          }}
                        >
                          {program.title}
                        </h3>
                        <p className="mt-1.5 truncate text-[10px] text-white/30">
                          {program.label} · {program.duration}
                        </p>
                      </div>
                      <button
                        onClick={(event) => {
                          event.stopPropagation();
                          toggleBroadcastReminder(program.id);
                        }}
                        aria-label={
                          broadcastReminders.includes(program.id)
                            ? `Remove reminder for ${program.title}`
                            : `Set reminder for ${program.title}`
                        }
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all ${
                          broadcastReminders.includes(program.id)
                            ? "bg-primary text-white shadow-lg shadow-primary/20"
                            : "bg-white/[0.06] text-white/30 hover:bg-white hover:text-black"
                        }`}
                      >
                        <Bell
                          size={13}
                          fill={
                            broadcastReminders.includes(program.id)
                              ? "currentColor"
                              : "none"
                          }
                        />
                      </button>
                    </article>
                  ))}
                </div>

                <div className="mt-2 flex items-center justify-between rounded-2xl bg-black/20 px-4 py-3">
                  <span className="text-[10px] text-white/25">
                    Tap the bell for a 10 min reminder
                  </span>
                  <button className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-white/55 transition-colors hover:text-white">
                    Full guide <ChevronRight size={12} />
                  </button>
                </div>
              </div>
            </div>
          );
        })()}
      </div>
    </section>
  );
}
