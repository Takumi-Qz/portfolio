import { asset } from "@/lib/asset";

// ここを自分の情報に書き換えてください
export const profile = {
  name: "YOUR NAME",
  nameJa: "お名前",
  role: "Web Designer / Developer",
  location: "Japan",
  email: "hello@example.com",
  intro:
    "ECサイトの構築、コーポレートサイト、LPの設計から実装までを一人で担当しています。見た目を整えるだけでなく、商品が選ばれて、カートに入って、また戻ってきてもらうまでの流れをつくることを大事にしています。",
};

export type Work = {
  no: string;
  title: string;
  kind: string;
  stack: string;
  year: string;
  href?: string;
  summary: string;
  swatch: string[];
  cover?: string;
};

export const works: Work[] = [
  {
    no: "01",
    title: "ITOMA いとま",
    kind: "EC Site",
    stack: "Shopify想定 / Next.js",
    year: "2026",
    href: "/works/itoma",
    summary: "京都の小さなスキンケア工房（架空）のオンラインストア。全15ページ、カート・バリエーション選択・法的ページまで。",
    swatch: ["#f2ede4", "#23201c", "#9a5b3f", "#6f7458"],
  },
  {
    no: "02",
    title: "岡部製作所",
    kind: "Corporate",
    stack: "Next.js",
    year: "2026",
    href: "/works/okabe",
    summary: "東大阪の精密切削加工の町工場（架空）のコーポレートサイト。全6ページ、加工実績の絞り込み、図面添付つき見積りフォーム。",
    swatch: ["#e9e9e5", "#15171a", "#5c6267", "#d48a1c"],
    cover: asset("/works/okabe/hero.webp"),
  },
  {
    no: "03",
    title: "ほとり",
    kind: "LP",
    stack: "Next.js",
    year: "2026",
    href: "/works/hotori",
    summary: "白樺湖畔の薪サウナ宿（架空）の予約LP。写真12点の色調統一、スクロール連動の過ごし方紹介、空室カレンダー。",
    swatch: ["#1e2a25", "#d9772b", "#ede8df", "#93a098"],
    cover: asset("/works/hotori/hero.webp"),
  },
];
