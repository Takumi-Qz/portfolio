/* eslint-disable @next/next/no-img-element -- 静的書き出しのため画像最適化は使わない */
import type { Metadata } from "next";
import { PageHead } from "@/components/okabe/PageHead";
import { history, photo, profileRows } from "@/lib/okabe/data";

export const metadata: Metadata = { title: "会社概要" };

export default function Company() {
  return (
    <>
      <PageHead
        no="03"
        crumb="会社概要"
        title="旋盤二台から、五十五年。"
        lead="1971年、東大阪の高井田で、旋盤二台と三人で始めた工場です。いまは28人で、医療と航空の部品を削っています。"
      />

      {/* 代表あいさつ */}
      <section className="mx-auto grid max-w-[1360px] gap-12 px-5 py-20 md:grid-cols-12 md:px-10 md:py-32">
        <div className="md:col-span-5">
          <div data-reveal="clip" className="aspect-[4/5] overflow-hidden">
            <img src={photo("drawing")} alt="図面と測定工具が置かれた机" className="h-full w-full object-cover" loading="lazy" />
          </div>
        </div>
        <div className="md:col-span-6 md:col-start-7">
          <p data-reveal="up" className="text-sm text-hagane">代表あいさつ</p>
          <h2 data-split="lines" className="mt-6 text-[clamp(28px,3.4vw,46px)] font-bold leading-[1.45]">
            祖父の口ぐせは、
            <br />
            「一個目がいちばん大事」。
          </h2>
          <div className="mt-10 space-y-6 text-[16px] leading-[2.1] text-tetsu/80">
            <p data-reveal="up">
              創業者の祖父は、どんなに急ぎの仕事でも、一個目を削ったら必ず自分の手で測ってから次に進みました。一個目が図面どおりなら、百個目も図面どおりになる。その考え方は、5軸加工機と恒温室を持ついまも変わっていません。
            </p>
            <p data-reveal="up">
              新しい製品が生まれるとき、最初に必要になるのは、たった一個の部品です。その一個を、早く、正確にお届けすること。設計の方が次の一歩に進むお手伝いを、これからも東大阪から続けていきます。
            </p>
          </div>
          <p data-reveal="up" className="mt-10 text-sm">
            代表取締役　<span className="text-lg font-bold tracking-[0.1em]">岡部 直樹</span>
          </p>
        </div>
      </section>

      {/* 概要 */}
      <section className="border-t border-sen">
        <div className="mx-auto grid max-w-[1360px] gap-10 px-5 py-20 md:grid-cols-12 md:px-10 md:py-28">
          <h2 data-split="lines" className="text-[clamp(26px,3vw,40px)] font-bold leading-[1.4] md:col-span-4">
            会社概要
          </h2>
          <dl className="border-t-2 border-tetsu md:col-span-8">
            {profileRows.map(([k, v]) => (
              <div key={k} data-reveal="up" className="grid gap-1 border-b border-sen py-5 text-[15px] md:grid-cols-[10rem_1fr] md:gap-6">
                <dt className="text-hagane">{k}</dt>
                <dd className="leading-[1.9]">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* 沿革 */}
      <section className="bg-tetsu text-ban">
        <div className="mx-auto grid max-w-[1360px] gap-10 px-5 py-24 md:grid-cols-12 md:px-10 md:py-32">
          <div className="md:col-span-4">
            <h2 data-split="lines" className="text-[clamp(26px,3vw,40px)] font-bold leading-[1.4]">
              沿革
            </h2>
            <div data-reveal="clip" className="mt-10 hidden aspect-[3/4] overflow-hidden md:block">
              <img src={photo("night")} alt="夜の工場の明かり" className="h-full w-full object-cover" loading="lazy" />
            </div>
          </div>
          <ol className="relative md:col-span-7 md:col-start-6">
            {/* 年表の縦線 */}
            <span data-draw className="absolute bottom-2 left-[5px] top-2 w-px" aria-hidden>
              <span data-line="y" className="block h-full w-full origin-top bg-ban/30" />
            </span>
            {history.map(([year, text]) => (
              <li key={year} data-reveal="up" className="relative grid grid-cols-[5rem_1fr] gap-4 py-5 pl-8 md:grid-cols-[7rem_1fr]">
                <span className="absolute left-0 top-[1.85rem] h-[11px] w-[11px] rounded-full border border-ban bg-tetsu" />
                <span className="font-mono text-xl md:text-2xl">{year}</span>
                <p className="pt-1 text-[15px] leading-[1.9] text-ban/80">{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* アクセス */}
      <section className="mx-auto grid max-w-[1360px] gap-10 px-5 py-20 md:grid-cols-12 md:px-10 md:py-32">
        <div className="md:col-span-4">
          <h2 data-split="lines" className="text-[clamp(26px,3vw,40px)] font-bold leading-[1.4]">
            アクセス
          </h2>
          <dl className="mt-8 space-y-6 text-[15px] leading-[1.9]">
            <div data-reveal="up">
              <dt className="font-bold">本社工場</dt>
              <dd className="text-tetsu/80">〒577-0066 大阪府東大阪市高井田西3丁目8-21</dd>
            </div>
            <div data-reveal="up">
              <dt className="font-bold">電車</dt>
              <dd className="text-tetsu/80">
                Osaka Metro 中央線「高井田」駅 4番出口から徒歩7分
                <br />
                JRおおさか東線「高井田中央」駅から徒歩9分
              </dd>
            </div>
            <div data-reveal="up">
              <dt className="font-bold">お車</dt>
              <dd className="text-tetsu/80">阪神高速13号東大阪線「高井田」出口から3分。来客用の駐車場が4台分あります。</dd>
            </div>
          </dl>
        </div>
        <div className="md:col-span-8">
          <AccessMap />
          <p className="mt-3 text-xs text-hagane">工場見学は平日10時と14時から。お問い合わせフォームからお申し込みください。</p>
        </div>
      </section>
    </>
  );
}

/** 図面のような略地図。駅・幹線道路・川と、工場の位置だけを描く */
function AccessMap() {
  return (
    <div className="grid-paper relative aspect-[4/3] overflow-hidden border border-tetsu bg-ban-hi md:aspect-[16/10]">
      <svg viewBox="0 0 800 500" className="h-full w-full" role="img" aria-label="高井田駅から本社工場までの略地図" data-draw>
        {/* 中央大通（上に阪神高速） */}
        <path d="M0 150H800" stroke="#15171a" strokeWidth="14" pathLength={1} fill="none" />
        <path d="M0 150H800" stroke="#f4f4f1" strokeWidth="10" pathLength={1} fill="none" />
        {/* 第二寝屋川 */}
        <path d="M0 380C160 360 260 420 420 400S680 340 800 360" stroke="#5c6267" strokeOpacity="0.45" strokeWidth="18" fill="none" pathLength={1} />
        {/* 細い道 */}
        <path d="M250 0V500M560 150V500M250 290H800" stroke="#15171a" strokeOpacity="0.35" strokeWidth="2" fill="none" pathLength={1} />
        {/* 道順 */}
        <path d="M250 165V290H520" stroke="#d48a1c" strokeWidth="4" fill="none" pathLength={1} />
      </svg>
      <span className="absolute left-[31.25%] top-[30%] -translate-x-1/2 -translate-y-1/2 bg-tetsu px-2 py-1 text-[11px] text-ban">高井田駅</span>
      <span className="absolute left-[4%] top-[24%] font-mono text-[10px] text-hagane">中央大通／阪神高速13号</span>
      <span className="absolute bottom-[14%] left-[6%] text-[11px] text-hagane">第二寝屋川</span>
      <span className="absolute left-[65%] top-[58%] -translate-x-1/2 -translate-y-full">
        <span className="block bg-abura px-3 py-1.5 text-xs font-bold text-tetsu">岡部製作所</span>
        <span className="mx-auto block h-3 w-px bg-tetsu" />
      </span>
      <span className="absolute bottom-3 right-3 font-mono text-[10px] text-hagane">N ↑　徒歩7分</span>
    </div>
  );
}
