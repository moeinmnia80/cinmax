import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export async function Container({ children, className = "" }: ContainerProps) {
  return (
    <div
      className={`w-full mx-auto px-4 sm:px-6 lg:px-10 xl:px-16 max-w-dvw ${className}`}
    >
      {children}
    </div>
  );
}
