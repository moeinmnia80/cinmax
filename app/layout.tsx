import "@/app/globals.css";
import type { Metadata } from "next";
import { barlowCondensed } from "@/lib/fonts";
import { ReduxProvider } from "@/components/ReduxProvider";
import { ToastContainer } from "@/components/ToastContainer";
import { QueryProvider } from "@/components/QueryProvider";

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
        <QueryProvider>
          <ReduxProvider>{children}</ReduxProvider>
        </QueryProvider>
        <ToastContainer />
      </body>
    </html>
  );
}
