import { MobileMenu } from "@/features/client";
import { Container, Hero } from "@/features/server";

import { Broadcast } from "@/features/broadcast/Broadcast";

export default function Home() {
  return (
    <main>
      <Container>
        <div className="flex flex-col flex-1 items-center min-h-dvh">
          <MobileMenu />
          <Hero />
          <Broadcast />
        </div>
      </Container>
    </main>
  );
}
