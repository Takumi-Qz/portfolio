"use client";

import { useMemo, useRef, useState, useSyncExternalStore } from "react";
import { cabins, maxGuests, priceOf, seasonOf, vacancy, yen } from "@/lib/hotori/data";

const WEEK = ["日", "月", "火", "水", "木", "金", "土"];
const fmt = (d: Date) => `${d.getMonth() + 1}月${d.getDate()}日（${WEEK[d.getDay()]}）`;

/** 今日を基準にするので、サーバー側では null（静的書き出しでもずれないように） */
const todayKey = () => new Date().toDateString();
function useToday() {
  const key = useSyncExternalStore(
    () => () => {},
    todayKey,
    () => null,
  );
  return useMemo(() => (key ? new Date(key) : null), [key]);
}

const addDays = (d: Date, n: number) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);

export function Calendar() {
  const today = useToday();
  const [offset, setOffset] = useState(0);
  const [picked, setPicked] = useState<Date | null>(null);
  const [guests, setGuests] = useState(2);
  const [sent, setSent] = useState(false);
  const panel = useRef<HTMLDivElement>(null);

  if (!today) return <div className="min-h-[520px]" />;

  const first = new Date(today.getFullYear(), today.getMonth() + offset, 1);
  const days = new Date(first.getFullYear(), first.getMonth() + 1, 0).getDate();
  const cells = [...Array(first.getDay()).fill(null), ...Array.from({ length: days }, (_, i) => new Date(first.getFullYear(), first.getMonth(), i + 1))];
  const free = picked ? vacancy(picked) : [];

  return (
    <div className="grid gap-12 lg:grid-cols-12">
      <div className="lg:col-span-7">
        <div className="mb-6 flex items-end justify-between">
          <p className="num text-3xl font-black">
            {first.getFullYear()}年{first.getMonth() + 1}月
          </p>
          <div className="flex gap-2 text-sm">
            <button type="button" disabled={offset === 0} onClick={() => setOffset(offset - 1)} className="border border-moku/25 px-4 py-2 disabled:opacity-30">
              前の月
            </button>
            <button type="button" disabled={offset === 2} onClick={() => setOffset(offset + 1)} className="border border-moku/25 px-4 py-2 disabled:opacity-30">
              次の月
            </button>
          </div>
        </div>
        <div className="grid grid-cols-7 border-l border-t border-moku/15 text-center">
          {WEEK.map((w, i) => (
            <div key={w} className={`border-b border-r border-moku/15 py-2 text-xs ${i === 0 ? "text-hi" : "text-moku/60"}`}>
              {w}
            </div>
          ))}
          {cells.map((d, i) => {
            if (!d) return <div key={`e${i}`} className="border-b border-r border-moku/15" />;
            const past = d < today;
            const left = past ? 0 : vacancy(d).length;
            const active = picked?.getTime() === d.getTime();
            const mark = left === 2 ? "○" : left === 1 ? "△" : "×";
            return (
              <button
                key={d.getDate()}
                type="button"
                disabled={past || left === 0}
                onClick={() => {
                  setPicked(d);
                  setSent(false);
                  // スマホではカレンダーの下に料金が出るので、そこまで送る
                  if (window.innerWidth < 1024) requestAnimationFrame(() => panel.current?.scrollIntoView({ behavior: "smooth", block: "center" }));
                }}
                aria-label={`${fmt(d)} ${past ? "受付終了" : left === 0 ? "満室" : `残り${left}棟`}`}
                className={`flex aspect-square flex-col items-center justify-center gap-1 border-b border-r border-moku/15 transition-colors md:aspect-[5/4] ${
                  active ? "bg-moku text-yuki" : past ? "text-moku/25" : left === 0 ? "text-moku/40" : "hover:bg-moku/[0.06]"
                }`}
              >
                <span className="num text-sm">{d.getDate()}</span>
                {!past && <span className={`text-xs ${left === 0 ? "" : "text-hi"}`}>{mark}</span>}
              </button>
            );
          })}
        </div>
        <p className="mt-4 text-xs leading-relaxed text-moku/60">○ 2棟とも空き　△ 残り1棟　× 満室　／　3か月先まで予約できます</p>
      </div>

      <div ref={panel} className="lg:sticky lg:top-10 lg:col-span-5 lg:self-start">
        {!picked ? (
          <div className="border-t border-moku/25 pt-6 text-[15px] leading-[2] text-moku/70">
            カレンダーから泊まりたい日を選ぶと、
            <br />
            空いている棟と料金が出ます。
          </div>
        ) : (
          <div className="border-t border-moku pt-6">
            <p className="text-sm text-moku/60">{seasonOf(picked).name}の料金・1泊朝食付き</p>
            <p className="mt-1 text-3xl font-black">{fmt(picked)}</p>
            <dl className="mt-8 divide-y divide-moku/15 border-y border-moku/15 text-[15px]">
              <div className="flex justify-between py-4">
                <dt>空いている棟</dt>
                <dd>{cabins.map((c) => (free.includes(c) ? c : null)).filter(Boolean).join("・")}</dd>
              </div>
              <div className="flex items-center justify-between py-4">
                <dt>人数</dt>
                <dd className="flex items-center gap-4">
                  <button type="button" aria-label="1人減らす" onClick={() => setGuests(Math.max(1, guests - 1))} className="h-8 w-8 border border-moku/25">
                    −
                  </button>
                  <span className="num w-8 text-center">{guests}名</span>
                  <button type="button" aria-label="1人増やす" onClick={() => setGuests(Math.min(maxGuests, guests + 1))} className="h-8 w-8 border border-moku/25">
                    ＋
                  </button>
                </dd>
              </div>
              <div className="flex items-baseline justify-between py-4">
                <dt>合計（税込）</dt>
                <dd className="num text-3xl font-black">{yen(priceOf(picked, Math.max(2, guests)))}</dd>
              </div>
            </dl>
            <button
              type="button"
              onClick={() => setSent(true)}
              className="mt-6 w-full bg-hi py-5 text-[17px] font-bold text-moku-deep transition-[filter] hover:brightness-110"
            >
              この日で予約に進む
            </button>
            <p className="mt-3 text-xs leading-relaxed text-moku/60">
              {sent ? "これはポートフォリオ用のデモです。実際の予約は受け付けていません。" : "次の画面で、お名前と到着時刻を入力します。お支払いは現地です。"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

/** 今日以降でいちばん近い空き日 */
export function NextVacancy() {
  const today = useToday();
  if (!today) return <span className="opacity-0">—</span>;
  let d = today;
  for (let i = 0; i < 90 && vacancy(d).length === 0; i++) d = addDays(d, 1);
  const date = `${d.getMonth() + 1}月${d.getDate()}日`;
  return (
    <>
      {d.getTime() === today.getTime() ? `今夜、${date}` : date}
      <span className="text-[0.45em]">（{WEEK[d.getDay()]}）</span>
    </>
  );
}
