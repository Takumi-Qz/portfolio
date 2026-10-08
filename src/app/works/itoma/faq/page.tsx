import type { Metadata } from "next";
import Link from "next/link";
import { PageTitle } from "@/components/itoma/PageTitle";
import { BASE, faqs } from "@/lib/itoma/data";

export const metadata: Metadata = { title: "よくある質問" };

export default function FaqPage() {
  return (
    <div className="mx-auto max-w-[1320px] px-5 md:px-10">
      <PageTitle en="FAQ" lead="解決しない場合は、お問い合わせフォームからご連絡ください。2営業日以内にお返事します。">
        よくある質問
      </PageTitle>
      <div className="grid gap-12 md:grid-cols-12">
        <nav className="hidden md:col-span-3 md:block">
          <ul className="sticky top-28 space-y-3 text-sm">
            {faqs.map((g, i) => (
              <li key={g.group}>
                <a href={`#faq-${i}`} className="link-u">{g.group}</a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="space-y-16 md:col-span-8 md:col-start-5">
          {faqs.map((g, i) => (
            <section key={g.group} id={`faq-${i}`} className="scroll-mt-28">
              <h2 className="mb-4 font-mincho text-2xl tracking-jp">{g.group}</h2>
              {g.items.map((f) => (
                <details key={f.q} className="border-b border-line first-of-type:border-t">
                  <summary className="flex items-start justify-between gap-6 py-6">
                    <span className="flex gap-4">
                      <span className="font-mincho text-lg text-kaki">問</span>
                      <span className="pt-0.5">{f.q}</span>
                    </span>
                    <span className="plus text-lg transition-transform">＋</span>
                  </summary>
                  <p className="flex gap-4 pb-8 text-sm leading-[2.1] text-sumi">
                    <span className="font-mincho text-lg text-mute">答</span>
                    <span className="pt-0.5">{f.a}</span>
                  </p>
                </details>
              ))}
            </section>
          ))}
          <p className="text-sm">
            <Link href={`${BASE}/contact`} className="border-b border-ink pb-0.5">お問い合わせフォームへ →</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
