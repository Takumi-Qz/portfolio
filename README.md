# Portfolio

Web 制作の実績サイト。EC サイト・コーポレートサイト・LP の制作例を載せ、受託の窓口にする。

- 状態: 制作開始

## 構成

| パス | 内容 |
|---|---|
| `src/app/page.tsx` | トップ（実績一覧） |
| `src/app/works/itoma/` | 制作例 1: 架空ブランド「itoma」の EC サイト（商品・コレクション・カート・読みもの・FAQ・問い合わせ・法務ページ） |

## 開発

```bash
npm install
npm run dev     # http://localhost:3123
npm run build
```

## 使っている主なライブラリ

- [GSAP](https://gsap.com/)（ScrollTrigger / SplitText）… スクロール連動のアニメーション
- [Lenis](https://github.com/darkroomengineering/lenis) … 慣性スクロール
- React `ViewTransition` … 商品画像のページ間トランジション

アニメーションは `data-split` / `data-reveal` / `data-stagger` / `data-speed` / `data-count` 属性で付ける（`src/components/motion/Animations.tsx`）。

Next.js 16 を使っている。書き方が従来と違う点があるので `AGENTS.md` を参照。
