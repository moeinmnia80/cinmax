import { Container } from "@/components";

export async function Footer() {
  return (
    <footer className="border-t border-white/5 px-10 lg:px-16 py-8 text-white/25 text-xs">
      <Container>
        <section className="flex items-center justify-between">
          <h2 className="text-sm font-black text-white/40 tracking-widest">
            CINEMAX
          </h2>
          <p>© 2025 Cinemax. All rights reserved.</p>
        </section>
      </Container>
    </footer>
  );
}
