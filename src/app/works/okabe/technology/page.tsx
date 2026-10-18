/* eslint-disable @next/next/no-img-element -- 静的書き出しのため画像最適化は使わない */
import type { Metadata } from "next";
import { PageHead } from "@/components/okabe/PageHead";
import { certs, machines, materials, photo, steps } from "@/lib/okabe/data";

export const metadata: Metadata = { title: "技術・設備" };

export default function Technology() {
  return (
    <>
      <PageHead
        no="01"
        crumb="技術・設備"
        title="図面が届いてから、届けるまで。"
        lead="見積り、加工の準備、削る、測る、届ける。六つの工程をすべて社内で行うので、どこで時間がかかっているのかを、いつでもお答えできます。"
      />

      {/* 工程 */}
      <section className="mx-auto max-w-[1360px] px-5 py-20 md:px-10 md:py-32">
        <h2 data-split="lines" className="text-[clamp(26px,3vw,40px)] font-bold leading-[1.4]">
          ご依頼の流れ
        </h2>
        <ol className="mt-12 grid border-l border-sen sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((s, i) => (
            <li key={s.no} data-reveal="up" data-delay={(i % 3) * 0.08} className="relative border-b border-r border-sen p-6 md:p-8 [&:nth-child(-n+3)]:lg:border-t sm:[&:nth-child(-n+2)]:border-t">
              <div className="flex items-baseline justify-between gap-4">
                <span className="font-mono text-4xl font-medium tracking-[-0.04em] md:text-5xl">{s.no}</span>
                <span className="bg-tetsu px-2.5 py-1 text-[11px] text-ban">{s.time}</span>
              </div>
              <h3 className="mt-8 text-xl font-bold">{s.title}</h3>
              <p className="mt-3 text-sm leading-[1.95] text-tetsu/75">{s.body}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* 写真の帯 */}
      <section className="grid grid-cols-12 gap-3 px-3 md:gap-5 md:px-5">
        <div data-reveal="clip" className="col-span-12 aspect-[16/9] overflow-hidden md:col-span-8 md:aspect-auto">
          <img src={photo("floor")} alt="マシニングセンタで、アルミのブロックに溝を削っている" className="h-full w-full object-cover" loading="lazy" />
        </div>
        <div className="col-span-12 grid grid-cols-2 gap-3 md:col-span-4 md:grid-cols-1 md:gap-5">
          <div data-reveal="clip" className="aspect-square overflow-hidden md:aspect-[4/3]">
            <img src={photo("tools")} alt="棚に並んだエンドミル" className="h-full w-full object-cover" loading="lazy" />
          </div>
          <div data-reveal="clip" className="aspect-square overflow-hidden md:aspect-[4/3]">
            <img src={photo("chips")} alt="削ったときに出る、渦を巻いた金属の切りくず" className="h-full w-full object-cover" loading="lazy" />
          </div>
        </div>
      </section>

      {/* 設備一覧 */}
      <section className="mx-auto max-w-[1360px] px-5 py-20 md:px-10 md:py-32">
        <div className="grid gap-8 md:grid-cols-12">
          <div className="md:col-span-4">
            <h2 data-split="lines" className="text-[clamp(26px,3vw,40px)] font-bold leading-[1.4]">
              主な設備
            </h2>
            <p data-reveal="up" className="mt-6 text-[15px] leading-[2] text-tetsu/75">
              加工機13台、測定機3台。夜間も無人で動かせる機械は、翌朝に一個目の測定から始められるよう段取りしてから帰ります。
            </p>
          </div>
          <div className="overflow-x-auto md:col-span-8">
            <table className="w-full min-w-[620px] text-left text-sm">
              <thead>
                <tr className="border-b-2 border-tetsu text-xs text-hagane">
                  <th className="py-3 pr-4 font-normal">種類</th>
                  <th className="py-3 pr-4 font-normal">メーカー・型式</th>
                  <th className="py-3 pr-4 text-right font-normal">台数</th>
                  <th className="py-3 font-normal">加工範囲（mm）</th>
                </tr>
              </thead>
              <tbody>
                {machines.map(([kind, model, n, range]) => (
                  <tr key={model} data-reveal="up" className="border-b border-sen">
                    <td className="py-4 pr-4 font-medium">{kind}</td>
                    <td className="py-4 pr-4">{model}</td>
                    <td className="py-4 pr-4 text-right font-mono">{n}</td>
                    <td className="py-4 font-mono text-xs text-hagane">{range}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 恒温室 */}
      <section className="bg-tetsu text-ban">
        <div className="mx-auto grid max-w-[1360px] gap-12 px-5 py-24 md:grid-cols-12 md:px-10 md:py-36">
          <div className="md:col-span-6">
            <div data-reveal="clip" className="aspect-[4/5] overflow-hidden">
              <img src={photo("cmm")} alt="三次元測定機のプローブが部品に触れている" className="h-full w-full object-cover" loading="lazy" />
            </div>
          </div>
          <div className="md:col-span-5 md:col-start-8 md:self-center">
            <p data-reveal="up" className="font-mono text-[clamp(64px,9vw,128px)] font-medium leading-none tracking-[-0.05em]">
              20.0<span className="text-[0.4em] text-abura">℃</span>
            </p>
            <h2 data-split="lines" className="mt-8 text-[clamp(26px,3vw,40px)] font-bold leading-[1.4]">
              測定室の温度は、
              <br />
              一年中変わりません。
            </h2>
            <p data-reveal="up" className="mt-8 text-[15px] leading-[2.05] text-ban/75">
              金属は温度で伸び縮みします。削り上がった部品は恒温室で2時間なじませてから、三次元測定機で測ります。測定結果は検査成績書にまとめ、部品と一緒にお届けします。
            </p>
          </div>
        </div>
      </section>

      {/* 材質 */}
      <section className="mx-auto max-w-[1360px] px-5 py-20 md:px-10 md:py-32">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 data-split="lines" className="text-[clamp(26px,3vw,40px)] font-bold leading-[1.4]">
            対応している材質
          </h2>
          <p data-reveal="up" className="text-sm text-hagane">ここにない材質も、まずご相談ください。</p>
        </div>
        <dl className="mt-10 border-t-2 border-tetsu">
          {materials.map(([group, list]) => (
            <div key={group} data-reveal="up" className="grid gap-3 border-b border-sen py-6 md:grid-cols-[12rem_1fr] md:gap-8">
              <dt className="text-lg font-bold">{group}</dt>
              <dd className="flex flex-wrap gap-2">
                {list.map((m) => (
                  <span key={m} className="border border-sen bg-ban-hi px-3 py-1.5 font-mono text-[13px]">
                    {m}
                  </span>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* 認証 */}
      <section className="border-t border-sen">
        <div className="mx-auto grid max-w-[1360px] gap-10 px-5 py-20 md:grid-cols-12 md:px-10 md:py-28">
          <h2 data-split="lines" className="text-[clamp(26px,3vw,40px)] font-bold leading-[1.4] md:col-span-4">
            品質の認証
          </h2>
          <ul className="md:col-span-8">
            {certs.map(([code, name, year]) => (
              <li key={code} data-reveal="up" className="grid gap-1 border-t border-sen py-6 last:border-b md:grid-cols-[13rem_1fr_auto] md:items-baseline md:gap-6">
                <p className="font-mono text-lg font-medium">{code}</p>
                <p className="text-[15px]">{name}</p>
                <p className="text-sm text-hagane">{year}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
