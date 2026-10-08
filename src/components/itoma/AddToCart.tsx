"use client";

import { useState } from "react";
import type { Product } from "@/lib/itoma/data";
import { Price } from "./Price";
import { useCart } from "./CartProvider";

export function AddToCart({ product }: { product: Product }) {
  const { add } = useCart();
  const [variant, setVariant] = useState(product.variants[0].id);
  const [qty, setQty] = useState(1);
  const current = product.variants.find((v) => v.id === variant)!;

  return (
    <div>
      <p className="text-3xl">
        <Price value={current.price} tax />
      </p>

      {product.variants.length > 1 && (
        <fieldset className="mt-8">
          <legend className="text-xs tracking-jp text-mute">種類</legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {product.variants.map((v) => (
              <label
                key={v.id}
                className={`cursor-pointer border px-5 py-2.5 text-sm transition-colors ${
                  v.id === variant ? "border-ink bg-ink text-kinari" : "border-line hover:border-ink"
                }`}
              >
                <input
                  type="radio"
                  name="variant"
                  value={v.id}
                  checked={v.id === variant}
                  onChange={() => setVariant(v.id)}
                  className="sr-only"
                />
                {v.label}
              </label>
            ))}
          </div>
        </fieldset>
      )}

      <div className="mt-8 flex gap-3">
        <div className="flex items-center border border-line">
          <button type="button" aria-label="数量を減らす" className="h-14 w-11" onClick={() => setQty((q) => Math.max(1, q - 1))}>
            −
          </button>
          <span className="num w-8 text-center" aria-live="polite">
            {qty}
          </span>
          <button type="button" aria-label="数量を増やす" className="h-14 w-11" onClick={() => setQty((q) => Math.min(9, q + 1))}>
            ＋
          </button>
        </div>
        <button
          type="button"
          onClick={() => add({ slug: product.slug, variant, qty })}
          className="h-14 flex-1 bg-ink text-sm tracking-[0.2em] text-kinari transition-colors hover:bg-kaki"
        >
          カートに入れる
        </button>
      </div>
      <p className="mt-4 text-xs leading-relaxed text-mute">8,800円以上のご注文で送料無料。2営業日以内に京都から発送します。</p>
    </div>
  );
}
