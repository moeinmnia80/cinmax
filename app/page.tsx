import { Hero } from "@/features/server";
import { MobileMenu } from "@/features/client";

import { Broadcast } from "@/features/broadcast/Broadcast";
import { Movies } from "@/features/movies/Movies";
import { Serials } from "@/features/serials/Serials";

interface HomePageProps {
  searchParams: Promise<{ search?: string }>;
}

export default function HomePage({ searchParams }: HomePageProps) {
  return (
    <main className="flex flex-col flex-1 items-center min-h-dvh">
      <MobileMenu />
      <Hero searchParams={searchParams} />
      <Broadcast />
      <Movies />
      <Serials />
    </main>
  );
}
