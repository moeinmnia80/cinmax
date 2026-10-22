"use client";

import Link from "next/link";
import { useState } from "react";
import { useFormStatus } from "react-dom";
import { CheckCircle2, CircleAlert, Loader2, Save } from "lucide-react";

import { deleteSerial } from "@/app/actions/serial";
import { DeleteSerialDialog } from "./DeleteSerialDialog";

interface EditFormActionsProps {
  serialId?: string | number;
  title?: string;
  message?: string;
  success?: boolean;
}

const base =
  "inline-flex h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold outline-0 transition focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 font-normal";

export const EditFormActions = ({
  serialId,
  title,
  message,
  success,
}: EditFormActionsProps) => {
  const { pending, action } = useFormStatus();
  const [confirming, setConfirming] = useState(false);

  const isDeleting = pending && action === deleteSerial;
  const isSaving = pending && !isDeleting;

  return (
    <div
      className="sticky bottom-2 z-20 col-span-4 border border-foreground/10 backdrop-blur-xl rounded-full"
      onKeyDown={(e) => {
        if (e.key === "Escape" && confirming) setConfirming(false);
      }}
    >
      {serialId && <input type="hidden" name="id" value={serialId} />}

      {message && (
        <p
          role="status"
          aria-live="polite"
          className={`flex items-center gap-2 pt-3 text-sm ${success ? "text-emerald-500" : "text-destructive"}`}
        >
          {success ? (
            <CheckCircle2 className="size-4 shrink-0" aria-hidden="true" />
          ) : (
            <CircleAlert className="size-4 shrink-0" aria-hidden="true" />
          )}
          {message}
        </p>
      )}

      <div className="flex-1 flex flex-col-reverse gap-3 py-2 px-2 sm:flex-row sm:items-center sm:justify-between">
        {serialId && (
          <DeleteSerialDialog
            title={title}
            triggerClassName={`${base} text-destructive hover:bg-destructive/10 focus-visible:ring-destructive/40`}
          />
        )}
        <div className="flex-2 flex flex-col-reverse gap-3 sm:flex-row">
          <Link
            href="/admin/serials"
            aria-disabled={pending}
            className={`${base} flex-1 border border-foreground/15 text-foreground/70 hover:bg-foreground/10 hover:text-foreground focus-visible:ring-foreground/40 ${
              pending ? "pointer-events-none opacity-50" : ""
            }`}
          >
            Cancel
          </Link>

          <button
            type="submit"
            disabled={pending}
            className={`${base} flex-2 text-nowrap bg-foreground text-background hover:bg-foreground/85 focus-visible:ring-foreground/40 uppercase`}
          >
            {isSaving ? (
              <Loader2 className="size-4 animate-spin" aria-hidden="true" />
            ) : (
              <Save className="size-4" aria-hidden="true" />
            )}
            {isSaving ? "Saving…" : "Save changes"}
          </button>
        </div>
      </div>
    </div>
  );
};
