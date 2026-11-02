import { create } from "zustand";

const days = ["sat", "sun", "mon", "tue", "wed", "thu", "fri"] as const;
export type Day = (typeof days)[number];

const getDateKey = (index: number) =>
  days[Math.round((index + 1) % days.length)];
const today = new Date().getDay();

interface Broadcast {
  day: Day;

  setDay: (day: Day) => void;
}
const initialState = {
  day: getDateKey(today),
};

export const useBroadcast = create<Broadcast>((set) => ({
  ...initialState,

  setDay: (day: Day) => set({ day }),
}));
