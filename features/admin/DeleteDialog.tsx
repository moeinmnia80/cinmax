"use client";

import { useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { Loader2, Trash2, TriangleAlert, X } from "lucide-react";

import { deleteSerial } from "@/app/actions/serial";

type FormAction = string | ((formData: FormData) => void | Promise<void>);

interface DeleteSerialDialogProps {
  title?: string;
  triggerClassName?: string;
  deleteAction: FormAction | undefined;
}

export const DeleteDialog = ({
  title,
  triggerClassName,
}: DeleteSerialDialogProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { pending } = useFormStatus();
  const [typed, setTyped] = useState("");

  const phrase = title?.trim() || "delete";
  const matches = typed.trim().toLowerCase() === phrase.toLowerCase();

  const open = () => dialogRef.current?.showModal();
  const close = () => dialogRef.current?.close();

  return (
    <>
      <button
        type="button"
        onClick={open}
        disabled={pending}
        className={triggerClassName}
      >
        <Trash2 className="size-4" aria-hidden="true" />
        Delete
      </button>

      <dialog
        ref={dialogRef}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-desc"
        onCancel={(e) => pending && e.preventDefault()}
        onClose={() => setTyped("")}
        onClick={(e) => {
          if (e.target === e.currentTarget && !pending) close();
        }}
        className="m-auto w-[calc(100%-2rem)] max-w-md rounded-2xl border border-foreground/10 bg-background p-0 text-foreground shadow-2xl backdrop:bg-black/60 backdrop:backdrop-blur-sm open:animate-slide-down"
      >
        <div className="relative p-6">
          <button
            type="button"
            onClick={close}
            disabled={pending}
            aria-label="Close"
            className="absolute top-4 right-4 rounded-md p-1 text-foreground/40 outline-0 transition hover:text-foreground focus-visible:ring-2 focus-visible:ring-foreground/40 disabled:opacity-50"
          >
            <X className="size-5" aria-hidden="true" />
          </button>

          <div className="flex size-12 items-center justify-center rounded-full bg-destructive/15 text-destructive">
            <TriangleAlert className="size-6" aria-hidden="true" />
          </div>

          <h2 id="delete-dialog-title" className="mt-4 text-lg font-semibold">
            Delete this serial?
          </h2>

          <p
            id="delete-dialog-desc"
            className="mt-2 text-sm text-foreground/60"
          >
            <span className="font-medium text-foreground">
              {title ?? "This serial"}
            </span>{" "}
            and its cast, crew, images, purchases and watch progress will be
            permanently removed. This action can&apos;t be undone.
          </p>

          <label className="mt-5 block text-sm text-foreground/70">
            Type{" "}
            <span className="rounded bg-foreground/10 px-1.5 py-0.5 font-mono text-xs text-foreground">
              {phrase}
            </span>{" "}
            to confirm
            <input
              type="text"
              autoComplete="off"
              autoFocus
              value={typed}
              disabled={pending}
              onChange={(e) => setTyped(e.target.value)}
              className="mt-2 w-full rounded-lg border border-foreground/15 bg-foreground/5 px-3 py-2.5 text-sm outline-0 transition focus:border-destructive/60 focus-visible:ring-2 focus-visible:ring-destructive/30 disabled:opacity-50"
            />
          </label>

          <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={close}
              disabled={pending}
              className="inline-flex h-11 items-center justify-center rounded-lg border border-foreground/15 px-5 text-sm font-semibold text-foreground/80 outline-0 transition hover:bg-foreground/10 focus-visible:ring-2 focus-visible:ring-foreground/40 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              formAction={deleteSerial}
              formNoValidate
              disabled={!matches || pending}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-destructive px-5 text-sm font-semibold text-white outline-0 transition hover:bg-destructive/85 focus-visible:ring-2 focus-visible:ring-destructive/50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {pending ? (
                <Loader2 className="size-4 animate-spin" aria-hidden="true" />
              ) : (
                <Trash2 className="size-4" aria-hidden="true" />
              )}
              {pending ? "Deleting…" : "Delete forever"}
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};
