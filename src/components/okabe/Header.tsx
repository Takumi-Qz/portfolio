"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BASE, company, nav } from "@/lib/okabe/data";
import { Mark } from "./Mark";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  // 開いたときのパスを覚え、ページ遷移したら自動で閉じる
  const [openAt, setOpenAt] = useState<string | null>(null);
  const open = openAt === pathname;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      style={{ viewTransitionName: "site-header" }}
      className={`sticky top-0 z-40 border-b transition-colors duration-300 ${
        scrolled || open ? "border-sen bg-ban/92 backdrop-blur" : "border-transparent bg-ban"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1360px] items-center justify-between gap-6 px-5 md:h-[72px] md:px-10">
        <Link href={BASE} className="flex items-center gap-3">
          <Mark />
          <span className="leading-none">
            <span className="block text-[19px] font-bold tracking-[0.06em]">{company.short}</span>
            <span className="mt-1 block text-[10px] tracking-[0.12em] text-hagane">東大阪　精密切削加工</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm lg:flex">
          {nav.map((n) => {
            const active = pathname.startsWith(n.href);
            return (
              <Link key={n.href} href={n.href} className={`group flex items-baseline gap-1.5 ${active ? "text-tetsu" : "text-tetsu/75 hover:text-tetsu"}`}>
                <span className={`font-mono text-[10px] ${active ? "text-abura" : "text-hagane"}`}>{n.no}</span>
                <span className={`link-u ${active ? "bg-[length:100%_1px]" : ""}`}>{n.label}</span>
              </Link>
            );
          })}
          <Link href={`${BASE}/contact`} className="flex items-center gap-2 bg-tetsu px-5 py-3 text-ban transition-colors hover:bg-abura hover:text-tetsu">
            図面を送って見積り
            <span aria-hidden>→</span>
          </Link>
        </nav>

        <button
          className="flex items-center gap-2 text-sm lg:hidden"
          onClick={() => setOpenAt(open ? null : pathname)}
          aria-expanded={open}
          aria-controls="okabe-menu"
        >
          <span>{open ? "閉じる" : "メニュー"}</span>
          <span className="relative block h-3 w-5" aria-hidden>
            <span className={`absolute left-0 h-px w-full bg-current transition-transform ${open ? "top-1.5 rotate-45" : "top-0"}`} />
            <span className={`absolute left-0 h-px w-full bg-current transition-transform ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
          </span>
        </button>
      </div>

      {open && (
        <nav id="okabe-menu" className="border-t border-sen bg-ban px-5 pb-8 pt-4 lg:hidden">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} className="flex items-baseline gap-3 border-b border-sen py-4 text-lg">
              <span className="font-mono text-xs text-hagane">{n.no}</span>
              {n.label}
            </Link>
          ))}
          <Link href={`${BASE}/contact`} className="mt-6 flex items-center justify-between bg-tetsu px-5 py-4 text-ban">
            図面を送って見積り <span aria-hidden>→</span>
          </Link>
          <a href={`tel:${company.tel}`} className="mt-3 block text-center font-mono text-sm">
            TEL {company.tel}
          </a>
        </nav>
      )}
    </header>
  );
}
