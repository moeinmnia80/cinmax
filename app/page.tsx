import { MobileMenu } from "@/features/client";
import { Container, Hero } from "@/features/server";

export default function Home() {
  return (
    <main>
      <Container>
        <div className="flex flex-col flex-1 items-center min-h-dvh">
          <MobileMenu />
          <Hero />
        </div>
      </Container>
    </main>
  );
}
