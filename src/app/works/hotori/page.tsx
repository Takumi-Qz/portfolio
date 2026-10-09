/* eslint-disable @next/next/no-img-element -- 静的書き出しのため画像最適化は使わない */
import { Calendar, NextVacancy } from "@/components/hotori/Calendar";
import { StickyCta } from "@/components/hotori/StickyCta";
import { Timeline } from "@/components/hotori/Timeline";
import { Magnetic } from "@/components/motion/Magnetic";
import { caveats, credits, extraGuest, faq, maxGuests, photo, reviews, seasons, specs, yen } from "@/lib/hotori/data";

const from = yen(Math.min(...seasons.map((s) => s.weekday)));

export default function HotoriLp() {
  return (
    <>
      {/* ファーストビュー：何の宿か／誰向けか／根拠の数字／予約導線 */}
      <section id="hotori-hero" data-hide-cta className="relative flex min-h-[640px] flex-col overflow-hidden h-[calc(100svh-32px)]">
        <div className="absolute inset-0">
          {/* 左右反転して小屋を右に寄せ、見出しを暗い林の上に置く */}
          <div data-speed="-0.25" className="h-full w-full -scale-x-100">
            <img src={photo("hero")} alt="森の中の小屋。煙突から薪ストーブの煙が上がっている" className="hero-zoom h-full w-full object-cover object-[30%_60%]" fetchPriority="high" />
          </div>
          <div className="steam pointer-events-none absolute -inset-x-1/4 top-0 h-2/3" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(20_28_24/0.75)_0%,transparent_24%,transparent_40%,rgb(20_28_24/0.9)_100%)]" />
        </div>

        <header className="relative z-10 flex items-center justify-between px-5 py-5 md:px-10">
          <a href="#hotori-hero" className="flex items-baseline gap-3">
            <span className="text-2xl font-black tracking-[0.08em]">ほとり</span>
            <span className="hidden text-xs text-yuki/70 sm:inline">白樺湖　薪サウナの宿</span>
          </a>
          <nav className="flex items-center gap-7 text-sm">
            <a href="#sugoshikata" className="link-u hidden md:inline">過ごし方</a>
            <a href="#sauna" className="link-u hidden md:inline">サウナ室</a>
            <a href="#ryokin" className="link-u hidden md:inline">料金</a>
            <a href="#faq" className="link-u hidden md:inline">よくある質問</a>
            <a href="#yoyaku" className="border border-yuki/60 px-4 py-2 transition-colors hover:bg-yuki hover:text-moku">
              空室
            </a>
          </nav>
        </header>

        <div className="relative z-10 mt-auto px-5 pb-8 md:px-10 md:pb-20">
          <p data-reveal="up" data-delay="0.6" className="text-[13px] leading-relaxed text-yuki/85 md:text-[15px]">
            長野・白樺湖の北岸に二棟だけ。薪サウナ付きの一棟貸し
          </p>
          <h1 data-split="chars" className="mt-3 text-[clamp(56px,min(11vw,17svh),180px)] font-black leading-[1.04] tracking-[-0.01em]">
            湖まで、
            <br />
            十二歩。
          </h1>

          <div className="mt-6 flex flex-col-reverse gap-6 border-t border-yuki/25 pt-6 md:mt-8 md:flex-row md:items-end md:justify-between md:gap-8">
            <dl data-stagger className="grid grid-cols-3 gap-4 md:flex md:gap-14">
              <div>
                <dt className="text-[11px] text-yuki/70 md:text-xs">サウナ室の温度</dt>
                <dd className="num mt-1 text-2xl font-black md:text-5xl">
                  <span data-count>92</span>℃
                </dd>
              </div>
              <div>
                <dt className="text-[11px] text-yuki/70 md:text-xs">扉から桟橋まで</dt>
                <dd className="num mt-1 text-2xl font-black md:text-5xl">
                  <span data-count>12</span>歩
                </dd>
              </div>
              <div>
                <dt className="text-[11px] text-yuki/70 md:text-xs">一日に泊まれるのは</dt>
                <dd className="num mt-1 text-2xl font-black md:text-5xl">
                  <span data-count>2</span>組
                </dd>
              </div>
            </dl>
            <div data-reveal="up" data-delay="1.1" className="flex items-center gap-5">
              <Magnetic strength={0.2}>
                <a href="#yoyaku" className="inline-block bg-hi px-8 py-5 text-[17px] font-bold text-moku-deep transition-[filter] hover:brightness-110">
                  空いている日を見る
                </a>
              </Magnetic>
              <p className="num text-xs leading-relaxed text-yuki/80">
                1棟2名 {from}〜
                <br />
                税込・朝食付き
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 誰のための宿か */}
      <section className="mx-auto grid max-w-[1320px] gap-12 px-5 py-24 md:grid-cols-12 md:px-10 md:py-40">
        <div className="md:col-span-7">
          <h2 data-split="lines" className="text-[clamp(30px,4.2vw,58px)] font-black leading-[1.35]">
            街のサウナで、
            <br />
            水風呂の順番を
            <br />
            待ったことがある人へ。
          </h2>
          <div className="mt-10 max-w-[34em] space-y-6 text-[16px] leading-[2.1] text-yuki/80">
            <p data-reveal="up">
              ほとりは、白樺湖の北岸に建つ二棟だけの宿です。棟ごとに薪サウナがあって、水風呂のかわりに湖があります。
            </p>
            <p data-reveal="up">
              サウナ室も、桟橋も、夜のデッキも、泊まっている間はあなたたちだけのもの。ロウリュの回数を数える人も、時計を気にする人もいません。
            </p>
          </div>
        </div>
        <div className="relative md:col-span-4 md:col-start-9">
          <div data-speed="0.3">
            <div data-reveal="clip" className="aspect-[3/4] overflow-hidden">
              <img src={photo("forest")} alt="霧のかかった林" className="h-full w-full object-cover" loading="lazy" />
            </div>
            <p className="mt-3 text-xs text-yuki/60">朝6時、棟の裏の林。標高1,416m。夏でも朝はひんやり12℃前後。</p>
          </div>
        </div>
      </section>

      {/* 過ごし方 */}
      <section id="sugoshikata" className="scroll-mt-0 bg-moku-deep pb-24 md:pb-0">
        <div className="mx-auto max-w-[1320px] px-5 pb-12 pt-24 md:px-10 md:pt-32">
          <h2 data-split="lines" className="text-[clamp(28px,3.4vw,46px)] font-black leading-[1.4]">
            15時に着いて、
            <br />
            17時には湖の上にいる。
          </h2>
        </div>
        <Timeline />
      </section>

      {/* サウナ室 */}
      <section id="sauna" className="bg-yuki text-moku">
        <div className="mx-auto max-w-[1320px] px-5 py-24 md:px-10 md:py-36">
          <div className="grid gap-6 md:grid-cols-12">
            <div className="md:col-span-7">
              <div data-reveal="clip" className="aspect-[4/3] overflow-hidden">
                <img src={photo("room")} alt="窓が林に向いた、木の内装のサウナ室と薪ストーブ" className="h-full w-full object-cover" loading="lazy" />
              </div>
            </div>
            <div className="grid grid-cols-2 items-start gap-6 md:col-span-5 md:grid-cols-1">
              <div data-speed="-0.2" className="md:ml-16">
                <div data-reveal="clip" className="aspect-[4/5] overflow-hidden">
                  <img src={photo("loyly")} alt="サウナストーンに柄杓で水をかけている" className="h-full w-full object-cover" loading="lazy" />
                </div>
              </div>
              <div data-speed="0.15" className="mt-16 md:mt-0 md:w-[55%]">
                <div data-reveal="clip" className="aspect-square overflow-hidden">
                  <img src={photo("vihta")} alt="白樺の枝を束ねたヴィヒタ" className="h-full w-full object-cover" loading="lazy" />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 grid gap-12 md:mt-24 md:grid-cols-12">
            <h2 data-split="lines" className="text-[clamp(28px,3.4vw,46px)] font-black leading-[1.4] md:col-span-5">
              温度を決めるのは、
              <br />
              くべる薪の量。
            </h2>
            <dl className="divide-y divide-moku/15 border-y border-moku/15 md:col-span-7">
              {specs.map(([k, v]) => (
                <div key={k} data-reveal="up" className="grid grid-cols-[6.5em_1fr] gap-4 py-5 text-[15px] leading-relaxed">
                  <dt className="font-bold">{k}</dt>
                  <dd className="text-moku/80">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* 滞在の楽しみ方 */}
      <section className="bg-yuki text-moku">
        <div className="mx-auto max-w-[1320px] border-t border-moku/15 px-5 py-24 md:px-10 md:py-32">
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-4">
              <h2 data-split="lines" className="text-[clamp(26px,2.8vw,38px)] font-black leading-[1.45]">
                知っておくと、
                <br />
                もっと楽しめること
              </h2>
              <p data-reveal="up" className="mt-6 text-[15px] leading-[2] text-moku/70">
                必要なものは、ほとんど棟に揃っています。あとは、ちょっとした楽しみ方を。
              </p>
            </div>
            <ol className="md:col-span-7 md:col-start-6">
              {caveats.map(([title, body]) => (
                <li key={title} data-reveal="up" className="border-t border-moku/15 py-7 last:border-b">
                  <p className="text-lg font-bold">{title}</p>
                  <p className="mt-2 text-[15px] leading-[2] text-moku/75">{body}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* 口コミ */}
      <section className="mx-auto max-w-[1320px] px-5 py-24 md:px-10 md:py-40">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 data-split="lines" className="text-[clamp(28px,3.4vw,46px)] font-black leading-[1.4]">泊まった人の声</h2>
          <p data-reveal="up" className="num text-sm text-yuki/70">
            平均 <span className="text-2xl font-black text-yuki">4.6</span> ／ 口コミ128件（2025年4月〜）
          </p>
        </div>
        <div className="mt-14 grid gap-x-16 gap-y-14 md:grid-cols-12">
          {reviews.map((r, i) => (
            <figure
              key={r.when}
              data-reveal="up"
              className={i === 0 ? "md:col-span-12 md:pr-[20%]" : i === 1 ? "md:col-span-6" : "md:col-span-5 md:col-start-8 md:mt-24"}
            >
              <p aria-label={`5段階中${r.stars}`} className="tracking-[0.2em] text-hi">
                {"★".repeat(r.stars)}
                <span className="text-yuki/25">{"★".repeat(5 - r.stars)}</span>
              </p>
              <blockquote className={`mt-4 font-bold leading-[1.8] ${i === 0 ? "text-[clamp(20px,2.4vw,32px)]" : "text-[17px]"}`}>{r.body}</blockquote>
              <figcaption className="mt-4 text-xs text-yuki/60">
                {r.who}　{r.when}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* 料金 */}
      <section id="ryokin" className="bg-yuki text-moku">
        <div className="relative h-[60vh] min-h-[380px] overflow-hidden">
          <div data-speed="0.3" className="absolute -inset-y-[15%] inset-x-0">
            <img src={photo("winter")} alt="雪に覆われた湖畔の森と小屋" className="h-full w-full object-cover" loading="lazy" />
          </div>
          <div className="absolute inset-0 bg-[linear-gradient(0deg,rgb(20_28_24/0.6),transparent_60%)]" />
          <p data-split="lines" className="absolute bottom-8 left-5 text-[clamp(28px,4vw,56px)] font-black leading-[1.35] text-yuki md:bottom-12 md:left-10">
            冬は、雪の中のサウナへ。
            <br />
            料金も、いちばんお手頃に。
          </p>
        </div>

        <div className="mx-auto max-w-[1320px] px-5 py-24 md:px-10 md:py-32">
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-4">
              <h2 className="text-[clamp(26px,2.8vw,38px)] font-black">料金</h2>
              <p className="mt-4 text-[15px] leading-[2] text-moku/70">1棟・2名・1泊朝食付き、税込。金曜と土曜は休前日料金です。</p>
            </div>
            <div className="md:col-span-8">
              <div className="hidden grid-cols-[1fr_6rem_7rem_7rem] border-b border-moku py-3 text-xs text-moku/60 md:grid">
                <span>季節</span>
                <span>湖の水温</span>
                <span className="text-right">日〜木</span>
                <span className="text-right">金・土</span>
              </div>
              <ul>
                {seasons.map((s) => (
                  <li key={s.name} data-reveal="up" className="grid grid-cols-[1fr_auto] gap-x-4 border-b border-moku/15 py-5 md:grid-cols-[1fr_6rem_7rem_7rem]">
                    <div>
                      <span className="text-xl font-black">{s.name}</span>
                      <span className="num ml-2 text-xs text-moku/60">{s.months.join("・")}月</span>
                      <p className="mt-1 text-xs leading-relaxed text-moku/60">
                        <span className="md:hidden">湖 {s.water}　</span>
                        {s.note}
                      </p>
                    </div>
                    <span className="num hidden md:block">{s.water}</span>
                    <p className="num text-right text-lg font-bold">
                      <span className="mr-2 text-xs font-normal text-moku/60 md:hidden">日〜木</span>
                      {yen(s.weekday)}
                    </p>
                    <p className="num col-start-2 text-right text-lg font-bold md:col-start-auto">
                      <span className="mr-2 text-xs font-normal text-moku/60 md:hidden">金・土</span>
                      {yen(s.holiday)}
                    </p>
                  </li>
                ))}
              </ul>
              <ul className="mt-8 space-y-2 text-sm leading-[1.9] text-moku/75">
                <li>・3名以上は1名につき {yen(extraGuest)}（最大{maxGuests}名・小学生以上）</li>
                <li>・料金に含まれるもの：朝食（佐久のパン屋のパンと、高原野菜のスープ）、ナラ薪30本、タオル、サウナハット、ポンチョ</li>
                <li>・チェックイン 15:00〜18:00　チェックアウト 11:00</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 空室カレンダー（メインCTA） */}
      <section id="yoyaku" data-hide-cta className="scroll-mt-0 bg-yuki text-moku">
        <div className="mx-auto max-w-[1320px] border-t border-moku/15 px-5 py-24 md:px-10 md:py-32">
          <h2 data-split="lines" className="mb-12 text-[clamp(28px,3.4vw,46px)] font-black leading-[1.4]">
            空いている日を見る
          </h2>
          <Calendar />
        </div>
      </section>

      {/* よくある質問 */}
      <section id="faq" className="bg-yuki text-moku">
        <div className="mx-auto grid max-w-[1320px] gap-12 border-t border-moku/15 px-5 py-24 md:grid-cols-12 md:px-10 md:py-32">
          <h2 className="text-[clamp(26px,2.8vw,38px)] font-black md:col-span-4">よくある質問</h2>
          <div className="md:col-span-8">
            {faq.map(([q, a]) => (
              <details key={q} className="group border-t border-moku/15 last:border-b">
                <summary className="flex items-center justify-between gap-6 py-6 text-[17px] font-bold">
                  {q}
                  <span className="plus text-2xl font-normal text-hi transition-transform duration-300">＋</span>
                </summary>
                <p className="pb-7 pr-10 text-[15px] leading-[2] text-moku/75">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 最後のひと押し */}
      <section data-hide-cta className="relative overflow-hidden">
        <div data-speed="0.25" className="absolute -inset-y-[15%] inset-x-0">
          <img src={photo("dawn")} alt="霧の立ちこめる朝の湖" className="h-full w-full object-cover" loading="lazy" />
        </div>
        <div className="absolute inset-0 bg-moku-deep/45" />
        <div className="relative mx-auto max-w-[1320px] px-5 py-32 md:px-10 md:py-48">
          <p data-reveal="up" className="text-sm text-yuki/80">いちばん近い空きは</p>
          <p data-reveal="up" className="num mt-3 text-[clamp(40px,7vw,100px)] font-black leading-none">
            <NextVacancy />
          </p>
          <a href="#yoyaku" data-reveal="up" className="mt-10 inline-block bg-hi px-8 py-5 text-[17px] font-bold text-moku-deep transition-[filter] hover:brightness-110">
            カレンダーで確かめる
          </a>
        </div>
      </section>

      <footer data-hide-cta className="bg-moku-deep px-5 pb-16 pt-16 text-sm text-yuki/70 md:px-10 md:pb-16">
        <div className="mx-auto grid max-w-[1320px] gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="text-2xl font-black text-yuki">ほとり</p>
            <p className="mt-4 leading-[2]">
              長野県北佐久郡立科町　白樺湖北岸
              <br />
              受付（管理棟）9:00〜18:00
            </p>
          </div>
          <div className="text-xs leading-[1.9] text-yuki/50 md:col-span-6 md:col-start-7">
            <p>写真：Unsplash より（色調をサイト用に調整しています）</p>
            <p className="mt-1">
              {credits.map(([key, name, id], i) => (
                <span key={key}>
                  <a href={`https://unsplash.com/photos/${id}`} className="link-u" target="_blank" rel="noreferrer">
                    {name}
                  </a>
                  {i < credits.length - 1 && "、"}
                </span>
              ))}
            </p>
          </div>
        </div>
      </footer>

      <StickyCta price={from} />
    </>
  );
}
