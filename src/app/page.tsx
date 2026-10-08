import Link from "next/link";
import { ProductArt } from "@/components/itoma/ProductArt";
import { Cursor } from "@/components/motion/Cursor";
import { CursorPreview } from "@/components/motion/CursorPreview";
import { Magnetic } from "@/components/motion/Magnetic";
import { Marquee } from "@/components/motion/Marquee";
import { getProduct } from "@/lib/itoma/data";
import { profile, works } from "@/lib/profile";

const services = [
  {
    en: "EC Site",
    ja: "ECサイト構築",
    note: "Shopifyを中心に、テーマのカスタマイズから運用設計まで。",
    items: [
      "トップページ",
      "カテゴリー・商品一覧",
      "商品詳細（バリエーション・在庫表示）",
      "カート",
      "ヘッダー・フッター",
      "ブログ・読みもの",
      "About / FAQ / お問い合わせ",
      "特定商取引法に基づく表記",
      "プライバシーポリシー・利用規約",
      "配送ポリシー・返金ポリシー",
    ],
  },
  {
    en: "Corporate",
    ja: "コーポレートサイト",
    note: "会社の信頼をつくる、更新しやすいサイト。",
    items: ["会社概要・事業紹介", "ニュース・お知らせ", "採用ページ", "お問い合わせフォーム", "CMS導入"],
  },
  {
    en: "Landing Page",
    ja: "LP制作",
    note: "一つの商品・サービスを、一枚で伝えきる。",
    items: ["構成・コピー設計", "デザイン・実装", "フォーム・計測タグ設定", "A/Bテスト用の差し替え"],
  },
];

const process = [
  ["ヒアリング", "1週", "目的・ターゲット・参考サイトを伺い、必要なページを洗い出します。"],
  ["構成・ワイヤー", "1〜2週", "ページごとの情報の順番を決めます。ここで導線をほぼ確定させます。"],
  ["デザイン", "2週", "トップと商品詳細から作り、トーンを固めてから全ページへ展開します。"],
  ["実装・登録", "2〜3週", "テーマの実装、商品登録、決済・配送設定、法的ページの整備。"],
  ["公開・運用", "—", "公開後1か月は無償で修正対応。更新方法のマニュアルもお渡しします。"],
];

