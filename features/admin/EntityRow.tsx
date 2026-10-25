import { memo } from "react";
import { Loader2, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/Button";

interface EntityRowProps {
  item: {
    id: number;
    name: string;
    code?: string;
    slug?: string;
    createdAt: Date;
    updatedAt: Date;
  };
  withCode: boolean;
  isDeleting: boolean;
  disabled: boolean;
  onDelete: (id: number) => void;
}
export const EntityRow = memo(function EntityRow({
  item,
  withCode,
  isDeleting,
  disabled,
  onDelete,
}: EntityRowProps) {
  return (
    <li
      className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-foreground/4 focus-within:bg-foreground/4 ${
        isDeleting ? "opacity-50" : ""
      }`}
    >
      <span
        aria-hidden
        className="grid size-9 shrink-0 place-items-center rounded-lg bg-foreground/6 text-sm font-semibold text-foreground/70 ring-1 ring-inset ring-foreground/10"
      >
        {item.name.charAt(0).toUpperCase()}
      </span>

      <span className="min-w-0 flex-1 truncate text-sm font-medium text-foreground">
        {item.name}
      </span>

      {withCode && item.code && (
        <span className="shrink-0 rounded-md bg-foreground/6 px-2 py-0.5 font-mono text-xs text-foreground/60 ring-1 ring-inset ring-foreground/10">
          {item.code}
        </span>
      )}

      <Button
        variant="ghost"
        size="icon"
        onClick={() => onDelete(item.id)}
        disabled={disabled}
        aria-label={`Delete ${item.name}`}
        className="shrink-0 opacity-100 transition-opacity md:opacity-0 md:group-hover:opacity-100 md:focus-visible:opacity-100 md:group-focus-within:opacity-100"
      >
        {isDeleting ? (
          <Loader2 className="animate-spin" size={14} />
        ) : (
          <Trash2 size={14} className="text-destructive" />
        )}
      </Button>
    </li>
  );
});
