import type { Metadata } from "next";
import { Suspense } from "react";
import { ContactForm } from "@/components/okabe/ContactForm";
import { PageHead } from "@/components/okabe/PageHead";
import { company } from "@/lib/okabe/data";

export const metadata: Metadata = { title: "お問い合わせ・見積り" };

export default function Contact() {
  return (
    <>
      <PageHead
        no="05"
        crumb="お問い合わせ"
        title="図面一枚から、ご相談ください。"
        lead="見積りは24時間以内にお返事します。図面がまだ固まっていない段階でも、形や数量がわかれば、削り方と費用の目安をお伝えできます。"
      />
      <section className="mx-auto grid max-w-[1360px] gap-14 px-5 py-16 md:grid-cols-12 md:px-10 md:py-24">
        <div className="md:col-span-7">
          {/* ?type= を読むため、静的書き出しでは Suspense が必要 */}
          <Suspense>
            <ContactForm />
          </Suspense>
        </div>
        <aside className="md:col-span-4 md:col-start-9">
          <div className="sticky top-28 space-y-10">
            <div>
              <p className="text-sm font-bold">お電話でのご相談</p>
              <a href={`tel:${company.tel}`} className="mt-2 block font-mono text-3xl">
                {company.tel}
              </a>
              <p className="mt-1 text-xs text-hagane">受付 {company.hours}</p>
            </div>
            <ol className="border-t-2 border-tetsu text-sm">
              {[
                ["送信", "図面と数量をお送りください"],
                ["24時間以内", "加工方法・納期・費用をお返事"],
                ["ご注文", "最短3日で出荷"],
              ].map(([t, d], i) => (
                <li key={t} className="flex gap-4 border-b border-sen py-4">
                  <span className="font-mono text-hagane">{String(i + 1).padStart(2, "0")}</span>
                  <span>
                    <span className="font-bold">{t}</span>
                    <span className="mt-1 block text-tetsu/75">{d}</span>
                  </span>
                </li>
              ))}
            </ol>
            <p className="text-xs leading-[1.9] text-hagane">
              いただいた図面は、見積りと加工の目的以外には使いません。ご注文に至らなかった場合も、ご希望に応じて図面データを削除します。
            </p>
          </div>
        </aside>
      </section>
    </>
  );
}
