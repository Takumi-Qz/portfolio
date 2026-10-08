"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

const KEY = "itoma-intro";

/** 初回だけ流れるオープニング：文字が立ち上がり、数字が進み、幕が上がる */
export function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const count = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const html = document.documentElement;
    let seen = false;
    try {
      seen = sessionStorage.getItem(KEY) === "1";
    } catch {}
    if (seen || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      html.dataset.intro = "done";
      return;
    }
    html.dataset.intro = "playing";

    const finish = () => {
      html.dataset.intro = "done";
      try {
        sessionStorage.setItem(KEY, "1");
      } catch {}
      window.dispatchEvent(new Event("intro-done"));
    };

    const n = { v: 0 };
    const ctx = gsap.context(() => {
      gsap
        .timeline({ onComplete: finish })
        .from(".pl-char", { yPercent: 120, duration: 1.1, ease: "expo.out", stagger: 0.07 })
        .from(".pl-sub", { autoAlpha: 0, y: 10, duration: 0.8 }, "<0.4")
        .to(n, { v: 100, duration: 1.6, ease: "power2.inOut", onUpdate: () => count.current && (count.current.textContent = String(Math.round(n.v)).padStart(3, "0")) }, 0)
        .to(".pl-line", { scaleX: 1, duration: 1.6, ease: "power2.inOut" }, 0)
        .to(".pl-inner", { yPercent: -30, autoAlpha: 0, duration: 0.8, ease: "power3.in" }, "+=0.15")
        .to(root.current, { yPercent: -100, duration: 1.1, ease: "expo.inOut" }, "-=0.35");
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} className="preloader fixed inset-0 z-[90] grid place-items-center bg-ink text-kinari">
      <div className="pl-inner flex flex-col items-center">
        <p className="flex overflow-hidden font-roman text-[16vw] leading-none tracking-[0.2em] md:text-[120px]">
          {"ITOMA".split("").map((c, i) => (
            <span key={i} className="pl-char inline-block">
              {c}
            </span>
          ))}
        </p>
        <p className="pl-sub mt-4 font-mincho text-xs tracking-[0.8em] text-kinari/60">一日の終わりの、三分間</p>
      </div>
      <div className="absolute inset-x-5 bottom-8 flex items-end justify-between gap-6 md:inset-x-10">
        <span className="text-xs tracking-jp text-kinari/50">京都　西陣</span>
        <span className="pl-line mb-2 h-px flex-1 origin-left scale-x-0 bg-kinari/30" />
        <span ref={count} className="num text-4xl font-light leading-none md:text-6xl">
          000
        </span>
      </div>
    </div>
  );
}
