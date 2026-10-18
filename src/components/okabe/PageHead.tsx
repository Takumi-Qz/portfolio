import Link from "next/link";
import { BASE } from "@/lib/okabe/data";

/** 下層ページの見出し。右下に図面の表題欄を置く */
export function PageHead({ no, title, lead, crumb }: { no: string; title: string; lead: string; crumb: string }) {
  return (
    <section className="grid-paper border-b border-sen">
      <div className="mx-auto max-w-[1360px] px-5 pb-12 pt-10 md:px-10 md:pb-16 md:pt-14">
        <nav aria-label="パンくず" className="text-xs text-hagane">
          <Link href={BASE} className="link-u">トップ</Link>
          <span className="mx-2">/</span>
          <span>{crumb}</span>
        </nav>
        <div className="mt-14 grid gap-10 md:mt-24 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <h1 data-split="lines" className="text-[clamp(40px,7vw,104px)] font-bold leading-[1.1] tracking-[-0.02em]">
              {title}
            </h1>
            <p data-reveal="up" className="mt-8 max-w-[36em] text-[15px] leading-[2] text-hagane md:text-base">
              {lead}
            </p>
          </div>
          <dl data-reveal="up" className="hidden grid-cols-[auto_1fr] border border-tetsu md:grid text-[11px] md:col-span-4 md:col-start-9 md:text-xs">
            {[
              ["図名", crumb],
              ["図番", `OKB-HP-${no}`],
              ["尺度", "1 : 1"],
              ["改訂", "2026.10"],
            ].map(([k, v], i) => (
              <div key={k} className={`contents ${i ? "[&>*]:border-t [&>*]:border-tetsu" : ""}`}>
                <dt className="border-r border-tetsu px-3 py-2 text-hagane">{k}</dt>
                <dd className="px-3 py-2 font-mono">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
