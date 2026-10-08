"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { gsap, prefersReduced, ScrollTrigger } from "@/lib/gsap";

let lenis: Lenis | null = null;
export const getLenis = () => lenis;

/** Lenis の慣性スクロールを GSAP の ticker に同期させる */
export function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (prefersReduced()) return;
    lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 0.9 });
    lenis.on("scroll", ScrollTrigger.update);
    const raf = (t: number) => lenis?.raf(t * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(raf);
      lenis?.destroy();
      lenis = null;
    };
  }, []);

  useEffect(() => {
    lenis?.scrollTo(0, { immediate: true, force: true });
  }, [pathname]);

  return null;
}
