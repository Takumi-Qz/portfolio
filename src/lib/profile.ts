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
    title: "Corporate Site",
    kind: "Corporate",
    stack: "Next.js",
    year: "2026",
    summary: "準備中",
    swatch: ["#e6e6e1", "#c9c9c2", "#a8a8a0"],
  },
  {
    no: "03",
    title: "Landing Page",
    kind: "LP",
    stack: "Next.js",
    year: "2026",
    summary: "準備中",
    swatch: ["#e6e6e1", "#c9c9c2", "#a8a8a0"],
  },
];
