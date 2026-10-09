"use client";

import { usePathname } from "next/navigation";
import { gsap, prefersReduced, ScrollTrigger, SplitText, useGSAP } from "@/lib/gsap";

/**
 * data 属性だけでアニメーションを付ける仕組み。サーバーコンポーネントのまま使える。
 *  data-split="lines" … 行ごとにマスクの下からせり上がる
 *  data-split="chars" … 一文字ずつ墨がにじむように現れる
 *  data-reveal="up"   … 下からフェードイン
 *  data-reveal="clip" … 下から幕が開くように現れる（中身は少し縮む）
 *  data-stagger       … 子要素を順番にフェードイン
 *  data-speed="0.2"   … スクロールに合わせた視差
 *  data-count         … 数字をカウントアップ
 */
// once: true だと、表示済みの要素のトリガーが refresh 中に自分を消してしまい、
// 後から作るトリガーで ScrollTrigger が落ちることがある。一度だけ再生して残しておく
const PLAY_ONCE = "play none none none";

export function Animations() {
  const pathname = usePathname();

  useGSAP(
    (_, contextSafe) => {
      const q = <T extends Element = HTMLElement>(s: string) => gsap.utils.toArray<T>(s);
      const all = q("[data-split],[data-reveal],[data-stagger]");

      if (prefersReduced()) {
        gsap.set(all, { autoAlpha: 1 });
        return;
      }

      let started = false;
      const start = contextSafe!(() => {
        if (started) return;
        started = true;
        q("[data-split]").forEach((el) => {
          const chars = el.dataset.split === "chars";
          gsap.set(el, { autoAlpha: 1 });
          SplitText.create(el, {
            type: chars ? "chars" : "lines",
            mask: chars ? undefined : "lines",
            autoSplit: true,
            onSplit: (self) =>
              chars
                ? gsap.from(self.chars, {
                    autoAlpha: 0,
                    filter: "blur(10px)",
                    y: 8,
                    duration: 1.4,
                    ease: "power2.out",
                    stagger: 0.07,
                    delay: Number(el.dataset.delay ?? 0),
                    scrollTrigger: { trigger: el, start: "top 88%", toggleActions: PLAY_ONCE },
                  })
                : gsap.from(self.lines, {
                    yPercent: 110,
                    duration: 1.2,
                    ease: "expo.out",
                    stagger: 0.09,
                    delay: Number(el.dataset.delay ?? 0),
                    scrollTrigger: { trigger: el, start: "top 88%", toggleActions: PLAY_ONCE },
                  }),
          });
        });

        q("[data-reveal='up']").forEach((el) =>
          gsap.fromTo(
            el,
            { autoAlpha: 0, y: 40 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 1.2,
              ease: "power3.out",
              delay: Number(el.dataset.delay ?? 0),
              scrollTrigger: { trigger: el, start: "top 90%", toggleActions: PLAY_ONCE },
            },
          ),
        );

        q("[data-reveal='clip']").forEach((el) => {
          const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 85%", toggleActions: PLAY_ONCE } });
          tl.set(el, { autoAlpha: 1 })
            .fromTo(el, { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.6, ease: "expo.inOut" })
            .from(el.firstElementChild, { scale: 1.25, duration: 2, ease: "expo.out" }, "<0.2");
        });

        q("[data-stagger]").forEach((el) => {
          gsap.set(el, { autoAlpha: 1 });
          gsap.from(el.children, {
            autoAlpha: 0,
            y: 30,
            duration: 1,
            ease: "power3.out",
            stagger: 0.1,
            scrollTrigger: { trigger: el, start: "top 88%", toggleActions: PLAY_ONCE },
          });
        });

        q("[data-speed]").forEach((el) =>
          gsap.fromTo(el, { yPercent: 50 * Number(el.dataset.speed) }, {
            yPercent: -50 * Number(el.dataset.speed),
            ease: "none",
            scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
          }),
        );

        q("[data-count]").forEach((el) => {
          // 再実行（開発時の StrictMode やページ遷移）で途中の数字を読まないよう、最初の値を覚えておく
          const to = Number((el.dataset.countTo ??= el.textContent ?? "0"));
          const obj = { v: 0 };
          gsap.to(obj, {
            v: to,
            duration: 1.8,
            ease: "power2.out",
            onUpdate: () => (el.textContent = String(Math.round(obj.v))),
            scrollTrigger: { trigger: el, start: "top 92%", toggleActions: PLAY_ONCE },
          });
        });

        document.fonts?.ready.then(() => ScrollTrigger.refresh());
      });

      // プリローダー再生中は、幕が上がってから始める
      // （タブが裏にあって描画が止まっている場合に備え、一定時間で強制的に始める）
      if (document.documentElement.dataset.intro === "playing") {
        window.addEventListener("intro-done", start, { once: true });
        const fallback = setTimeout(start, 6000);
        return () => {
          window.removeEventListener("intro-done", start);
          clearTimeout(fallback);
        };
      }
      start();
    },
    { dependencies: [pathname], revertOnUpdate: true },
  );

  return null;
}
