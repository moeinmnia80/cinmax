import { useCallback, useEffect, useRef, useState } from "react";

export function useSlider(length: number) {
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const pendingRef = useRef<number | null>(null);
  const [current, setCurrent] = useState(0);

  const handleScroll = useCallback(() => {
    if (rafRef.current) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      const el = sliderRef.current;
      if (!el || !el.clientWidth) return;
      const index = Math.round(el.scrollLeft / el.clientWidth);
      setCurrent((prev) => (prev === index ? prev : index));
    });
  }, []);

  const scrollTo = useCallback((index: number) => {
    const el = sliderRef.current;
    if (!el) return;
    el.scrollTo({ left: el.clientWidth * index, behavior: "smooth" });
  }, []);

  const scrollOnNextRender = useCallback((index: number) => {
    pendingRef.current = index;
  }, []);

  useEffect(() => {
    if (pendingRef.current === null) return;
    scrollTo(pendingRef.current);
    pendingRef.current = null;
  }, [length, scrollTo]);

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return { sliderRef, current, handleScroll, scrollTo, scrollOnNextRender };
}
