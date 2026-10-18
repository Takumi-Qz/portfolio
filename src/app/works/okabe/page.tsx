/* eslint-disable @next/next/no-img-element -- 静的書き出しのため画像最適化は使わない */
import Link from "next/link";
import { Dim } from "@/components/okabe/Dim";
import { Magnetic } from "@/components/motion/Magnetic";
import { BASE, cases, figures, industries, news, photo, strengths, voices } from "@/lib/okabe/data";

export default function OkabeTop() {
  return (
    <>
      {/* ファーストビュー：何の会社か／強みの数字／見積り導線 */}
      <section className="mx-auto max-w-[1360px] px-5 pt-10 md:px-10 md:pt-16">
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-9">
            <p data-reveal="up" className="text-[13px] leading-relaxed text-hagane md:text-[15px]">
              東大阪・高井田で55年。医療機器と航空機の部品を、試作の一個から削っています。
            </p>
            <h1 className="mt-5 text-[clamp(48px,9.4vw,148px)] font-bold leading-[1.02] tracking-[-0.035em]">
              <span data-split="lines" className="block">一個から、</span>
              <span data-split="lines" data-delay="0.15" className="block">
                <span className="font-mono font-medium tracking-[-0.06em]">0.003</span>ミリまで。
              </span>
            </h1>
          </div>
          <div data-reveal="up" data-delay="0.5" className="flex flex-col gap-4 md:col-span-3">
            <Magnetic strength={0.15}>
              <Link
                href={`${BASE}/contact`}
                className="group flex w-full items-center justify-between gap-6 bg-tetsu px-6 py-5 text-ban transition-colors hover:bg-abura hover:text-tetsu"
              >
                図面を送って見積り
                <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </Magnetic>
            <Link href={`${BASE}/cases`} className="link-u w-fit text-sm">
              加工実績を見る
            </Link>
          </div>
        </div>
        <Dim label="±0.003" delay={0.6} className="mt-8 text-hagane md:mt-10 md:w-[62%]" />
      </section>

      <section className="px-3 pt-6 md:px-5 md:pt-8">
        <div data-reveal="clip" className="relative aspect-[4/5] overflow-hidden bg-tetsu sm:aspect-[16/9] md:aspect-[21/9]">
          <div data-speed="-0.2" className="absolute inset-[-10%_0]">
            <img
              src={photo("hero")}
              alt="5軸加工機の中で、切削油を浴びながらエンドミルが金属を削っている"
              className="h-full w-full object-cover"
              fetchPriority="high"
            />
          </div>
          <p className="absolute bottom-4 left-4 bg-tetsu/80 px-3 py-2 font-mono text-[10px] leading-relaxed text-ban/85 backdrop-blur md:bottom-6 md:left-6 md:text-[11px]">
            本社工場　DMU 50 ／ 主軸 20,000 min⁻¹ ／ Ti-6Al-4V
          </p>
        </div>
      </section>

      {/* 数字 */}
      <section className="mx-auto max-w-[1360px] px-5 md:px-10">
        <dl className="grid grid-cols-2 border-b border-sen md:grid-cols-4">
          {figures.map((f, i) => (
            <div
              key={f.label}
              data-reveal="up"
              data-delay={i * 0.08}
              className={`py-8 md:py-12 ${i % 2 ? "border-l border-sen pl-5 md:pl-8" : "md:pr-8"} ${i === 2 ? "border-t border-sen md:border-l md:border-t-0 md:pl-8" : ""} ${i === 3 ? "border-t md:border-t-0" : ""}`}
            >
              <dt className="text-xs text-hagane md:text-sm">{f.label}</dt>
              <dd className="mt-3">
                <span className="font-mono text-[clamp(40px,5vw,72px)] font-medium leading-none tracking-[-0.04em]">
                  {f.value.includes(".") ? f.value : <span data-count>{f.value}</span>}
                </span>
                <span className="ml-1 text-sm font-bold md:text-base">{f.unit}</span>
                <p className="mt-3 text-[11px] leading-relaxed text-hagane md:text-xs">{f.note}</p>
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* 誰のための工場か */}
      <section className="mx-auto grid max-w-[1360px] gap-14 px-5 py-24 md:grid-cols-12 md:px-10 md:py-40">
        <div className="md:col-span-6">
          <h2 data-split="lines" className="text-[clamp(30px,4vw,56px)] font-bold leading-[1.35] tracking-[-0.02em]">
            「まず一個だけ」の
            <br />
            ご相談が、
            <br />
            いちばん多い工場です。
          </h2>
          <div className="mt-10 max-w-[32em] space-y-6 text-[16px] leading-[2.1] text-tetsu/80">
            <p data-reveal="up">
              新しい医療機器や衛星の部品は、最初は一個から始まります。形を確かめて、組み付けて、また図面を直す。岡部製作所は、その行ったり来たりにいちばん近いところで削っています。
            </p>
            <p data-reveal="up">
              設計の方と同じ図面を見ながら、「この角を0.5ミリ丸めれば、半日早く削れます」とお伝えすることもあります。試作で決まった削り方は、そのまま量産に引き継ぎます。
            </p>
          </div>
        </div>
        <div className="relative md:col-span-5 md:col-start-8">
          <div data-speed="0.25">
            <div data-reveal="clip" className="aspect-[4/5] overflow-hidden">
              <img src={photo("hands")} alt="職人がノギスで部品の寸法を測っている" className="h-full w-full object-cover" loading="lazy" />
            </div>
            <p className="mt-3 text-xs leading-relaxed text-hagane">一個目が削り上がったら、職人が自分の手でも寸法を測ります。図面どおりだと確かめてから、二個目を削り始めます。</p>
          </div>
        </div>
      </section>

      {/* 強み */}
      <section className="border-t border-sen">
        <div className="mx-auto max-w-[1360px] px-5 md:px-10">
          <div className="flex flex-wrap items-end justify-between gap-6 pb-6 pt-20 md:pt-28">
            <h2 data-split="lines" className="text-[clamp(26px,3vw,40px)] font-bold leading-[1.4]">
              精度を支える、三つのこと
            </h2>
            <Link href={`${BASE}/technology`} className="link-u text-sm">
              技術と設備をくわしく →
            </Link>
          </div>
          {strengths.map((s, i) => (
            <article key={s.no} className="grid gap-8 border-t border-sen py-14 md:grid-cols-12 md:gap-10 md:py-24">
              <div className={`md:col-span-7 ${i % 2 ? "md:order-2 md:col-start-6" : ""}`}>
                <div data-reveal="clip" className="aspect-[3/2] overflow-hidden">
                  <img src={photo(s.photo)} alt={s.alt} className="h-full w-full object-cover" loading="lazy" />
                </div>
              </div>
              <div className={`flex flex-col md:col-span-5 ${i % 2 ? "md:order-1 md:col-start-1" : ""}`}>
                {/* 図面の部品番号（バルーン） */}
                <span className="grid h-11 w-11 place-items-center rounded-full border border-tetsu font-mono text-sm">{s.no}</span>
                <h3 data-split="lines" className="mt-6 text-[clamp(26px,2.8vw,40px)] font-bold leading-[1.35]">
                  {s.title}
                </h3>
                <p data-reveal="up" className="mt-6 text-[15px] leading-[2.05] text-tetsu/80">
                  {s.body}
                </p>
                <dl data-reveal="up" className="mt-auto pt-10 text-sm">
                  {s.spec.map(([k, v]) => (
                    <div key={k} className="flex items-baseline justify-between gap-4 border-t border-sen py-3 last:border-b">
                      <dt className="text-hagane">{k}</dt>
                      <dd className="text-right font-medium">{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 業界 */}
      <section className="bg-tetsu text-ban">
        <div className="mx-auto max-w-[1360px] px-5 py-24 md:px-10 md:py-36">
          <div className="grid gap-10 md:grid-cols-12">
            <h2 data-split="lines" className="text-[clamp(28px,3.6vw,50px)] font-bold leading-[1.4] md:col-span-6">
              削った部品の、
              <br />
              四つの行き先。
            </h2>
            <p data-reveal="up" className="text-[15px] leading-[2] text-ban/70 md:col-span-5 md:col-start-8 md:self-end">
              2025年度の売上の内訳です。人の体に入るもの、空を飛ぶもの。どれも、一つの寸法違いが許されない部品です。
            </p>
          </div>

          {/* 帯グラフ：割合のぶんだけ幅をとる */}
          <div data-stagger className="mt-16 flex h-3 gap-1 md:mt-20">
            {industries.map((d, i) => (
              <span key={d.name} className={i === 0 ? "bg-abura" : "bg-ban/30"} style={{ flexGrow: d.share }} />
            ))}
          </div>
          <ul className="mt-2">
            {industries.map((d) => (
              <li key={d.name} data-reveal="up" className="grid grid-cols-[1fr_auto] items-baseline gap-x-6 gap-y-2 border-b border-ban/15 py-7 md:grid-cols-[18rem_1fr_auto]">
                <p className="text-xl font-bold md:text-2xl">{d.name}</p>
                <p className="order-3 col-span-2 text-sm text-ban/60 md:order-none md:col-span-1">{d.examples}</p>
                <p className="font-mono text-3xl md:text-4xl">
                  <span data-count>{d.share}</span>
                  <span className="ml-1 text-base text-ban/60">%</span>
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 加工実績 */}
      <section className="py-24 md:py-36">
        <div className="mx-auto flex max-w-[1360px] flex-wrap items-end justify-between gap-6 px-5 md:px-10">
          <h2 data-split="lines" className="text-[clamp(28px,3.6vw,50px)] font-bold leading-[1.4]">
            最近、削ったもの
          </h2>
          <Link href={`${BASE}/cases`} className="link-u text-sm">
            加工実績をすべて見る →
          </Link>
        </div>
        <div className="mt-12 flex snap-x snap-mandatory scroll-px-5 gap-5 overflow-x-auto px-5 pb-6 [scrollbar-width:thin] md:scroll-px-10 md:gap-8 md:px-10">
          {cases.slice(0, 5).map((c, i) => (
            <Link
              key={c.slug}
              href={`${BASE}/cases#${c.slug}`}
              data-reveal="up"
              data-delay={i * 0.08}
              className={`group w-[78vw] shrink-0 snap-start sm:w-[46vw] lg:w-[30vw] ${i % 2 ? "lg:mt-16" : ""}`}
            >
              <div className="aspect-[4/5] overflow-hidden bg-tetsu">
                <img
                  src={photo(c.photo)}
                  alt={c.title}
                  className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(.2,.8,.2,1)] group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <p className="mt-4 text-xs text-hagane">{c.industry}</p>
              <p className="mt-1 text-lg font-bold leading-snug">{c.title}</p>
              <p className="mt-3 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[11px] text-hagane">
                <span>{c.material}</span>
                <span>{c.tolerance}</span>
                <span>{c.qty}／{c.days}</span>
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* 採用 */}
      <section className="border-t border-sen">
        <div className="mx-auto grid max-w-[1360px] gap-10 px-5 py-24 md:grid-cols-12 md:px-10 md:py-36">
          <div className="md:col-span-5">
            <div data-reveal="clip" className="aspect-[3/4] overflow-hidden">
              <img src={photo(voices[0].photo)} alt="5軸加工機の前に立つ社員" className="h-full w-full object-cover" loading="lazy" />
            </div>
          </div>
          <div className="flex flex-col md:col-span-6 md:col-start-7">
            <p data-reveal="up" className="text-sm text-hagane">採用情報</p>
            <blockquote data-split="lines" className="mt-6 text-[clamp(28px,3.4vw,48px)] font-bold leading-[1.45]">
              「{voices[0].quote}」
            </blockquote>
            <p data-reveal="up" className="mt-6 text-sm text-hagane">
              {voices[0].name}　{voices[0].role}
            </p>
            <p data-reveal="up" className="mt-10 max-w-[32em] text-[15px] leading-[2] text-tetsu/80">
              社員28人のうち、20代は9人。刃物の名前を覚えるところから、先輩が一人ずつ付いて教えます。技能検定の受験費用は会社が全額負担します。
            </p>
            <div data-reveal="up" className="mt-10 md:mt-auto">
              <Link href={`${BASE}/recruit`} className="group inline-flex items-center gap-4 border border-tetsu px-7 py-5 transition-colors hover:bg-tetsu hover:text-ban">
                採用情報を見る
                <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* お知らせ */}
      <section className="mx-auto grid max-w-[1360px] gap-8 px-5 pb-24 md:grid-cols-12 md:px-10 md:pb-36">
        <h2 data-reveal="up" className="text-xl font-bold md:col-span-3">お知らせ</h2>
        <ul className="md:col-span-9">
          {news.map(([date, title]) => (
            <li key={date} data-reveal="up" className="grid gap-1 border-t border-sen py-5 last:border-b md:grid-cols-[9rem_1fr] md:gap-6">
              <time className="font-mono text-sm text-hagane">{date}</time>
              <p className="text-[15px]">{title}</p>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
