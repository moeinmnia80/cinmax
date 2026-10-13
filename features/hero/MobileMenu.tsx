"use client";

import { useModalStore } from "@/store/useModalStore";
import { MobileSidebar, MobileOverlay } from "@/features/client";

export const MobileMenu = () => {
  const setMobileNavOpen = useModalStore((state) => state.toggleMobileNav);

  return (
    <>
      <MobileOverlay onClick={() => setMobileNavOpen(false)} />
      <MobileSidebar />
    </>
  );
};
