"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BASE, categories } from "@/lib/itoma/data";
import { useCart } from "./CartProvider";

const nav = [
  { href: `${BASE}/collections/all`, label: "商品一覧" },
  { href: `${BASE}/journal`, label: "読みもの" },
  { href: `${BASE}/about`, label: "工房について" },
];

export function Header() {
  const { count, setDrawer } = useCart();
  const [hidden, setHidden] = useState(false);

  // 下にスクロールすると隠れ、上に戻すと出てくる
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > 160 && y > last);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const pathname = usePathname();
  // 開いたときのパスを覚え、ページ遷移したら自動で閉じる
  const [openAt, setOpenAt] = useState<string | null>(null);
  const open = openAt === pathname;

  return (
    <header
      style={{ viewTransitionName: "site-header" }}
      className={`sticky top-0 z-40 border-b border-line/70 bg-kinari/90 backdrop-blur transition-transform duration-500 ease-[cubic-bezier(.7,0,.2,1)] ${
        hidden && !open ? "-translate-y-full" : ""
      }`}
    >
      <div className="mx-auto grid h-16 max-w-[1320px] grid-cols-[1fr_auto_1fr] items-center px-5 md:h-20 md:px-10">
        <nav className="hidden gap-8 text-[13px] tracking-jp md:flex">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} className="link-u">
              {n.label}
            </Link>
          ))}
        </nav>
        <button
          className="justify-self-start text-[13px] tracking-jp md:hidden"
          onClick={() => setOpenAt(open ? null : pathname)}
          aria-expanded={open}
        >
          {open ? "閉じる" : "メニュー"}
        </button>

        <Link href={BASE} className="flex flex-col items-center leading-none">
          <span className="font-roman text-[26px] tracking-[0.42em] md:text-[30px]">ITOMA</span>
          <span className="mt-1 font-mincho text-[10px] tracking-[0.5em] text-mute">いとま</span>
        </Link>

        <div className="flex items-center justify-self-end gap-6 text-[13px] tracking-jp">
          <Link href={`${BASE}/contact`} className="link-u hidden md:inline">
            お問い合わせ
          </Link>
          <button onClick={() => setDrawer(true)} className="flex items-center gap-2" data-cursor="開く">
            カート
            <span key={count} style={{ animation: count ? "bump .5s cubic-bezier(.3,1.6,.5,1)" : undefined }} className="grid h-6 min-w-6 place-items-center rounded-full bg-ink px-1.5 num text-[11px] text-kinari">
              {count}
            </span>
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-line bg-kinari px-5 pb-10 pt-6 md:hidden">
          <ul className="space-y-5 font-mincho text-xl">
            {nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href}>{n.label}</Link>
              </li>
            ))}
            <li>
              <Link href={`${BASE}/contact`}>お問い合わせ</Link>
            </li>
          </ul>
          <p className="mt-8 text-xs tracking-jp text-mute">カテゴリー</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link href={`${BASE}/collections/${c.slug}`} className="block border border-line px-4 py-2 font-mincho">
                  {c.verb}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
