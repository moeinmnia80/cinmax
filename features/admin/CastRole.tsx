"use client";

import { cn } from "@/utils";
import { ROLE_SUGGESTIONS } from "@/constants/castRole";

interface CastRoleProps {
  role: string;
  onRoleChange: (
    e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ) => void;
  onRoleClick: (value: string) => void;
}

export const CastRole = ({
  role,
  onRoleChange,
  onRoleClick,
}: CastRoleProps) => {
  return (
    <div className="space-y-2">
      <input
        type="text"
        name="cast-role"
        value={role}
        onChange={onRoleChange}
        maxLength={50}
        placeholder="Role (e.g. Lead Actor)"
        className="w-full rounded-md border border-foreground/10 bg-transparent px-3 py-2 text-sm outline-none transition focus:border-foreground/30"
      />
      <div className="flex flex-wrap gap-1.5">
        {ROLE_SUGGESTIONS.map((suggestion) => (
          <button
            key={suggestion}
            type="button"
            onClick={(e) => {
              e.preventDefault();
              onRoleClick(suggestion);
            }}
            className={cn(
              "rounded-full border px-2.5 py-0.5 text-xs transition-colors",
              role === suggestion
                ? "border-foreground/40 bg-foreground/10"
                : "border-foreground/10 text-foreground/60 hover:bg-foreground/5",
            )}
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  );
};
