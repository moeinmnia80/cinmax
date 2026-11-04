import { cn } from "@/utils";
import { LABEL_TEXT } from "@/components/Form";

interface Option {
  id: string | number;
  label: string;
}

interface ChipGroupProps {
  type: "radio" | "checkbox";
  name: string;
  label: string;
  options: readonly Option[];
  defaultValue?: readonly (string | number)[];
  error?: string[];
  className?: string;
  onValueChange?: (value: string) => void;
}

export const ChipGroup = ({
  type,
  name,
  label,
  options,
  defaultValue = [],
  error,
  className,
  onValueChange,
}: ChipGroupProps) => {
  const selected = new Set(defaultValue.map(String));

  return (
    <fieldset className={className}>
      <legend className={LABEL_TEXT}>{label}</legend>

      <div className="mt-2 flex flex-wrap gap-2">
        {options.map(({ id, label: optionLabel }) => (
          <label key={id} className="cursor-pointer">
            <input
              type={type}
              name={name}
              value={id}
              defaultChecked={selected.has(String(id))}
              onChange={(e) => e.target.checked && onValueChange?.(String(id))}
              className="peer sr-only"
            />
            <span
              className={cn(
                "block rounded-full border border-foreground/5 bg-foreground/5 px-4 py-2",
                "text-xs font-bold uppercase tracking-wider text-foreground/60 transition-colors",
                "hover:bg-foreground/10 hover:text-foreground",
                "peer-checked:border-foreground peer-checked:bg-foreground peer-checked:text-background",
                "peer-focus-visible:ring-2 peer-focus-visible:ring-foreground/40",
              )}
            >
              {optionLabel}
            </span>
          </label>
        ))}
      </div>

      {error?.[0] && (
        <p className="mt-1 text-xs text-destructive">{error[0]}</p>
      )}
    </fieldset>
  );
};
