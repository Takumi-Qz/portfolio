"use client";

import { useState } from "react";
import type { Product } from "@/lib/itoma/data";
import { ProductCard } from "./ProductCard";

const sorts = {
  recommended: "おすすめ順",
  priceAsc: "価格の安い順",
  priceDesc: "価格の高い順",
} as const;

type Sort = keyof typeof sorts;
const min = (p: Product) => Math.min(...p.variants.map((v) => v.price));

export function SortableGrid({ items }: { items: Product[] }) {
  const [sort, setSort] = useState<Sort>("recommended");
  const sorted = [...items].sort((a, b) =>
    sort === "priceAsc" ? min(a) - min(b) : sort === "priceDesc" ? min(b) - min(a) : 0,
  );

  return (
    <>
      <div className="mb-10 flex items-center justify-between border-b border-line pb-4 text-sm">
        <p className="text-mute">
          <span className="num text-ink">{items.length}</span>件
        </p>
        <label className="flex items-center gap-3">
          <span className="text-mute">並び替え</span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
            className="border-b border-ink bg-transparent py-1 pr-6 focus:outline-none"
          >
            {Object.entries(sorts).map(([k, v]) => (
              <option key={k} value={k}>
                {v}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div data-stagger className="grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-3 md:gap-x-8 md:gap-y-16">
        {sorted.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>
    </>
  );
}
