"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { usePathname } from "next/navigation";
import { CheckCircle2, CircleAlert, Loader2, Save } from "lucide-react";

import { toast } from "@/store";
import { DeleteDialog } from "./DeleteDialog";

type FormAction = (formData: FormData) => void | Promise<void>;

interface EditFormActionsProps {
  id?: string | number;
  message?: string;
  success?: boolean;
  canSave?: boolean;
  title?: string;
  deleteAction?: FormAction;

  cancelHref?: string;
  saveLabel?: string;
  savingLabel?: string;
}

const base =
  "inline-flex h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold outline-0 transition focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 font-normal";

export const EditFormActions = ({
  id,
  title,
  message,
  success,
  canSave,
  deleteAction,
  cancelHref,
  saveLabel = "Save changes",
  savingLabel = "Saving…",
}: EditFormActionsProps) => {
  const { pending, action } = useFormStatus();
  const [confirming, setConfirming] = useState(false);
  const pathname = usePathname();

  const isDeleting =
    Boolean(deleteAction) && pending && action === deleteAction;
  const isSaving = pending && !isDeleting;

  useEffect(() => {
    if (success) {
      toast.success("movie uploaded successfully", {
        description: message,
        actions: [{ label: "Dismiss" }],
      });
    } else if (canSave) {
      toast.error("Something went wrong", {
        description: message,
        actions: [
          { label: "Retry", variant: "primary", onClick: () => {} },
          { label: "Dismiss" },
        ],
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success]);

  return (
    <div
      className="sticky bottom-2 z-20 col-span-4 rounded-full border border-foreground/10 backdrop-blur-xl"
      onKeyDown={(e) => {
        if (e.key === "Escape" && confirming) setConfirming(false);
      }}
    >
      {id !== undefined && <input type="hidden" name="id" value={id} />}

      {message && (
        <p
          role="status"
          aria-live="polite"
          className={`flex items-center gap-2 pt-3 text-sm ${
            success ? "text-emerald-500" : "text-destructive"
          }`}
        >
          {success ? (
            <CheckCircle2 className="size-4 shrink-0" aria-hidden="true" />
          ) : (
            <CircleAlert className="size-4 shrink-0" aria-hidden="true" />
          )}
          {message}
        </p>
      )}

      <div className="flex flex-1 flex-col-reverse gap-3 px-2 py-2 sm:flex-row sm:items-center sm:justify-between">
        {id && (
          <DeleteDialog
            title={title}
            deleteAction={deleteAction}
            triggerClassName={`${base} text-destructive hover:bg-destructive/10 focus-visible:ring-destructive/40`}
          />
        )}
        <div className="flex flex-2 flex-col-reverse gap-3 sm:flex-row">
          <Link
            href={cancelHref ?? pathname}
            aria-disabled={pending}
            className={`${base} flex-1 border border-foreground/15 text-foreground/70 hover:bg-foreground/10 hover:text-foreground focus-visible:ring-foreground/40 ${
              pending ? "pointer-events-none opacity-50" : ""
            }`}
          >
            Cancel
          </Link>

          <button
            type="submit"
            disabled={!canSave || pending}
            className={`${base} flex-2 text-nowrap bg-foreground uppercase text-background hover:bg-foreground/85 focus-visible:ring-foreground/40`}
          >
            {isSaving ? (
              <Loader2 className="size-4 animate-spin" aria-hidden="true" />
            ) : (
              <Save className="size-4" aria-hidden="true" />
            )}
            {isSaving ? savingLabel : saveLabel}
          </button>
        </div>
      </div>
    </div>
  );
};
