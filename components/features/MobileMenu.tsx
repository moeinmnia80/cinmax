"use client";

import { useModalStore } from "@/store/useModalStore";
import { MobileOverlay, MobileSidebar } from "@/components";

export const MobileMenu = () => {
  const setMobileNavOpen = useModalStore((state) => state.toggleSearchModal);

  return (
    <>
      <MobileOverlay onClick={() => setMobileNavOpen(false)} />
      <MobileSidebar />
    </>
  );
};
