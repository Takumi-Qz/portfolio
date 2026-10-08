import Link from "next/link";
import { ViewTransition } from "react";
import { BASE, getCategory, type Product } from "@/lib/itoma/data";
import { Price } from "./Price";
import { ProductArt } from "./ProductArt";

export function ProductCard({ product }: { product: Product }) {
  const from = Math.min(...product.variants.map((v) => v.price));
  const multi = product.variants.length > 1;

  return (
    <Link href={`${BASE}/products/${product.slug}`} className="group block" data-cursor="見る">
      <div className="relative aspect-[4/5] overflow-hidden">
        <ViewTransition name={`product-${product.slug}`} share="morph">
          <div className="h-full w-full transition-transform duration-[1.4s] ease-[cubic-bezier(.2,.8,.2,1)] group-hover:scale-[1.06]">
            <ProductArt art={product.art} name={product.name} id={`card-${product.slug}`} />
          </div>
        </ViewTransition>
        {/* ホバーで寄りのカットに切り替える（Shopifyテーマの「2枚目の画像」） */}
        <div className="absolute inset-0 opacity-0 transition-[opacity,clip-path] duration-700 ease-[cubic-bezier(.7,0,.2,1)] [clip-path:inset(0_0_100%_0)] group-hover:opacity-100 group-hover:[clip-path:inset(0_0_0%_0)]">
          <ProductArt art={product.art} name={product.name} id={`card-${product.slug}`} view="detail" />
        </div>
        {product.badge && (
          <span className="absolute left-3 top-3 bg-kinari/90 px-2.5 py-1 text-[11px] tracking-jp">{product.badge}</span>
        )}
      </div>
      <div className="mt-4 flex items-baseline justify-between gap-4">
        <div>
          <p className="text-[11px] tracking-jp text-mute">
            {getCategory(product.category)?.verb}　{product.kind}
          </p>
          <h3 className="mt-1 font-mincho text-lg tracking-jp">
            <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0_1px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-500 group-hover:bg-[length:100%_1px]">
              {product.name}
            </span>
          </h3>
        </div>
        <p className="shrink-0 text-base">
          <Price value={from} />
          {multi && <span className="ml-0.5 text-xs text-mute">〜</span>}
        </p>
      </div>
      <p className="mt-1 text-xs text-mute">{product.volume}</p>
    </Link>
  );
}
