"use client";

import { ComponentProps, useEffect, useRef, useState } from "react";
import { Calendar1Icon } from "lucide-react";

import { cn } from "@/utils";

export const LABEL_TEXT =
  "block text-xs tracking-widest uppercase text-foreground/60";
export const CONTROL =
  "mt-1 w-full rounded-sm border border-foreground/10 bg-foreground/5 px-2 py-1 text-foreground outline-0";

/* ------------------------------------------------------------------ */
/* Field                                                               */
/* ------------------------------------------------------------------ */

interface FieldProps extends ComponentProps<"label"> {
  label: string;
  error?: string[];
}

export const Field = ({ label, children, className, error }: FieldProps) => (
  <label className={cn("block min-w-0 col-span-4", className)}>
    <span className={LABEL_TEXT}>{label}</span>
    {children}
    {error?.length ? (
      <div className="text-xs font-normal text-destructive">{error[0]}</div>
    ) : null}
  </label>
);

/* ------------------------------------------------------------------ */
/* TextInput                                                           */
/* ------------------------------------------------------------------ */

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

/* ------------------------------------------------------------------ */
/* DatePicker                                                          */
/* ------------------------------------------------------------------ */

type View = "days" | "months" | "years";

type DatePickerProps = {
  name: string;
  /** "YYYY-MM-DD" or a full ISO string such as person.birthDate.toISOString() */
  defaultValue?: string | null;
  placeholder?: string;
  min?: Date;
  max?: Date; // defaults to today
  startView?: View; // view to open on when no date is selected yet
  onChange?: (date: Date | undefined) => void;
};

const pad = (n: number) => String(n).padStart(2, "0");

