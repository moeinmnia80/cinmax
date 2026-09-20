import { Container, Hero, MobileMenu } from "@/components";

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
