import { Cursor } from "@moeinmnia/motion/react";

import "@/app/globals.css";
import "@moeinmnia/motion/styles.css";
import type { Metadata } from "next";
import { barlowCondensed } from "@/lib/fonts";
import { ReduxProvider } from "@/components/ReduxProvider";
import { ToastContainer } from "@/components/ToastContainer";
import { QueryProvider } from "@/components/QueryProvider";
import { ThemeProvider } from "@/components/ThemeProvider";

export const metadata: Metadata = {
  title: "cinmax",
  description: "follow your dreams",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body
        className={`${barlowCondensed.className} min-h-full flex flex-col bg-background`}
      >
        <Cursor />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <QueryProvider>
            <ReduxProvider>{children}</ReduxProvider>
          </QueryProvider>
          <ToastContainer />
        </ThemeProvider>
      </body>
    </html>
  );
}