export default function Home() {
  return (
    <div className="bg-bone font-grotesk text-coal">
      <header className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-6 text-sm md:px-10">
        <Link href="/" className="font-medium tracking-tight">
          {profile.name}
        </Link>
        <nav className="flex gap-6 md:gap-10">
          <a href="#works" className="link-u">Works</a>
          <a href="#services" className="link-u">Services</a>
          <a href="#contact" className="link-u">Contact</a>
        </nav>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-[1400px] px-5 pb-20 pt-16 md:px-10 md:pb-32 md:pt-28">
        <p data-reveal="up" className="mb-8 flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-ash">
          <span className="inline-block h-2 w-2 rounded-full bg-signal" />
          Available for new projects — 2026
        </p>
        <h1 data-split="lines" className="max-w-[16ch] text-[13vw] font-medium leading-[0.92] tracking-[-0.045em] md:text-[8.5vw] xl:text-[128px]">
          Sites that sell,
          <br />
          <span className="font-roman font-normal italic tracking-[-0.02em]">quietly.</span>
        </h1>
        <div className="mt-14 grid gap-8 border-t border-coal/15 pt-8 md:grid-cols-12">
          <p data-reveal="up" data-delay="0.6" className="text-xs uppercase tracking-[0.2em] text-ash md:col-span-3">
            {profile.role}
            <br />
            Based in {profile.location}
          </p>
          <p data-split="lines" data-delay="0.5" className="font-gothic text-[15px] leading-[2] md:col-span-6 md:col-start-5">
            {profile.intro}
          </p>
        </div>
      </section>

      {/* Works */}
      <section id="works" className="mx-auto max-w-[1400px] scroll-mt-10 px-5 md:px-10">
        <SectionLabel no="01" label="Selected Works" />
        <div className="border-b border-coal/15">
          <CursorPreview
            boxClassName="h-[340px] w-[272px]"
            rows={works.map((w) => {
              const live = Boolean(w.href);
              return {
                key: w.no,
                href: w.href,
                row: (
                  <div
                    data-cursor={live ? "View" : undefined}
                    className="group grid grid-cols-[2.5rem_1fr_auto] items-center gap-4 border-t border-coal/15 py-8 md:grid-cols-[4rem_1.4fr_1fr_1fr_6rem_8rem] md:py-12"
                  >
                    <span className="text-sm text-ash">{w.no}</span>
                    <span
                      className={`text-2xl font-medium tracking-tight transition-transform duration-500 ease-[cubic-bezier(.2,.8,.2,1)] group-hover:translate-x-4 md:text-5xl ${live ? "" : "text-ash"}`}
                    >
                      {w.title}
                    </span>
                    <span className="hidden text-sm md:block">{w.kind}</span>
                    <span className="hidden text-sm text-ash md:block">{w.stack}</span>
                    <span className="hidden text-sm text-ash md:block">{w.year}</span>
                    <span className="flex justify-end gap-1">
                      {w.swatch.map((c, i) => (
                        <span
                          key={c}
                          className="h-6 w-6 rounded-full border border-coal/10 transition-transform duration-500 group-hover:-translate-y-1"
                          style={{ background: c, transitionDelay: `${i * 50}ms` }}
                        />
                      ))}
                    </span>
                    <p className="col-span-3 col-start-2 font-gothic text-sm leading-relaxed text-ash md:col-span-4 md:col-start-2">
                      {w.summary}
                      {live && <span className="ml-3 text-coal">View site →</span>}
                    </p>
                  </div>
                ),
                preview: live ? (
                  <ProductArt art={getProduct("hodoku-oil")!.art} name="ITOMA" id={`work-${w.no}`} view="top" />
                ) : (
                  <div className="grid h-full w-full place-items-center bg-[repeating-linear-gradient(135deg,#e6e6e1_0_12px,#dcdcd5_12px_24px)] text-xs uppercase tracking-[0.3em] text-ash">
                    Coming soon
                  </div>
                ),
              };
            })}
          />
        </div>
      </section>

      <Marquee
        className="mt-32 border-y border-coal/15 py-6 text-4xl font-medium tracking-tight md:mt-48 md:py-10 md:text-7xl"
        speed={30}
        items={["Shopify", "Next.js", "EC構築", "Corporate Site", "Landing Page", "運用・改善"]}
      />

      {/* Services */}
      <section id="services" className="mx-auto mt-24 max-w-[1400px] scroll-mt-10 px-5 md:mt-48 md:px-10">
        <SectionLabel no="02" label="Services" />
        <div data-stagger className="grid gap-px overflow-hidden border border-coal/15 bg-coal/15 md:grid-cols-3">
          {services.map((s) => (
            <div key={s.en} className="group flex flex-col bg-bone p-7 transition-colors duration-500 hover:bg-white md:p-10">
              <p className="font-roman text-4xl italic transition-transform duration-500 group-hover:translate-x-2">{s.en}</p>
              <p className="mt-1 font-gothic text-sm font-medium">{s.ja}</p>
              <p className="mt-6 font-gothic text-sm leading-relaxed text-ash">{s.note}</p>
              <ul className="mt-8 space-y-2.5 border-t border-coal/15 pt-6 font-gothic text-[13px]">
                {s.items.map((i) => (
                  <li key={i} className="flex gap-3">
                    <span className="text-signal">—</span>
                    {i}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="mx-auto mt-32 max-w-[1400px] px-5 md:mt-48 md:px-10">
        <SectionLabel no="03" label="Process" />
        <ol data-stagger className="grid gap-10 md:grid-cols-5 md:gap-6">
          {process.map(([t, d, n], i) => (
            <li key={t} className="border-t-2 border-coal pt-5">
              <p className="flex items-baseline justify-between">
                <span className="text-4xl font-medium tracking-tight">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-xs text-ash">{d}</span>
              </p>
              <p className="mt-6 font-gothic text-base font-medium">{t}</p>
              <p className="mt-3 font-gothic text-[13px] leading-[1.9] text-ash">{n}</p>
            </li>
          ))}
        </ol>
        <p className="mt-10 font-gothic text-xs text-ash">※ ECサイト一式の場合の目安です。ページ数・商品数によって前後します。</p>
      </section>

      {/* Contact */}
      <section id="contact" className="mt-32 scroll-mt-10 bg-coal text-bone md:mt-48">
        <div className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-36">
          <p className="text-xs uppercase tracking-[0.2em] text-bone/50">04 — Contact</p>
          <p data-split="lines" className="mt-8 font-gothic text-lg md:text-2xl">
            ご相談・お見積もりは、メールでお気軽に。
          </p>
          <Magnetic strength={0.15} className="mt-6">
            <a
              href={`mailto:${profile.email}`}
              data-cursor="Mail"
              className="block break-all text-[9vw] font-medium leading-none tracking-[-0.04em] transition-colors hover:text-signal md:text-[6vw]"
            >
              {profile.email}
            </a>
          </Magnetic>
          <div className="mt-24 flex justify-between border-t border-bone/15 pt-6 text-xs text-bone/50">
            <span>© {profile.name} 2026</span>
            <span>Built with Next.js</span>
          </div>
        </div>
      </section>
      <Cursor tone="light" />
    </div>
  );
}

function SectionLabel({ no, label }: { no: string; label: string }) {
  return (
    <p className="mb-10 flex items-baseline gap-4 text-xs uppercase tracking-[0.2em] text-ash">
      <span className="text-coal">{no}</span>
      {label}
    </p>
  );
}
