import { JetBrains_Mono } from "next/font/google";

import "@/app/globals.css";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { barlowCondensed } from "@/lib/fonts";
import { ReduxProvider } from "@/components/ReduxProvider";
import { ToastContainer } from "@/components/ToastContainer";
import { QueryProvider } from "@/components/QueryProvider";
import { ThemeProvider } from "@/components/ThemeProvider";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "cinmax",
  description: "follow your dreams",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn("h-full dark", "font-mono", jetbrainsMono.variable)}
      suppressHydrationWarning
    >
      <body
        className={`${barlowCondensed.className} min-h-full flex flex-col bg-background`}
      >
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
