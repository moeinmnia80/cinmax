"use client";

import { ComponentProps } from "react";
import { LoaderCircle, PlusCircleIcon } from "lucide-react";
import Link, { useLinkStatus } from "next/link";

import { cn } from "@/utils";
import { useQueryToggle } from "@/hooks/useQueryToggle";

const ButtonContent = ({
  isOpen,
  label,
}: {
  isOpen: boolean;
  label?: string;
}) => {
  const { pending } = useLinkStatus();

  if (pending) {
    return (
      <>
        <LoaderCircle
          size={15}
          aria-hidden="true"
          className="animate-spin motion-reduce:animate-pulse"
        />
        <span role="status" className="sr-only">
          Loading
        </span>
      </>
    );
  }

  return !isOpen ? (
    label ? (
      label
    ) : (
      <PlusCircleIcon size={15} className="text-foreground/50" />
    )
  ) : (
    "Esc"
  );
};

interface NewButtonProps extends ComponentProps<"a"> {
  slug?: string;
  label?: string;
}

export const NewButton = ({
  slug = "unsaved-draft",
  label,
  className,
}: NewButtonProps) => {
  const { isOpen, href } = useQueryToggle(slug);

  return (
    <Link
      href={href}
      replace
      scroll={false}
      aria-label={isOpen ? "Close editor" : "Edit"}
      aria-pressed={isOpen}
      className={cn(
        "size-10 shrink-0 flex items-center justify-center text-nowrap text-sm text-foreground/85 uppercase bg-foreground/5 border border-foreground/10 rounded-full p-2 hover:bg-foreground/10 transition duration-200",
        className,
      )}
    >
      <ButtonContent isOpen={isOpen} label={label} />
    </Link>
  );
};
