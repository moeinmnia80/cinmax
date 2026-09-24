"use client";

import { useModalStore } from "@/store/useModalStore";
import { MobileSidebar, MobileOverlay } from "@/features/client";

export const MobileMenu = () => {
  const setMobileNavOpen = useModalStore((state) => state.toggleSearchModal);

  return (
    <>
      <MobileOverlay onClick={() => setMobileNavOpen(false)} />
      <MobileSidebar />
    </>
  );
};
