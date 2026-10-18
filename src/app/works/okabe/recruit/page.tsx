/* eslint-disable @next/next/no-img-element -- 静的書き出しのため画像最適化は使わない */
import type { Metadata } from "next";
import Link from "next/link";
import { PageHead } from "@/components/okabe/PageHead";
import { BASE, benefits, day, jobs, photo, recruitFigures, voices } from "@/lib/okabe/data";

export const metadata: Metadata = { title: "採用情報" };

export default function Recruit() {
  return (
    <>
      <PageHead
        no="04"
        crumb="採用情報"
        title="刃物の名前から、一緒に覚えましょう。"
        lead="社員の半分は、入社したときに旋盤を触ったことがありませんでした。一人に一人、先輩が付いて教えます。三年目には、自分で組んだプログラムで部品を削っています。"
      />

      {/* 数字 */}
      <section className="mx-auto max-w-[1360px] px-5 md:px-10">
        <dl className="grid grid-cols-2 border-b border-sen md:grid-cols-4">
          {recruitFigures.map((f, i) => (
            <div key={f.label} data-reveal="up" data-delay={i * 0.08} className={`py-10 ${i % 2 ? "border-l border-sen pl-5 md:pl-8" : ""} ${i === 2 ? "border-t border-sen md:border-l md:border-t-0 md:pl-8" : ""} ${i === 3 ? "border-t md:border-t-0" : ""}`}>
              <dt className="text-xs text-hagane md:text-sm">{f.label}</dt>
              <dd className="mt-3">
                <span className="font-mono text-[clamp(40px,5vw,64px)] font-medium leading-none tracking-[-0.04em]">
                  {f.value.includes(".") ? f.value : <span data-count>{f.value}</span>}
                </span>
                <span className="ml-1 text-sm font-bold">{f.unit}</span>
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* 社員の声：写真の位置を左右で入れ替える */}
      <section className="mx-auto max-w-[1360px] px-5 py-20 md:px-10 md:py-32">
        {voices.map((v, i) => (
          <article key={v.name} className={`grid gap-10 md:grid-cols-12 md:items-center ${i ? "mt-24 md:mt-36" : ""}`}>
            <div className={`md:col-span-5 ${i % 2 ? "md:order-2 md:col-start-8" : ""}`}>
              <div data-speed={i % 2 ? "0.15" : "-0.15"}>
                <div data-reveal="clip" className="aspect-[4/5] overflow-hidden">
                  <img src={photo(v.photo)} alt={`${v.name}さん`} className="h-full w-full object-cover" loading="lazy" />
                </div>
              </div>
            </div>
            <div className={`md:col-span-6 ${i % 2 ? "md:order-1 md:col-start-1" : "md:col-start-7"}`}>
              <p data-reveal="up" className="text-sm text-hagane">
                {v.role}　／　{v.from}
              </p>
              <blockquote data-split="lines" className="mt-6 text-[clamp(26px,3vw,42px)] font-bold leading-[1.5]">
                「{v.quote}」
              </blockquote>
              <p data-reveal="up" className="mt-8 text-[15px] leading-[2.05] text-tetsu/80">
                {v.body}
              </p>
              <p data-reveal="up" className="mt-6 text-lg font-bold tracking-[0.1em]">
                {v.name}
              </p>
            </div>
          </article>
        ))}
      </section>

      {/* 一日の流れ */}
      <section className="bg-tetsu text-ban">
        <div className="mx-auto grid max-w-[1360px] gap-10 px-5 py-24 md:grid-cols-12 md:px-10 md:py-32">
          <div className="md:col-span-4">
            <h2 data-split="lines" className="text-[clamp(26px,3vw,40px)] font-bold leading-[1.4]">
              5軸加工の担当者の
              <br />
              一日
            </h2>
          </div>
          <ol className="md:col-span-8">
            {day.map(([t, text]) => (
              <li key={t} data-reveal="up" className="grid grid-cols-[5rem_1fr] items-baseline gap-4 border-b border-ban/15 py-5 md:grid-cols-[7rem_1fr]">
                <time className="font-mono text-xl text-abura md:text-2xl">{t}</time>
                <p className="text-[15px] leading-[1.9] text-ban/85">{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 募集職種 */}
      <section className="mx-auto max-w-[1360px] px-5 py-20 md:px-10 md:py-32">
        <h2 data-split="lines" className="text-[clamp(26px,3vw,40px)] font-bold leading-[1.4]">
          募集している職種
        </h2>
        <div className="mt-10 border-t-2 border-tetsu">
          {jobs.map((j) => (
            <details key={j.title} data-reveal="up" className="group border-b border-sen">
              <summary className="flex items-center justify-between gap-6 py-7">
                <span className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <span className="text-xl font-bold md:text-2xl">{j.title}</span>
                  <span className="text-xs text-hagane">{j.type}</span>
                </span>
                <span className="plus grid h-9 w-9 shrink-0 place-items-center rounded-full border border-tetsu text-lg transition-transform duration-300">+</span>
              </summary>
              <dl className="grid gap-x-8 pb-8 text-[15px] md:grid-cols-[8rem_1fr]">
                {[
                  ["応募の条件", j.who],
                  ["給与", j.pay],
                  ["勤務時間", j.hours],
                  ["休日", "土日祝・夏季・年末年始（年間121日）"],
                ].map(([k, v]) => (
                  <div key={k} className="contents">
                    <dt className="pt-3 text-hagane">{k}</dt>
                    <dd className="pb-3 pt-1 leading-[1.9] md:pt-3">{v}</dd>
                  </div>
                ))}
              </dl>
            </details>
          ))}
        </div>

        <div className="mt-20 grid gap-10 md:grid-cols-12">
          <h3 data-reveal="up" className="text-xl font-bold md:col-span-4">待遇・福利厚生</h3>
          <ul data-stagger className="grid gap-x-8 sm:grid-cols-2 md:col-span-8">
            {benefits.map((b) => (
              <li key={b} className="flex gap-3 border-t border-sen py-4 text-[15px]">
                <span className="mt-[0.7em] h-1.5 w-1.5 shrink-0 bg-abura" />
                {b}
              </li>
            ))}
          </ul>
        </div>

        <div data-reveal="up" className="mt-20 flex flex-col items-start gap-6 border border-tetsu p-8 md:flex-row md:items-center md:justify-between md:p-12">
          <div>
            <p className="text-xl font-bold md:text-2xl">まずは、工場を見に来ませんか。</p>
            <p className="mt-2 text-sm text-hagane">見学は平日10時と14時から。履歴書はいりません。</p>
          </div>
          <Link href={`${BASE}/contact?type=recruit`} className="group inline-flex shrink-0 items-center gap-4 bg-tetsu px-7 py-5 text-ban transition-colors hover:bg-abura hover:text-tetsu">
            見学・応募の申し込み
            <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </section>
    </>
  );
}
