import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ViewTransition } from "react";
import { AddToCart } from "@/components/itoma/AddToCart";
import { ProductArt } from "@/components/itoma/ProductArt";
import { ProductCard } from "@/components/itoma/ProductCard";
import { BASE, getCategory, getProduct, products } from "@/lib/itoma/data";

export const dynamicParams = false;

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/works/itoma/products/[slug]">): Promise<Metadata> {
  const p = getProduct((await params).slug);
  return p ? { title: `${p.name} ${p.kind}`, description: p.tagline } : {};
}

export default async function ProductPage({ params }: PageProps<"/works/itoma/products/[slug]">) {
  const p = getProduct((await params).slug);
  if (!p) notFound();
  const cat = getCategory(p.category)!;
  const related = products.filter((x) => x.slug !== p.slug && x.category === p.category).concat(
    products.filter((x) => x.category !== p.category && x.category !== "gift"),
  ).slice(0, 3);

  return (
    <>
      <div className="mx-auto max-w-[1320px] px-5 md:px-10">
        <nav aria-label="パンくず" className="py-6 text-xs text-mute">
          <Link href={BASE} className="link-u">トップ</Link>
          <span className="mx-2">/</span>
          <Link href={`${BASE}/collections/${cat.slug}`} className="link-u">{cat.verb}</Link>
          <span className="mx-2">/</span>
          <span className="text-ink">{p.name}</span>
        </nav>

        <div className="grid gap-10 md:grid-cols-12 md:gap-14">
          {/* Gallery */}
          <div className="md:col-span-7">
            <ViewTransition name={`product-${p.slug}`} share="morph">
              <div className="aspect-[4/5]">
                <ProductArt art={p.art} name={p.name} id={`pdp-${p.slug}`} />
              </div>
            </ViewTransition>
            <div className="mt-3 grid grid-cols-2 gap-3" data-stagger>
              <div className="aspect-square">
                <ProductArt art={p.art} name={p.name} id={`pdp-${p.slug}`} view="detail" />
              </div>
              <div className="flex aspect-square flex-col justify-between bg-paper p-6 md:p-10">
                <p className="text-xs tracking-jp text-mute">主な素材</p>
                <ul className="space-y-5">
                  {p.keyIngredients.map((k) => (
                    <li key={k.name}>
                      <p className="font-mincho text-lg md:text-xl">{k.name}</p>
                      <p className="mt-1 text-xs leading-relaxed text-sumi">{k.note}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="md:col-span-5">
            <div className="md:sticky md:top-28">
              <p className="text-xs tracking-jp text-mute">
                {cat.verb}　{p.kind}　{p.volume}
              </p>
              <div className="mt-3 flex items-start justify-between gap-6">
                <h1 data-split="chars" className="font-mincho text-5xl tracking-[0.2em] md:text-6xl">{p.name}</h1>
                {p.badge && <span className="mt-2 shrink-0 border border-kaki px-2.5 py-1 text-[11px] text-kaki">{p.badge}</span>}
              </div>
              <p data-reveal="up" data-delay="0.3" className="mt-6 font-mincho text-lg">{p.tagline}</p>
              <div data-reveal="up" data-delay="0.45" className="mt-6 space-y-4 text-sm leading-[2.1] text-sumi">
                {p.description.map((d, i) => (
                  <p key={i}>{d}</p>
                ))}
              </div>

              <div className="mt-10 border-t border-line pt-8">
                <AddToCart product={p} />
              </div>

              <div className="mt-10 border-t border-line">
                <Accordion title="使い方" open>
                  <ol className="space-y-2">
                    {p.howTo.map((h, i) => (
                      <li key={i} className="flex gap-4">
                        <span className="num text-mute">{i + 1}</span>
                        {h}
                      </li>
                    ))}
                  </ol>
                </Accordion>
                <Accordion title="全成分">{p.ingredients}</Accordion>
                <Accordion title="配送・返品について">
                  2営業日以内に京都の工房より発送します。肌に合わなかった場合、開封後でもお届けから30日以内なら1回に限り返金いたします。
                  <Link href={`${BASE}/legal/refund`} className="ml-1 underline underline-offset-2">
                    返金ポリシー
                  </Link>
                </Accordion>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="mx-auto mt-32 max-w-[1320px] px-5 md:px-10">
        <h2 data-split="lines" className="mb-12 font-mincho text-2xl tracking-jp">
          一緒に使いたいもの
        </h2>
        <div data-stagger className="grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-3 md:gap-x-8">
          {related.map((r) => (
            <ProductCard key={r.slug} product={r} />
          ))}
        </div>
      </section>
    </>
  );
}

function Accordion({ title, open, children }: { title: string; open?: boolean; children: React.ReactNode }) {
  return (
    <details open={open} className="border-b border-line">
      <summary className="flex items-center justify-between py-5 text-sm tracking-jp">
        {title}
        <span className="plus text-lg transition-transform">＋</span>
      </summary>
      <div className="pb-6 text-sm leading-[2] text-sumi">{children}</div>
    </details>
  );
}
