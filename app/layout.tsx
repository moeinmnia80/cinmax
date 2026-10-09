import type { Metadata } from "next";

import "@/app/globals.css";
import { barlowCondensed } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "cinmax",
  description: "follow your dreams",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`h-full`}>
      <body
        className={`${barlowCondensed.className} min-h-full flex flex-col bg-background`}
      >
        {children}
      </body>
    </html>
  );
}
