import { useCallback, useEffect, useRef, useState } from "react";

function snapshot(form: HTMLFormElement) {
  const entries: [string, string][] = [];
  for (const [key, value] of new FormData(form)) {
    entries.push([
      key,
      value instanceof File
        ? `${value.name}:${value.size}:${value.lastModified}`
        : value.trim(),
    ]);
  }
  return JSON.stringify(entries);
}

function hasValue(form: HTMLFormElement, name: string) {
  const value = new FormData(form).get(name);
  if (value instanceof File) return value.size > 0;
  return typeof value === "string" && value.trim() !== "";
}

export function useFormChanges(requiredFields: readonly string[]) {
  const formRef = useRef<HTMLFormElement>(null);
  const baseline = useRef("");
  const [dirty, setDirty] = useState(false);
  const [valid, setValid] = useState(false);

  const check = useCallback(() => {
    const form = formRef.current;
    if (!form) return;
    setDirty(snapshot(form) !== baseline.current);
    setValid(requiredFields.every((name) => hasValue(form, name)));
  }, [requiredFields]);

  const resetBaseline = useCallback(() => {
    const form = formRef.current;
    if (!form) return;
    baseline.current = snapshot(form);
    check();
  }, [check]);

  useEffect(() => {
    const form = formRef.current;
    if (!form) return;

    let raf = requestAnimationFrame(resetBaseline);

    const schedule = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(check);
    };

    const events = ["input", "change", "click", "keyup"] as const;
    events.forEach((e) => form.addEventListener(e, schedule));
    return () => {
      cancelAnimationFrame(raf);
      events.forEach((e) => form.removeEventListener(e, schedule));
    };
  }, [check, resetBaseline]);

  return { formRef, dirty, valid, resetBaseline };
}
