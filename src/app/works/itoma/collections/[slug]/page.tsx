import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SortableGrid } from "@/components/itoma/SortableGrid";
import { BASE, categories, getCategory, products } from "@/lib/itoma/data";

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ slug: "all" }, ...categories.map((c) => ({ slug: c.slug }))];
}

const ALL = {
  verb: "すべて",
  en: "All Products",
  lead: "定番の七品と、ギフト。季節によって限定のロットが加わります。",
};

export async function generateMetadata({ params }: PageProps<"/works/itoma/collections/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const c = slug === "all" ? ALL : getCategory(slug);
  return { title: c ? c.verb : "商品一覧" };
}

export default async function CollectionPage({ params }: PageProps<"/works/itoma/collections/[slug]">) {
  const { slug } = await params;
  const c = slug === "all" ? ALL : getCategory(slug);
  if (!c) notFound();
  const items = slug === "all" ? products : products.filter((p) => p.category === slug);

  return (
    <div className="mx-auto max-w-[1320px] px-5 md:px-10">
      <section className="grid gap-8 py-16 md:grid-cols-12 md:py-24">
        <div className="md:col-span-5">
          <p className="text-xs tracking-jp text-mute">商品一覧</p>
          <h1 data-split="chars" className="mt-3 font-mincho text-5xl tracking-[0.25em] md:text-7xl">{c.verb}</h1>
        </div>
        <p data-reveal="up" data-delay="0.4" className="max-w-md self-end text-sm leading-[2.2] text-sumi md:col-span-5 md:col-start-8">{c.lead}</p>
      </section>

      <nav className="-mx-5 mb-12 overflow-x-auto px-5 md:mx-0 md:px-0">
        <ul className="flex gap-2 whitespace-nowrap text-sm">
          {[{ slug: "all", verb: "すべて" }, ...categories].map((x) => (
            <li key={x.slug}>
              <Link
                href={`${BASE}/collections/${x.slug}`}
                className={`block border px-5 py-2 tracking-jp transition-colors ${
                  x.slug === slug ? "border-ink bg-ink text-kinari" : "border-line hover:border-ink"
                }`}
              >
                {x.verb}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <SortableGrid items={items} />
    </div>
  );
}
