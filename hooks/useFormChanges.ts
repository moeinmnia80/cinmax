import {
  useRef,
  useState,
  useEffect,
  useCallback,
  useEffectEvent,
} from "react";

const IGNORED = /^(\$ACTION_|search-)/;

const norm = (v: FormDataEntryValue) =>
  v instanceof File
    ? v.size === 0
      ? ""
      : `${v.name}:${v.size}:${v.lastModified}`
    : v.trim();
const entries = (data: FormData) =>
  [...data]
    .filter(([k]) => !IGNORED.test(k))
    .map(([k, v]) => `${k}=${norm(v)}`)
    .sort();

const snapshot = (data: FormData) => JSON.stringify(entries(data));

const hasValue = (data: FormData, name: string) =>
  data
    .getAll(name)
    .some((v) => (v instanceof File ? v.size > 0 : v.trim() !== ""));

export function useFormChanges(requiredFields: readonly string[]) {
  const [form, setForm] = useState<HTMLFormElement | null>(null);
  const baseline = useRef("");
  const touched = useRef(false);
  const [status, setStatus] = useState({ dirty: false, valid: false });

  const check = useEffectEvent(() => {
    if (!form) return;
    const data = new FormData(form);
    const dirty = snapshot(data) !== baseline.current;
    const valid = requiredFields.every((name) => hasValue(data, name));
    setStatus((prev) =>
      prev.dirty === dirty && prev.valid === valid ? prev : { dirty, valid },
    );
  });

  const rebaseline = useEffectEvent(() => {
    if (!form) return;
    touched.current = false;
    baseline.current = snapshot(new FormData(form));
    check();
  });

  const requiredKey = requiredFields.join("|");
  useEffect(() => {
    check();
  }, [requiredKey]);

  useEffect(() => {
    if (!form) return;

    touched.current = false;
    let raf = 0;
    let settleTimer: ReturnType<typeof setTimeout> | undefined;

    const schedule = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => check());
    };

    const settle = () => {
      if (touched.current) return schedule();
      clearTimeout(settleTimer);
      settleTimer = setTimeout(() => rebaseline(), 50);
    };

    const onUserEvent = (e: Event) => {
      if (e.isTrusted) touched.current = true;
      schedule();
    };

    const events = ["input", "change", "click", "keyup", "reset"] as const;
    events.forEach((e) => form.addEventListener(e, onUserEvent));

    const observer = new MutationObserver(settle);
    observer.observe(form, { childList: true, subtree: true });

    settle();

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(settleTimer);
      observer.disconnect();
      events.forEach((e) => form.removeEventListener(e, onUserEvent));
    };
  }, [form]);

  const commitRef = useRef<() => void>(() => {});
  useEffect(() => {
    commitRef.current = () => rebaseline();
  });
  const resetBaseline = useCallback(() => commitRef.current(), []);

  return { formRef: setForm, ...status, resetBaseline };
}
