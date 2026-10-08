import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

export const prefersReduced = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export { gsap, ScrollTrigger, SplitText, useGSAP };

// 開発時のみ：ブラウザのコンソールから確認できるようにする
if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
  Object.assign(window, { gsap, ScrollTrigger });
}
