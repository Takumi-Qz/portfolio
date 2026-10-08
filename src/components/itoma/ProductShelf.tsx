"use client";

import { useRef } from "react";
import type { Product } from "@/lib/itoma/data";
import { gsap, useGSAP } from "@/lib/gsap";
import { ProductCard } from "./ProductCard";

/** 縦スクロールに合わせて商品が横へ流れる棚（PC）。スマホは横スワイプ */
export function ProductShelf({ items, children }: { items: Product[]; children: React.ReactNode }) {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        const el = track.current!;
        const dist = () => el.scrollWidth - window.innerWidth;
        gsap.to(el, {
          x: () => -dist(),
          ease: "none",
          scrollTrigger: {
            trigger: section.current,
            start: "top top",
            end: () => `+=${dist()}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => gsap.set(bar.current, { scaleX: self.progress }),
          },
        });
        // 棚の商品が少しずつ傾いて入ってくる
        gsap.utils.toArray<HTMLElement>(".shelf-item").forEach((item, i) =>
          gsap.from(item, { y: i % 2 ? 80 : 40, duration: 1.2, ease: "power3.out", scrollTrigger: { trigger: section.current, start: "top 70%", once: true } }),
        );
      });
    },
    { scope: section },
  );

  return (
    <section ref={section} className="relative overflow-hidden py-20 md:flex md:h-screen md:flex-col md:justify-center md:py-0">
      <div
        ref={track}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-6 md:snap-none md:gap-10 md:overflow-visible md:px-10 md:pb-0"
      >
        <div className="flex w-[70vw] shrink-0 flex-col justify-between md:w-[28vw]">{children}</div>
        {items.map((p, i) => (
          <div key={p.slug} className={`shelf-item w-[64vw] shrink-0 snap-start md:w-[22vw] ${i % 2 ? "md:mt-24" : ""}`}>
            <ProductCard product={p} />
          </div>
        ))}
        <div className="w-px shrink-0 md:w-10" />
      </div>
      <div className="mx-5 mt-6 hidden h-px bg-line md:mx-10 md:mt-14 md:block">
        <div ref={bar} className="h-full origin-left scale-x-0 bg-ink" />
      </div>
    </section>
  );
}
