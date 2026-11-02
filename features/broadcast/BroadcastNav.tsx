"use client";

import { broadcastDays } from "@/constants/broadcast";
import { Day, useBroadcast } from "@/store/useBroadcast";

export const BroadcastNav = () => {
  const day = useBroadcast((state) => state.day);
  const setDay = useBroadcast((state) => state.setDay);

  const changeDay = (day: Day) => setDay(day);
  return (
    <>
      {broadcastDays.map((broadcastDay) => (
        <button
          key={`${broadcastDay.day}-${broadcastDay.date}`}
          onClick={() => changeDay(broadcastDay.day)}
          className={`flex items-center justify-center gap-1 rounded-full px-5 py-2.5 transition-all duration-300 ${
            day === broadcastDay.day
              ? "bg-white text-black shadow-xl shadow-black/30"
              : "text-white/35 hover:bg-white/6 hover:text-white"
          }`}
        >
          <span className="text-[10px] font-bold uppercase tracking-wider">
            {broadcastDay.day}
          </span>
          <span className="text-sm font-black">{broadcastDay.date}</span>
        </button>
      ))}
    </>
  );
};
