import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export async function Container({ children, className = "" }: ContainerProps) {
  return (
    <div
      className={`w-full mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl ${className}`}
    >
      {children}
    </div>
  );
}
