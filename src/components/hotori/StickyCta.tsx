"use client";

import { useEffect, useState } from "react";

/** ファーストビューを過ぎたら出す予約ボタン */
export function StickyCta({ price }: { price: string }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // ファーストビュー・カレンダー・最後のCTA・フッターが見えている間は隠す
    const targets = document.querySelectorAll("[data-hide-cta]");
    const seen = new Map<Element, boolean>();
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) seen.set(e.target, e.isIntersecting);
      setShow(![...seen.values()].some(Boolean));
    });
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);

  return (
    <a
      href="#yoyaku"
      className={`fixed inset-x-0 bottom-0 z-40 flex items-center justify-between bg-hi px-5 py-4 text-moku-deep transition-transform duration-500 ease-[cubic-bezier(.2,.8,.2,1)] md:inset-x-auto md:bottom-6 md:right-6 md:gap-8 md:px-7 ${
        show ? "translate-y-0" : "translate-y-[150%]"
      }`}
    >
      <span className="font-bold">空いている日を見る</span>
      <span className="num text-sm">1棟2名 {price}〜</span>
    </a>
  );
}
