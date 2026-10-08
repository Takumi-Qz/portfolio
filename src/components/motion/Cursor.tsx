"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

/** マウス追従のリング。data-cursor="ラベル" の要素に乗るとラベル付きの円に広がる */
export function Cursor({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const ref = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState<string | null>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- 端末判定はマウント後にしかできない
    setEnabled(true);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!enabled || !el) return;
    const x = gsap.quickTo(el, "x", { duration: 0.45, ease: "power3" });
    const y = gsap.quickTo(el, "y", { duration: 0.45, ease: "power3" });
    const move = (e: PointerEvent) => {
      x(e.clientX);
      y(e.clientY);
      const t = (e.target as HTMLElement).closest<HTMLElement>("[data-cursor]");
      setLabel(t ? t.dataset.cursor || "" : null);
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, [enabled]);

  if (!enabled) return null;
  const active = label !== null;
  const color = tone === "dark" ? "bg-ink text-kinari" : "bg-signal text-white";

  return (
    <div ref={ref} aria-hidden className="pointer-events-none fixed left-0 top-0 z-[100]">
      <div
        className={`-translate-x-1/2 -translate-y-1/2 rounded-full grid place-items-center transition-[width,height,background-color,border-color] duration-500 ease-[cubic-bezier(.2,.8,.2,1)] ${
          active ? `h-20 w-20 ${color}` : "h-3 w-3 border border-current bg-transparent"
        }`}
      >
        <span className={`text-[11px] tracking-[0.2em] transition-opacity duration-300 ${active ? "opacity-100" : "opacity-0"}`}>
          {label}
        </span>
      </div>
    </div>
  );
}
