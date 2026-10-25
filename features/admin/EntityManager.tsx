"use client";

import { Loader2, Plus } from "lucide-react";
import { useCallback, useId, useState, useTransition } from "react";

import { EntityRow } from "@/features/client";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export type EntityItem =
  | {
      status: "fulfilled";
      value: {
        id: number;
        name: string;
        code?: string;
        slug?: string;
        createdAt: Date;
        updatedAt: Date;
      }[];
    }
  | { status: "rejected"; reason: string };
interface EntityManagerProps {
  title: string;
  description: string;
  items: EntityItem;
  withCode?: boolean;
  onCreate: (name: string, code: string) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
}

export const EntityManager = ({
  title,
  description,
  items,
  withCode = false,
  onCreate,
  onDelete,
}: EntityManagerProps) => {
  const nameId = useId();
  const codeId = useId();

  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [isPending, startTransition] = useTransition();
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const canSubmit = name.trim() !== "" && (!withCode || code.trim() !== "");

  const handleCreate = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!canSubmit) return;

    startTransition(async () => {
      await onCreate(name.trim(), code.trim());
      setName("");
      setCode("");
    });
  };

  const handleDelete = useCallback(
    (id: number) => {
      setDeletingId(id);
      startTransition(async () => {
        try {
          await onDelete(id);
        } finally {
          setDeletingId(null);
        }
      });
    },
    [onDelete],
  );

  if (items.status === "rejected") return;

  return (
    <section className="overflow-hidden rounded-2xl border border-foreground/10 bg-card animate-scale-in">
      <header className="flex items-start justify-between gap-4 border-b border-foreground/10 px-6 py-5">
        <div className="min-w-0">
          <h3 className="text-base font-semibold text-foreground">{title}</h3>
          <p className="mt-1 text-sm text-foreground/45">{description}</p>
        </div>
        <span className="shrink-0 rounded-full bg-foreground/6 px-2.5 py-1 text-xs font-medium tabular-nums text-foreground/70 ring-1 ring-inset ring-foreground/10">
          {items.value.length}
        </span>
      </header>

      <form
        onSubmit={handleCreate}
        className="flex flex-wrap items-end gap-3 border-b border-foreground/10 bg-foreground/2 px-6 py-4"
      >
        <div className="flex min-w-40 flex-1 flex-col gap-1.5">
          <label
            htmlFor={nameId}
            className="text-xs font-medium text-foreground/50"
          >
            Name
          </label>
          <Input
            id={nameId}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Science fiction"
            autoComplete="off"
          />
        </div>

        {withCode && (
          <div className="flex w-full flex-col gap-1.5 sm:w-36">
            <label
              htmlFor={codeId}
              className="text-xs font-medium text-foreground/50"
            >
              Code
            </label>
            <Input
              id={codeId}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="en, USA"
              autoComplete="off"
              className="font-mono"
            />
          </div>
        )}

        <Button
          type="submit"
          size="sm"
          disabled={isPending || !canSubmit}
          className="w-full sm:w-auto"
        >
          {isPending && deletingId === null ? (
            <Loader2 className="animate-spin" size={14} />
          ) : (
            <Plus size={14} />
          )}
          Add {title.toLowerCase().replace(/s$/, "")}
        </Button>
      </form>

      <div className="p-3">
        {items.value.length === 0 ? (
          <div className="grid place-items-center gap-1 rounded-xl border border-dashed border-foreground/10 px-6 py-10 text-center">
            <p className="text-sm font-medium text-foreground/70">
              No {title.toLowerCase()} yet
            </p>
            <p className="text-xs text-foreground/40">
              Use the form above to add the first one.
            </p>
          </div>
        ) : (
          <ul className="flex max-h-96 flex-col gap-0.5 overflow-y-auto">
            {items.value.map((item) => (
              <EntityRow
                key={item.id}
                item={item}
                withCode={withCode}
                isDeleting={deletingId === item.id}
                disabled={isPending}
                onDelete={handleDelete}
              />
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};
