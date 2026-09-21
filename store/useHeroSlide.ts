import { create } from "zustand";

interface HeroSlideState {
  current: number;

  setCurrent: (value: () => number | number) => void;
  resetFilters: () => void;
}

const initialFilterValues = {
  current: 0,
};

export const useHeroSlide = create<HeroSlideState>((set) => ({
  ...initialFilterValues,

  setCurrent: (current) => {
    set({ current: typeof current === "function" ? current() : current });
  },

  resetFilters: () => set(initialFilterValues),
}));
