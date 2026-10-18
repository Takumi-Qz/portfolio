import Link from "next/link";
import { BASE, company, credits, nav } from "@/lib/okabe/data";
import { Dim } from "./Dim";
import { Mark } from "./Mark";

export function Footer() {
  return (
    <footer className="bg-tetsu text-ban">
      {/* 見積りの導線：どのページの最後にも置く */}
      <section className="mx-auto max-w-[1360px] px-5 pb-20 pt-24 md:px-10 md:pb-28 md:pt-32">
        <Dim label="24h" className="max-w-[420px] text-abura" />
        <h2 data-split="lines" className="mt-8 text-[clamp(34px,5.6vw,80px)] font-bold leading-[1.18] tracking-[-0.02em]">
          図面を、そのまま
          <br />
          送ってください。
        </h2>
        <div className="mt-12 grid gap-10 md:grid-cols-12 md:items-end">
          <p data-reveal="up" className="max-w-[30em] text-[15px] leading-[2] text-ban/75 md:col-span-6">
            届いてから24時間以内に、加工方法と納期、費用の内訳をお返事します。一個だけの試作も、手描きのスケッチからのご相談も歓迎です。秘密保持契約（NDA）は、図面をいただく前に結べます。
          </p>
          <div data-reveal="up" className="flex flex-col gap-4 md:col-span-5 md:col-start-8">
            <Link
              href={`${BASE}/contact`}
              className="group flex items-center justify-between bg-abura px-7 py-6 text-lg font-bold text-tetsu transition-[filter] hover:brightness-110"
            >
              図面を送って見積りを依頼する
              <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
            <a href={`tel:${company.tel}`} className="flex items-baseline justify-between border border-ban/25 px-7 py-5 transition-colors hover:border-ban">
              <span className="text-sm text-ban/70">お電話でのご相談</span>
              <span className="font-mono text-xl">{company.tel}</span>
            </a>
          </div>
        </div>
      </section>

      <div className="ruler text-ban" />

      <div className="mx-auto grid max-w-[1360px] gap-12 px-5 py-16 text-sm md:grid-cols-12 md:px-10">
        <div className="md:col-span-5">
          <div className="flex items-center gap-3">
            <Mark className="h-8 w-8 text-ban" />
            <p className="text-xl font-bold tracking-[0.06em]">{company.name}</p>
          </div>
          <p className="mt-6 leading-[2] text-ban/70">
            {company.zip} {company.address}
            <br />
            Osaka Metro 中央線「高井田」駅 4番出口から徒歩7分
            <br />
            受付 {company.hours}
          </p>
        </div>
        <nav className="grid grid-cols-2 gap-x-8 gap-y-3 md:col-span-4 md:col-start-7">
          {[{ href: BASE, label: "トップ" }, ...nav, { href: `${BASE}/contact`, label: "お問い合わせ" }].map((n) => (
            <Link key={n.href} href={n.href} className="link-u w-fit text-ban/80 hover:text-ban">
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="text-xs leading-[1.9] text-ban/45 md:col-span-12">
          <p>これはポートフォリオ用の架空の会社のサイトです。社名・住所・電話番号・実績はすべて架空のものです。</p>
          {credits.length > 0 && (
            <p className="mt-1">
              写真：Unsplash より（色調をサイト用に調整しています）　
              {credits.map(([key, name, id], i) => (
                <span key={key}>
                  <a href={`https://unsplash.com/photos/${id}`} className="link-u" target="_blank" rel="noreferrer">
                    {name}
                  </a>
                  {i < credits.length - 1 && "、"}
                </span>
              ))}
            </p>
          )}
        </div>
      </div>
    </footer>
  );
}
