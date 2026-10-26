"use client";

import { ComponentProps } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface NavigationProps {
  length: number;
  current: number;
  onChange: (index: number) => void;
}

export function Navigation({ length, current, onChange }: NavigationProps) {
  const canPrev = current > 0;
  const canNext = current < length - 1;

  const increase = () => canNext && onChange(current + 1);
  const decrease = () => canPrev && onChange(current - 1);

  const handleChange = (value: number) => {
    if (value < 0 || value >= length) return;
    onChange(value);
  };

  if (length <= 0) return null;

  return (
    <div className="absolute bottom-0 left-0 flex justify-between items-center w-full h-15 px-4">
      <PrevButton onClick={decrease} disabled={!canPrev} />
      <Pagination length={length} current={current} onClick={handleChange} />
      <NextButton onClick={increase} disabled={!canNext} />
    </div>
  );
}

function NextButton({ ...props }: ComponentProps<"button">) {
  return (
    <button type="button" className="disabled:opacity-40" {...props}>
      <ChevronRight size={20} />
    </button>
  );
}
function PrevButton({ ...props }: ComponentProps<"button">) {
  return (
    <button type="button" className="disabled:opacity-40" {...props}>
      <ChevronLeft size={20} />
    </button>
  );
}

interface PaginationProps extends Omit<ComponentProps<"button">, "onClick"> {
  onClick: (value: number) => void;
  length: number;
  current: number;
}

function Pagination({ length, current, onClick }: PaginationProps) {
  return (
    <div className="flex gap-1.5">
      {Array.from({ length }).map((_, index) => (
        <button
          type="button"
          key={index}
          onClick={() => onClick(index)}
          className={`size-2 rounded-full transition-all duration-200 ${
            current === index ? "bg-foreground" : "bg-foreground/25"
          }`}
        />
      ))}
    </div>
  );
}
