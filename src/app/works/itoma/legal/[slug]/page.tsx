import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BASE, legalPages } from "@/lib/itoma/data";
import { legalContent } from "@/lib/itoma/legal";

export const dynamicParams = false;

export function generateStaticParams() {
  return legalPages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/works/itoma/legal/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const page = legalPages.find((p) => p.slug === slug);
  return page ? { title: page.title } : {};
}

export default async function LegalPage({ params }: PageProps<"/works/itoma/legal/[slug]">) {
  const { slug } = await params;
  const page = legalPages.find((p) => p.slug === slug);
  const content = legalContent[slug];
  if (!page || !content) notFound();

  return (
    <div className="mx-auto grid max-w-[1320px] gap-12 px-5 py-16 md:grid-cols-12 md:px-10 md:py-24">
      <nav className="md:col-span-3">
        <p className="text-xs tracking-jp text-mute">ご利用案内</p>
        <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-3 text-sm md:flex-col">
          {legalPages.map((p) => (
            <li key={p.slug}>
              <Link href={`${BASE}/legal/${p.slug}`} className={p.slug === slug ? "border-b border-ink pb-0.5" : "text-mute hover:text-ink"}>
                {p.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <article className="md:col-span-8 md:col-start-5">
        <h1 className="font-mincho text-3xl leading-snug tracking-jp md:text-4xl">{page.title}</h1>
        <p className="mt-4 text-xs text-mute">
          最終更新日 <span className="num">{content.updated}</span>
        </p>
        <p className="mt-6 border-l-2 border-kaki pl-4 text-xs leading-relaxed text-kaki">
          ポートフォリオ用の架空ブランドのサンプル文面です。事業者名・所在地等はすべて架空です。
        </p>
        {content.intro && <p className="mt-10 text-[15px] leading-[2.2] text-sumi">{content.intro}</p>}

        <div className="mt-10 space-y-12">
          {content.sections.map((s, i) => (
            <section key={i}>
              {s.heading && <h2 className="mb-4 font-mincho text-xl">{s.heading}</h2>}
              {s.body?.map((b, j) => (
                <p key={j} className="mt-3 text-[15px] leading-[2.2] text-sumi">
                  {b}
                </p>
              ))}
              {s.table && (
                <dl className="border-t border-line text-sm">
                  {s.table.map(([k, v]) => (
                    <div key={k} className="grid gap-1 border-b border-line py-5 md:grid-cols-[13rem_1fr] md:gap-6">
                      <dt className="text-mute">{k}</dt>
                      <dd className="leading-[1.9]">{v}</dd>
                    </div>
                  ))}
                </dl>
              )}
            </section>
          ))}
        </div>
      </article>
    </div>
  );
}