// Local-date helpers: `new Date("1988-05-16")` parses as UTC and can shift a day
const toISODate = (d: Date) =>
  `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

const fromISODate = (value?: string | null) => {
  if (!value) return undefined;
  // accepts "YYYY-MM-DD" and full ISO ("1998-11-09T00:00:00.000Z")
  const [y, m, d] = value.slice(0, 10).split("-").map(Number);
  const date = new Date(y, m - 1, d);
  return Number.isNaN(date.getTime()) ? undefined : date;
};

// the value that gets submitted: UTC midnight of the picked calendar day
const toSubmitValue = (d: Date) =>
  new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate())).toISOString();

const sameDay = (a?: Date, b?: Date) =>
  !!a && !!b && toISODate(a) === toISODate(b);
const dayStart = (d: Date) =>
  new Date(d.getFullYear(), d.getMonth(), d.getDate());

const formatDate = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
});
const formatTitle = new Intl.DateTimeFormat("en-GB", {
  month: "long",
  year: "numeric",
});
const MONTHS = Array.from({ length: 12 }, (_, i) =>
  new Intl.DateTimeFormat("en-GB", { month: "short" }).format(
    new Date(2000, i, 1),
  ),
);
const WEEKDAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"]; // week starts on Monday

export function DatePicker({
  name,
  defaultValue,
  placeholder = "Select date",
  min = new Date(1900, 0, 1),
  max = new Date(),
  startView = "days",
  onChange,
}: DatePickerProps) {
  const [date, setDate] = useState(() => fromISODate(defaultValue));
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<View>("days");
  const [cursor, setCursor] = useState(() => fromISODate(defaultValue) ?? max);
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // follow the saved value (after save + revalidate, or when switching person)
  const [prevDefault, setPrevDefault] = useState(defaultValue);
  if (defaultValue !== prevDefault) {
    setPrevDefault(defaultValue);
    setDate(fromISODate(defaultValue));
  }

  const today = dayStart(new Date());
  const lo = dayStart(min);
  const hi = dayStart(max);
  const outOfRange = (d: Date) => d < lo || d > hi;
  const yearOutOfRange = (y: number) =>
    new Date(y, 11, 31) < lo || new Date(y, 0, 1) > hi;
  const monthOutOfRange = (y: number, m: number) =>
    new Date(y, m + 1, 0) < lo || new Date(y, m, 1) > hi;

  const year = cursor.getFullYear();
  const month = cursor.getMonth();
  const pageStart = Math.floor(year / 12) * 12;

  const iso = date ? toISODate(date) : "";
  const submitValue = date ? toSubmitValue(date) : "";
  const lastSent = useRef(iso);

  // close on outside click / Escape
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) =>
      e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  // React 19 resets the form after an action: restore the UI too
  useEffect(() => {
    const form = inputRef.current?.form;
    if (!form) return;
    const onReset = () => setDate(fromISODate(defaultValue));
    form.addEventListener("reset", onReset);
    return () => form.removeEventListener("reset", onReset);
  }, [defaultValue]);

  // tell the form AFTER the hidden input has the new value (enables Save)
  useEffect(() => {
    if (iso === lastSent.current) return;
    lastSent.current = iso;
    const input = inputRef.current;
    input?.dispatchEvent(new Event("input", { bubbles: true }));
    input?.dispatchEvent(new Event("change", { bubbles: true }));
  }, [iso]);

  const toggle = () => {
    if (!open) {
      setCursor(date ?? max);
      setView(date ? "days" : startView);
    }
    setOpen((v) => !v);
  };

  const commit = (next?: Date) => {
    setDate(next);
    setOpen(false);
    onChange?.(next);
  };

  const shift = (dir: 1 | -1) =>
    setCursor(
      view === "days"
        ? new Date(year, month + dir, 1)
        : new Date(year + dir * (view === "years" ? 12 : 1), month, 1),
    );

  const canShift = (dir: 1 | -1) => {
    if (view === "days") {
      const t = new Date(year, month + dir, 1);
      return !monthOutOfRange(t.getFullYear(), t.getMonth());
    }
    if (view === "months") return !yearOutOfRange(year + dir);
    const start = pageStart + dir * 12;
    return !(yearOutOfRange(start) && yearOutOfRange(start + 11));
  };

  const zoomOut = () => setView(view === "days" ? "months" : "years");

  const title =
    view === "days"
      ? formatTitle.format(cursor)
      : view === "months"
        ? String(year)
        : `${pageStart} – ${pageStart + 11}`;

  // 6 weeks × 7 days, including the neighbouring months' days
  const offset = (new Date(year, month, 1).getDay() + 6) % 7;
  const days = Array.from(
    { length: 42 },
    (_, i) => new Date(year, month, 1 - offset + i),
  );

  const cell =
    "grid h-9 place-items-center rounded-lg text-sm transition-colors hover:bg-foreground/10 disabled:pointer-events-none disabled:opacity-25";
  const selectedCell = "bg-foreground text-background hover:bg-foreground";

  return (
    <div ref={rootRef} className="relative">
      <input
        ref={inputRef}
        type="hidden"
        name={name}
        value={submitValue}
        readOnly
      />

      <button
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={toggle}
        className={cn(
          CONTROL,
          "flex w-full items-center justify-between text-left font-normal text-md",
        )}
      >
        <span className={date ? "" : "text-foreground/40"}>
          {date ? formatDate.format(date) : placeholder}
        </span>
        <Calendar1Icon size={15} />
      </button>

      {open && (
        <div
          role="dialog"
          aria-label="Choose date"
          className="absolute left-0 z-20 mt-1 w-64 animate-slide-down rounded-xl border border-foreground/10 bg-foreground/5 backdrop-blur-2xl p-3 shadow-2xl"
        >
          <div className="mb-2 flex items-center justify-between">
            <NavButton
              label="Previous"
              disabled={!canShift(-1)}
              onClick={() => shift(-1)}
              dir="left"
            />
            <button
              type="button"
              onClick={zoomOut}
              disabled={view === "years"}
              className="rounded-md px-2 py-1 font-mono text-xs uppercase tracking-widest transition-colors hover:bg-foreground/10 disabled:pointer-events-none"
            >
              {title}
            </button>
            <NavButton
              label="Next"
              disabled={!canShift(1)}
              onClick={() => shift(1)}
              dir="right"
            />
          </div>

          {view === "days" && (
            <>
              <div className="mb-1 grid grid-cols-7 text-center font-mono text-[10px] uppercase tracking-widest text-foreground/40">
                {WEEKDAYS.map((d) => (
                  <span key={d}>{d}</span>
                ))}
              </div>
              <div className="grid grid-cols-7">
                {days.map((d) => (
                  <button
                    key={d.getTime()}
                    type="button"
                    disabled={outOfRange(d)}
                    aria-pressed={sameDay(d, date)}
                    onClick={() => commit(d)}
                    className={cn(
                      cell,
                      d.getMonth() !== month && "text-foreground/25",
                      sameDay(d, today) &&
                        "ring-1 ring-inset ring-foreground/30",
                      sameDay(d, date) && selectedCell,
                    )}
                  >
                    {d.getDate()}
                  </button>
                ))}
              </div>
            </>
          )}

          {view === "months" && (
            <div className="grid grid-cols-3 gap-1">
              {MONTHS.map((label, m) => (
                <button
                  key={label}
                  type="button"
                  disabled={monthOutOfRange(year, m)}
                  onClick={() => {
                    setCursor(new Date(year, m, 1));
                    setView("days");
                  }}
                  className={cn(
                    cell,
                    "h-11 uppercase tracking-wider",
                    date?.getFullYear() === year &&
                      date.getMonth() === m &&
                      selectedCell,
                  )}
                >
                  {label}
                </button>
              ))}
            </div>
          )}

          {view === "years" && (
            <div className="grid grid-cols-3 gap-1">
              {Array.from({ length: 12 }, (_, i) => pageStart + i).map((y) => (
                <button
                  key={y}
                  type="button"
                  disabled={yearOutOfRange(y)}
                  onClick={() => {
                    setCursor(new Date(y, month, 1));
                    setView("months");
                  }}
                  className={cn(
                    cell,
                    "h-11",
                    date?.getFullYear() === y && selectedCell,
                  )}
                >
                  {y}
                </button>
              ))}
            </div>
          )}

          <div className="mt-2 flex items-center justify-between border-t border-foreground/10 pt-2 font-mono text-xs uppercase tracking-widest text-foreground/50">
            <button
              type="button"
              onClick={() => commit(undefined)}
              className="px-2 py-1 transition-colors hover:text-foreground"
            >
              Clear
            </button>
            <button
              type="button"
              disabled={outOfRange(today)}
              onClick={() => commit(today)}
              className="px-2 py-1 transition-colors hover:text-foreground disabled:opacity-30"
            >
              Today
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function NavButton({
  dir,
  label,
  ...props
}: { dir: "left" | "right"; label: string } & React.ComponentProps<"button">) {
  return (
    <button
      type="button"
      aria-label={label}
      className="grid size-8 place-items-center rounded-md text-foreground/60 transition-colors hover:bg-foreground/10 hover:text-foreground disabled:pointer-events-none disabled:opacity-25"
      {...props}
    >
      <svg
        viewBox="0 0 16 16"
        className="size-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d={dir === "left" ? "M10 3 5 8l5 5" : "M6 3l5 5-5 5"} />
      </svg>
    </button>
  );
}
