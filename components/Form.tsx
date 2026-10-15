export const LABEL_TEXT =
  "block text-xs tracking-widest uppercase text-foreground/60";
export const CONTROL =
  "mt-1 w-full rounded-sm border border-foreground/10 bg-foreground/5 px-2 py-1 text-foreground outline-0";

export const Field = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <label className="block min-w-0 flex-1">
    <span className={LABEL_TEXT}>{label}</span>
    {children}
  </label>
);

export const TextInput = ({
  name,
  defaultValue,
  inputMode,
  placeholder,
}: {
  name: string;
  defaultValue?: string | number;
  inputMode?: "numeric" | "decimal";
  placeholder?: string;
}) => (
  <input
    type="text"
    name={name}
    defaultValue={defaultValue}
    inputMode={inputMode}
    placeholder={placeholder}
    className={`${CONTROL} placeholder:text-sm`}
  />
);
