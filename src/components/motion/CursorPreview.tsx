"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

type Row = { key: string; href?: string; row: React.ReactNode; preview: React.ReactNode };

/** 一覧の行にホバーすると、カーソルの横にプレビュー画像が追従して出る */
export function CursorPreview({
  rows,
  rowClassName = "",
  boxClassName = "h-72 w-56",
}: {
  rows: Row[];
  rowClassName?: string;
  boxClassName?: string;
}) {
  const box = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    const el = box.current;
    if (!el || !window.matchMedia("(pointer: fine)").matches) return;
    const x = gsap.quickTo(el, "x", { duration: 0.6, ease: "power3" });
    const y = gsap.quickTo(el, "y", { duration: 0.6, ease: "power3" });
    const r = gsap.quickTo(el, "rotation", { duration: 0.8, ease: "power3" });
    let last = 0;
    const move = (e: PointerEvent) => {
      x(e.clientX + 32);
      y(e.clientY);
      r(gsap.utils.clamp(-8, 8, (e.clientX - last) * 0.6));
      last = e.clientX;
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, []);

  return (
    <div onPointerLeave={() => setActive(null)}>
      {rows.map((r, i) => {
        const props = {
          className: `block ${rowClassName} transition-opacity duration-500 ${active !== null && active !== i ? "opacity-35" : ""}`,
          onPointerEnter: () => setActive(i),
        };
        return r.href ? (
          <Link key={r.key} href={r.href} {...props}>
            {r.row}
          </Link>
        ) : (
          <div key={r.key} {...props}>
            {r.row}
          </div>
        );
      })}

      <div ref={box} aria-hidden className="pointer-events-none fixed left-0 top-0 z-30 hidden md:block">
        <div
          className={`relative -translate-y-1/2 overflow-hidden transition-[opacity,scale] duration-500 ease-[cubic-bezier(.2,.8,.2,1)] ${boxClassName} ${
            active === null ? "scale-75 opacity-0" : "scale-100 opacity-100"
          }`}
        >
          {rows.map((r, i) => (
            <div key={r.key} className={`absolute inset-0 transition-opacity duration-300 ${active === i ? "opacity-100" : "opacity-0"}`}>
              {r.preview}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
