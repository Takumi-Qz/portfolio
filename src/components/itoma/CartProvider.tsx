"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";

export type Line = { slug: string; variant: string; qty: number };

type Cart = {
  ready: boolean;
  lines: Line[];
  count: number;
  add: (line: Line) => void;
  setQty: (slug: string, variant: string, qty: number) => void;
  remove: (slug: string, variant: string) => void;
  /** 直前に追加した行（ドロワーで強調する） */
  lastAdded: Line | null;
  drawer: boolean;
  setDrawer: (open: boolean) => void;
};

const CartContext = createContext<Cart | null>(null);
const KEY = "itoma-cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<Line[]>([]);
  const [ready, setReady] = useState(false);
  const [lastAdded, setLastAdded] = useState<Line | null>(null);
  const [drawer, setDrawerState] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(KEY);
      // localStorage はマウント後にしか読めないため、ここで復元する
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (saved) setLines(JSON.parse(saved));
    } catch {}
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(lines));
    } catch {}
  }, [lines, ready]);

  const setDrawer = useCallback((open: boolean) => {
    setDrawerState(open);
    if (!open) setLastAdded(null);
  }, []);

  const same = (l: Line, slug: string, variant: string) => l.slug === slug && l.variant === variant;

  const value: Cart = {
    ready,
    lines,
    count: lines.reduce((n, l) => n + l.qty, 0),
    add: (line) => {
      setLines((prev) =>
        prev.some((l) => same(l, line.slug, line.variant))
          ? prev.map((l) => (same(l, line.slug, line.variant) ? { ...l, qty: l.qty + line.qty } : l))
          : [...prev, line],
      );
      setLastAdded(line);
      setDrawerState(true);
    },
    setQty: (slug, variant, qty) =>
      setLines((prev) => prev.map((l) => (same(l, slug, variant) ? { ...l, qty: Math.max(1, Math.min(9, qty)) } : l))),
    remove: (slug, variant) => setLines((prev) => prev.filter((l) => !same(l, slug, variant))),
    lastAdded,
    drawer,
    setDrawer,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
