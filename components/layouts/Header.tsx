import { Container } from "@/components/ui/Container";

interface HeaderProps {
  children?: React.ReactNode;
}

export async function Header({ children }: HeaderProps) {
  return (
    <header className="fixed top-0 flex item h-20">
      <Container>{children}</Container>
    </header>
  );
}
