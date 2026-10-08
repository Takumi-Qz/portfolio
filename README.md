# Portfolio

Web 制作の実績サイト。EC サイト・コーポレートサイト・LP の制作例を載せ、受託の窓口にする。

- 状態: 制作開始
- 事業ページ（GENTO）: [Portfolio サイト](https://github.com/gento-inc/gento-company-os/blob/main/docs/businesses/portfolio.md)

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

Next.js 16 を使っている。書き方が従来と違う点があるので `AGENTS.md` を参照。
