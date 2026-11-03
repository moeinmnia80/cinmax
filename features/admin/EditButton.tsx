"use client";

import { ComponentProps } from "react";
import Link, { useLinkStatus } from "next/link";
import { Check, LoaderCircle } from "lucide-react";

import { cn } from "@/utils";
import { useQueryToggle } from "@/hooks/useQueryToggle";

const ButtonContent = ({ isEdit }: { isEdit: boolean }) => {
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

  return isEdit ? <Check size={15} aria-hidden="true" /> : "Edit";
};

interface EditButtonProps extends ComponentProps<"a"> {
  slug: string;
}

export const EditButton = ({ slug, className }: EditButtonProps) => {
  const { isOpen, href } = useQueryToggle(slug);

  return (
    <Link
      href={href}
      replace
      scroll={false}
      aria-label={isOpen ? "Close editor" : "Edit"}
      aria-pressed={isOpen}
      className={cn(
        "inline-flex h-6 min-w-10 items-center justify-center rounded bg-foreground/5 px-2 text-xs uppercase text-foreground/60 outline-0 transition hover:bg-foreground/10 focus-visible:ring-2 focus-visible:ring-foreground/40",
        className,
      )}
    >
      <ButtonContent isEdit={isOpen} />
    </Link>
  );
};
