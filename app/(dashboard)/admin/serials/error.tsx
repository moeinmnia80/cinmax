"use client";

import Link from "next/link";
import { useEffect } from "react";
import { RotateCw, TriangleAlert } from "lucide-react";

export type RouteErrorProps = {
  error: Error & { digest?: string };
  unstable_retry: () => void;
};

type Props = {
  error: RouteErrorProps["error"];
  onRetry: () => void;
  title?: string;
  description?: string;
  backHref?: string;
  backLabel?: string;
  fullScreen?: boolean;
};

const BUTTON =
  "inline-flex h-10 items-center gap-2 rounded-full px-5 text-sm font-medium transition-colors";

export default function ErrorView({
  error,
  onRetry,
  title = "Something went wrong",
  description = "An unexpected error occurred. You can try again, or come back in a moment.",
  backHref,
  backLabel = "Go back",
  fullScreen = true,
}: Props) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div
      role="alert"
      className={`flex flex-col items-center justify-center gap-4 px-6 text-center ${
        fullScreen ? "min-h-screen" : "min-h-[60vh]"
      }`}
    >
      <span className="grid size-12 place-items-center rounded-full bg-foreground/5 text-foreground/70">
        <TriangleAlert aria-hidden className="size-6" />
      </span>

      <div className="space-y-1">
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="max-w-md text-sm text-foreground/60">{description}</p>
      </div>

      {process.env.NODE_ENV === "development" && (
        <pre className="max-w-xl overflow-auto rounded-lg border border-foreground/10 bg-foreground/5 p-3 text-left text-xs text-foreground/70">
          {error.message}
        </pre>
      )}

      {error.digest && (
        <p className="text-xs text-foreground/40">Error ID: {error.digest}</p>
      )}

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onRetry}
          className={`${BUTTON} bg-foreground text-background hover:bg-foreground/90`}
        >
          <RotateCw aria-hidden className="size-4" />
          Try again
        </button>

        {backHref && (
          <Link
            href={backHref}
            className={`${BUTTON} border border-foreground/15 hover:bg-foreground/5`}
          >
            {backLabel}
          </Link>
        )}
      </div>
    </div>
  );
}
