"use client";

import { useState } from "react";

import { MobileOverlay, MobileSidebar } from "@/components";

export const MobileMenu = () => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <>
      <MobileOverlay
        mobileNavOpen={mobileNavOpen}
        onClick={() => setMobileNavOpen(false)}
      />
      <MobileSidebar
        mobileNavOpen={mobileNavOpen}
        setMobileNavOpen={setMobileNavOpen}
      />
    </>
  );
};
