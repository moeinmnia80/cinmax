"use client";

import Image from "next/image";
import { useState } from "react";
import { redirect } from "next/navigation";
import { Bell, CalendarClock, ChevronRight, Play } from "lucide-react";

import { broadcastDays } from "@/constants/broadcast";
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
      </div>
    </section>
  );
}
