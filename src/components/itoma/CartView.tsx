"use client";

import Link from "next/link";
import { useState } from "react";
import { BASE, FREE_SHIPPING, GIFT_WRAP, SHIPPING_FEE, getProduct, yen } from "@/lib/itoma/data";
import { useCart } from "./CartProvider";
import { Price } from "./Price";
import { ProductArt } from "./ProductArt";

export function CartView() {
  const { ready, lines, setQty, remove } = useCart();
  const [gift, setGift] = useState(false);
  const [checkout, setCheckout] = useState(false);

  const items = lines.flatMap((l) => {
    const p = getProduct(l.slug);
    const v = p?.variants.find((x) => x.id === l.variant);
    return p && v ? [{ ...l, p, v }] : [];
  });
  const subtotal = items.reduce((n, i) => n + i.v.price * i.qty, 0);
  const shipping = subtotal >= FREE_SHIPPING ? 0 : SHIPPING_FEE;
  const total = subtotal + shipping + (gift ? GIFT_WRAP : 0);
  const rest = FREE_SHIPPING - subtotal;

  if (!ready) return <div className="min-h-[40vh] border-t border-line" />;

  if (items.length === 0)
    return (
      <div className="border-t border-line py-24 text-center">
        <p className="font-mincho text-xl">カートは空です。</p>
        <p className="mt-3 text-sm text-mute">はじめての方は、7日分のお試しからどうぞ。</p>
        <div className="mt-10 flex flex-wrap justify-center gap-3 text-sm tracking-jp">
          <Link href={`${BASE}/products/tamesu-trial`} className="bg-ink px-7 py-3.5 text-kinari">
            ためす（7日分）を見る
          </Link>
          <Link href={`${BASE}/collections/all`} className="border border-ink px-7 py-3.5">
            商品一覧へ
          </Link>
        </div>
      </div>
    );

  return (
    <div className="grid gap-14 md:grid-cols-12">
      <ul className="border-t border-line md:col-span-7">
        {items.map(({ p, v, qty }) => (
          <li key={`${p.slug}-${v.id}`} className="grid grid-cols-[88px_1fr] gap-5 border-b border-line py-6 md:grid-cols-[120px_1fr_auto]">
            <Link href={`${BASE}/products/${p.slug}`} className="aspect-[4/5]">
              <ProductArt art={p.art} name={p.name} id={`cart-${p.slug}-${v.id}`} view="detail" />
            </Link>
            <div className="flex flex-col">
              <p className="text-[11px] tracking-jp text-mute">{p.kind}</p>
              <Link href={`${BASE}/products/${p.slug}`} className="font-mincho text-xl tracking-jp">
                {p.name}
              </Link>
              <p className="mt-1 text-xs text-sumi">{v.label}</p>
              <div className="mt-auto flex items-center gap-5 pt-4">
                <div className="flex items-center border border-line text-sm">
                  <button aria-label="数量を減らす" className="h-9 w-9" onClick={() => setQty(p.slug, v.id, qty - 1)}>
                    −
                  </button>
                  <span className="num w-6 text-center">{qty}</span>
                  <button aria-label="数量を増やす" className="h-9 w-9" onClick={() => setQty(p.slug, v.id, qty + 1)}>
                    ＋
                  </button>
                </div>
                <button className="link-u text-xs text-mute" onClick={() => remove(p.slug, v.id)}>
                  削除
                </button>
              </div>
            </div>
            <p className="col-start-2 md:col-start-3 md:text-right">
              <Price value={v.price * qty} />
            </p>
          </li>
        ))}
      </ul>

      <aside className="md:col-span-4 md:col-start-9">
        <div className="bg-paper p-6 md:sticky md:top-28 md:p-8">
          <p className="text-sm">
            {rest > 0 ? (
              <>
                あと<Price value={rest} className="mx-1 text-base font-medium" />で送料無料
              </>
            ) : (
              "送料無料でお届けします"
            )}
          </p>
          <div className="mt-3 h-[2px] bg-line">
            <div className="h-full bg-kaki transition-all" style={{ width: `${Math.min(100, (subtotal / FREE_SHIPPING) * 100)}%` }} />
          </div>

          <label className="mt-8 flex cursor-pointer items-start gap-3 text-sm">
            <input type="checkbox" checked={gift} onChange={(e) => setGift(e.target.checked)} className="mt-1 accent-ink" />
            <span>
              帯の端切れでギフト包装する（+{yen(GIFT_WRAP)}）
              <span className="mt-1 block text-xs text-mute">柄はお選びいただけません</span>
            </span>
          </label>

          <label className="mt-6 block text-sm">
            <span className="text-xs tracking-jp text-mute">備考・メッセージカード</span>
            <textarea rows={3} className="mt-2 w-full border border-line bg-kinari p-3 text-sm focus:border-ink focus:outline-none" />
          </label>

          <dl className="mt-8 space-y-3 border-t border-line pt-6 text-sm">
            <Row label="小計" value={yen(subtotal)} />
            <Row label="送料" value={shipping ? yen(shipping) : "無料"} />
            {gift && <Row label="ギフト包装" value={yen(GIFT_WRAP)} />}
            <div className="flex items-baseline justify-between border-t border-line pt-4">
              <dt>合計（税込）</dt>
              <dd className="text-2xl">
                <Price value={total} />
              </dd>
            </div>
          </dl>

          <button
            onClick={() => setCheckout(true)}
            className="mt-8 h-14 w-full bg-ink text-sm tracking-[0.2em] text-kinari transition-colors hover:bg-kaki"
          >
            ご購入手続きへ
          </button>
          {checkout && (
            <p role="status" className="mt-4 text-xs leading-relaxed text-kaki">
              デモサイトのため決済には進みません。実際のストアではShopifyチェックアウトへ遷移します。
            </p>
          )}
          <p className="mt-4 text-center text-[11px] text-mute">Shop Pay / Apple Pay / Google Pay / クレジットカード</p>
        </div>
      </aside>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <dt className="text-sumi">{label}</dt>
      <dd className="num">{value}</dd>
    </div>
  );
}
