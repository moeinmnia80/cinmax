import { create } from "zustand";

interface ModalState {
  mobileNavOpen: boolean;

  toggleMobileNav: (payload?: boolean) => void;
  closeAllModals: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  mobileNavOpen: false,
  searchModalOpen: false,
  filterModalOpen: false,

  toggleMobileNav: (payload) =>
    set((state) => ({
      mobileNavOpen:
        typeof payload === "boolean" ? payload : !state.mobileNavOpen,
    })),

  closeAllModals: () => set({ mobileNavOpen: false }),
}));
