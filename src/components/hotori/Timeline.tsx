"use client";

import { useRef } from "react";
import { photo, timeline } from "@/lib/hotori/data";
import { gsap, prefersReduced, useGSAP } from "@/lib/gsap";

/**
 * 到着から夜までを、スクロールに合わせて一場面ずつ見せる。
 * PCは画面を固定して写真を下から幕を開けるように差し替え、スマホは縦に並べるだけ。
 */
export function Timeline() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    (_, contextSafe) => {
      if (prefersReduced()) return;
      const mm = gsap.matchMedia();
      // ページ全体の data 属性アニメーション（上にある要素）が先に登録されてから固定する
      const setup = contextSafe!(() => mm.add("(min-width: 768px)", () => {
        const q = gsap.utils.selector(root);
        const imgs = q("[data-shot]");
        const texts = q("[data-step]");
        const ticks = q("[data-tick]");
        const n = timeline.length;

        gsap.set(imgs.slice(1), { clipPath: "inset(100% 0% 0% 0%)" });
        gsap.set(texts.slice(1), { autoAlpha: 0, y: 40 });

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: q("[data-pin]")[0],
            start: "top top",
            end: `+=${(n - 1) * 90}%`,
            pin: true,
            scrub: 0.8,
            snap: { snapTo: 1 / (n - 1), duration: 0.5, ease: "power2.inOut" },
          },
        });
        for (let i = 1; i < n; i++) {
          tl.to(imgs[i], { clipPath: "inset(0% 0% 0% 0%)", duration: 1, ease: "power2.inOut" }, i - 1)
            .fromTo(imgs[i].firstElementChild, { scale: 1.2 }, { scale: 1, duration: 1 }, i - 1)
            .to(imgs[i - 1].firstElementChild, { scale: 1.08, yPercent: -4, duration: 1 }, i - 1)
            .to(texts[i - 1], { autoAlpha: 0, y: -40, duration: 0.4 }, i - 1)
            .to(texts[i], { autoAlpha: 1, y: 0, duration: 0.4 }, i - 0.5)
            .to(ticks[i], { color: "var(--color-hi)", duration: 0.1 }, i - 0.5)
            .to(ticks[i - 1], { color: "rgb(237 232 223 / 0.35)", duration: 0.1 }, i - 0.5);
        }
      }));
      const id = requestAnimationFrame(setup);
      return () => {
        cancelAnimationFrame(id);
        mm.revert();
      };
    },
    { scope: root },
  );

  return (
    <div ref={root}>
      {/* PC：固定して切り替え */}
      <div data-pin className="hidden h-screen overflow-hidden md:grid md:grid-cols-12">
        <div className="relative col-span-5 flex flex-col justify-between px-10 pb-14 pt-24 lg:px-16">
          <ol className="num flex gap-5 text-sm">
            {timeline.map((t, i) => (
              <li key={t.time} data-tick style={{ color: i === 0 ? "var(--color-hi)" : "rgb(237 232 223 / 0.35)" }}>
                {t.time}
              </li>
            ))}
          </ol>
          <div className="relative min-h-[46vh]">
            {timeline.map((t) => (
              <div key={t.time} data-step className="absolute inset-x-0 bottom-0">
                <p className="num text-[clamp(64px,8vw,120px)] font-black leading-none tracking-[-0.02em] text-hi">{t.time}</p>
                <h3 className="mt-6 text-[clamp(26px,2.6vw,38px)] font-black leading-[1.35]">{t.title}</h3>
                <p className="mt-5 max-w-[30em] text-[15px] leading-[2.05] text-yuki/75">{t.body}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="relative col-span-7">
          {timeline.map((t) => (
            <div key={t.time} data-shot className="absolute inset-0 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={photo(t.img)} alt="" className="h-full w-full object-cover" />
            </div>
          ))}
        </div>
      </div>

      {/* スマホ：縦に並べる */}
      <ol className="space-y-16 px-5 md:hidden">
        {timeline.map((t) => (
          <li key={t.time}>
            <div data-reveal="clip" className="aspect-[4/5] overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={photo(t.img)} alt="" className="h-full w-full object-cover" loading="lazy" />
            </div>
            <p className="num mt-6 text-5xl font-black text-hi">{t.time}</p>
            <h3 className="mt-3 text-2xl font-black leading-snug">{t.title}</h3>
            <p className="mt-3 text-[15px] leading-[2] text-yuki/75">{t.body}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
