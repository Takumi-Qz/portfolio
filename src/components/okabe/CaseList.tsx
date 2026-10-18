"use client";

/* eslint-disable @next/next/no-img-element -- 静的書き出しのため画像最適化は使わない */
import { useState } from "react";
import { cases, industries, photo } from "@/lib/okabe/data";

const all = "すべて";

/** 業界で絞り込める加工実績の一覧。1件ずつ図面の仕様欄のように見せる */
export function CaseList() {
  const [filter, setFilter] = useState(all);
  const shown = filter === all ? cases : cases.filter((c) => c.industry === filter);

  return (
    <>
      <div role="group" aria-label="業界で絞り込む" className="flex flex-wrap gap-2">
        {[all, ...industries.map((d) => d.name)].map((name) => {
          const n = name === all ? cases.length : cases.filter((c) => c.industry === name).length;
          const on = filter === name;
          return (
            <button
              key={name}
              onClick={() => setFilter(name)}
              aria-pressed={on}
              className={`flex items-baseline gap-2 border px-4 py-2.5 text-sm transition-colors ${
                on ? "border-tetsu bg-tetsu text-ban" : "border-sen hover:border-tetsu"
              }`}
            >
              {name}
              <span className={`font-mono text-[11px] ${on ? "text-abura" : "text-hagane"}`}>{n}</span>
            </button>
          );
        })}
      </div>

      <ol className="mt-12 border-t-2 border-tetsu">
        {shown.map((c, i) => (
          <li key={c.slug} id={c.slug} className="grid scroll-mt-28 gap-6 border-b border-sen py-10 md:grid-cols-12 md:gap-10 md:py-14">
            <div className="md:col-span-5">
              <div className="aspect-[4/3] overflow-hidden bg-tetsu">
                <img src={photo(c.photo)} alt={c.title} className="h-full w-full object-cover" loading={i < 2 ? "eager" : "lazy"} />
              </div>
            </div>
            <div className="flex flex-col md:col-span-7">
              <div className="flex items-baseline gap-4">
                <span className="font-mono text-sm text-hagane">{String(cases.indexOf(c) + 1).padStart(2, "0")}</span>
                <span className="text-xs text-hagane">{c.industry}</span>
              </div>
              <h2 className="mt-3 text-[clamp(22px,2.4vw,32px)] font-bold leading-[1.4]">{c.title}</h2>
              <p className="mt-4 max-w-[34em] text-[15px] leading-[2] text-tetsu/80">{c.note}</p>
              <dl className="mt-auto grid grid-cols-2 border-l border-t border-sen text-sm sm:grid-cols-3 md:mt-8">
                {[
                  ["材質", c.material],
                  ["寸法", c.size],
                  ["公差", c.tolerance],
                  ["数量", c.qty],
                  ["納期", c.days],
                ].map(([k, v], j) => (
                  <div key={k} className={`border-b border-r border-sen px-4 py-3 ${j === 0 ? "col-span-2" : ""}`}>
                    <dt className="text-[11px] text-hagane">{k}</dt>
                    <dd className="mt-1 font-mono text-[13px]">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </li>
        ))}
      </ol>
    </>
  );
}
