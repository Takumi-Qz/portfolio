"use client";

import Link from "next/link";
import { useEffect } from "react";
import { BASE, FREE_SHIPPING, getProduct } from "@/lib/itoma/data";
import { getLenis } from "../motion/SmoothScroll";
import { useCart } from "./CartProvider";
import { Price } from "./Price";
import { ProductArt } from "./ProductArt";

/** Aesop などで見られる、右からせり出すカート */
export function CartDrawer() {
  const { drawer, setDrawer, lines, lastAdded, setQty, remove } = useCart();

  useEffect(() => {
    const lenis = getLenis();
    if (drawer) lenis?.stop();
    else lenis?.start();
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setDrawer(false);
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [drawer, setDrawer]);

  const items = lines.flatMap((l) => {
    const p = getProduct(l.slug);
    const v = p?.variants.find((x) => x.id === l.variant);
    return p && v ? [{ ...l, p, v }] : [];
  });
  const subtotal = items.reduce((n, i) => n + i.v.price * i.qty, 0);
  const rest = FREE_SHIPPING - subtotal;

  return (
    <div className={`fixed inset-0 z-[60] ${drawer ? "" : "pointer-events-none"}`} aria-hidden={!drawer}>
      <div
        onClick={() => setDrawer(false)}
        className={`absolute inset-0 bg-ink/40 backdrop-blur-[2px] transition-opacity duration-700 ${drawer ? "opacity-100" : "opacity-0"}`}
      />
      <aside
        role="dialog"
        aria-label="カート"
        className={`absolute right-0 top-0 flex h-full w-full max-w-[440px] flex-col bg-kinari transition-transform duration-700 ease-[cubic-bezier(.7,0,.2,1)] ${
          drawer ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-line px-6 py-5">
          <p className="font-mincho text-lg tracking-[0.2em]">
            カート<span className="num ml-3 text-xs text-mute">{items.length}点</span>
          </p>
          <button onClick={() => setDrawer(false)} className="link-u text-sm tracking-jp">
            閉じる
          </button>
        </div>

        <div className="px-6 pt-5">
          <p className="text-xs">
            {rest > 0 ? <>あと<Price value={rest} className="mx-1 font-medium" />で送料無料</> : "送料無料でお届けします"}
          </p>
          <div className="mt-2 h-[2px] bg-line">
            <div className="h-full bg-kaki transition-[width] duration-1000" style={{ width: `${Math.min(100, (subtotal / FREE_SHIPPING) * 100)}%` }} />
          </div>
        </div>

        <ul data-lenis-prevent className="flex-1 overflow-y-auto px-6">
          {items.length === 0 && <li className="py-16 text-center font-mincho text-mute">まだ何も入っていません。</li>}
          {items.map(({ p, v, qty }, i) => {
            const fresh = lastAdded?.slug === p.slug && lastAdded.variant === v.id;
            return (
              <li
                key={`${p.slug}-${v.id}`}
                className="grid grid-cols-[72px_1fr_auto] gap-4 border-b border-line py-5"
                style={{
                  transition: "opacity .6s, translate .6s",
                  transitionDelay: drawer ? `${0.25 + i * 0.06}s` : "0s",
                  opacity: drawer ? 1 : 0,
                  translate: drawer ? "0 0" : "24px 0",
                }}
              >
                <div className="aspect-[4/5]">
                  <ProductArt art={p.art} name={p.name} id={`drawer-${p.slug}-${v.id}`} view="detail" />
                </div>
                <div>
                  {fresh && <p className="mb-1 text-[10px] tracking-[0.2em] text-kaki">追加しました</p>}
                  <p className="font-mincho text-lg">{p.name}</p>
                  <p className="text-xs text-mute">{v.label}</p>
                  <div className="mt-3 flex items-center gap-4 text-sm">
                    <button aria-label="減らす" onClick={() => setQty(p.slug, v.id, qty - 1)}>−</button>
                    <span className="num">{qty}</span>
                    <button aria-label="増やす" onClick={() => setQty(p.slug, v.id, qty + 1)}>＋</button>
                    <button className="ml-2 text-xs text-mute underline" onClick={() => remove(p.slug, v.id)}>削除</button>
                  </div>
                </div>
                <p className="text-sm">
                  <Price value={v.price * qty} />
                </p>
              </li>
            );
          })}
        </ul>

        <div className="border-t border-line px-6 py-6">
          <div className="flex items-baseline justify-between text-sm">
            <span>小計（税込）</span>
            <span className="text-xl">
              <Price value={subtotal} />
            </span>
          </div>
          <Link
            href={`${BASE}/cart`}
            onClick={() => setDrawer(false)}
            className="mt-5 grid h-14 place-items-center bg-ink text-sm tracking-[0.2em] text-kinari transition-colors hover:bg-kaki"
          >
            カートを見る・購入手続きへ
          </Link>
          <button onClick={() => setDrawer(false)} className="mt-3 w-full py-2 text-xs tracking-jp text-mute">
            買い物を続ける
          </button>
        </div>
      </aside>
    </div>
  );
}
