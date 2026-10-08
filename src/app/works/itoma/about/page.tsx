import type { Metadata } from "next";
import Link from "next/link";
import { PageTitle } from "@/components/itoma/PageTitle";
import { BASE } from "@/lib/itoma/data";

export const metadata: Metadata = { title: "工房について" };

const history = [
  ["2019", "京北の柚子農家で、搾ったあとの皮を分けてもらう。台所で最初のオイルをつくる。"],
  ["2021", "西陣の町家の一階を借り、工房にする。化粧品製造業の許可を取得。"],
  ["2022", "ほどく、しずめる、ねむるの三品で販売開始。初回ロットは各100本。"],
  ["2024", "製造を一度に300本までと決める。つくり手が三人になる。"],
  ["2026", "新作のバームと、ギフトセットを追加。"],
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-[1320px] px-5 md:px-10">
      <PageTitle en="About ITOMA">
        暇（いとま）を、
        <br />
        つくるための道具。
      </PageTitle>

      <section className="grid gap-12 border-t border-line py-20 md:grid-cols-12">
        <h2 data-split="chars" className="vertical font-mincho text-2xl tracking-[0.3em] md:col-span-2 md:text-3xl">名前のこと</h2>
        <div data-stagger className="space-y-6 text-[15px] leading-[2.3] text-sumi md:col-span-6">
          <p>
            「いとま」は、仕事や用事のあいだに生まれる、少しの空き時間のこと。古い言葉で、いまはあまり使われなくなりました。
          </p>
          <p>
            一日の終わり、顔を洗ってから眠るまでの数分間。その時間だけは、何かに追われずにいてほしい。そう考えて、手順が少なく、迷わずに使える化粧品をつくることにしました。
          </p>
        </div>
        <div data-reveal="clip" className="aspect-[3/4] overflow-hidden md:col-span-3 md:col-start-10" aria-hidden>
          <div className="warp h-full w-full opacity-70" />
        </div>
      </section>

      <section className="grid gap-12 border-t border-line py-20 md:grid-cols-12">
        <h2 data-split="chars" className="vertical font-mincho text-2xl tracking-[0.3em] md:col-span-2 md:text-3xl">三つの約束</h2>
        <ol data-stagger className="grid gap-10 md:col-span-10 md:grid-cols-3">
          {[
            ["成分は、減らす方向に。", "一つ加えるたびに、本当に必要か三人で話し合います。合成香料と着色料は使いません。"],
            ["一度に、三百本まで。", "充填から検品まで、目が届く量だけ。製造番号ごとに記録を残しています。"],
            ["残りものから、つくる。", "柚子の皮や種、ヒノキの端材、酒粕。誰かの仕事で余ったものを、素材にしています。"],
          ].map(([t, d], i) => (
            <li key={t}>
              <span className="font-mincho text-6xl text-kaki">{["一", "二", "三"][i]}</span>
              <h3 className="mt-4 font-mincho text-xl">{t}</h3>
              <p className="mt-4 text-sm leading-[2.1] text-sumi">{d}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="grid gap-12 border-t border-line py-20 md:grid-cols-12">
        <h2 data-split="chars" className="vertical font-mincho text-2xl tracking-[0.3em] md:col-span-2 md:text-3xl">これまで</h2>
        <dl data-stagger className="md:col-span-8">
          {history.map(([y, t]) => (
            <div key={y} className="grid grid-cols-[5rem_1fr] gap-6 border-b border-line py-6">
              <dt className="font-mincho text-2xl">{y}</dt>
              <dd className="pt-1 text-sm leading-[2] text-sumi">{t}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="bg-paper px-6 py-16 text-center md:py-24">
        <p className="font-mincho text-2xl leading-relaxed md:text-3xl">工房は、毎月第二土曜だけ開いています。</p>
        <p className="mt-4 text-sm text-sumi">ご来店の際は、事前にご連絡ください。</p>
        <Link href={`${BASE}/contact`} className="mt-10 inline-block border border-ink px-8 py-3.5 text-sm tracking-jp transition-colors hover:bg-ink hover:text-kinari">
          お問い合わせ
        </Link>
      </section>
    </div>
  );
}
