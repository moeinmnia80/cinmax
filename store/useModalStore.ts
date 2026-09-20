import { create } from "zustand";

interface ModalState {
  mobileNavOpen: boolean;
  searchModalOpen: boolean;
  filterModalOpen: boolean;

  toggleMobileNav: (payload?: boolean) => void;
  toggleSearchModal: (payload?: boolean) => void;
  toggleFilterModal: (payload?: boolean) => void;
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

  toggleSearchModal: (payload) =>
    set((state) => ({
      searchModalOpen:
        typeof payload === "boolean" ? payload : !state.searchModalOpen,
    })),

  toggleFilterModal: (payload) => {
    set((state) => ({
      filterModalOpen:
        typeof payload === "boolean" ? payload : !state.filterModalOpen,
    }));
  },

  closeAllModals: () => set({ mobileNavOpen: false, searchModalOpen: false }),
}));
