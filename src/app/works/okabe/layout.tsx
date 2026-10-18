import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/okabe/Footer";
import { Header } from "@/components/okabe/Header";

export const metadata: Metadata = {
  title: {
    default: "岡部製作所 — 東大阪の精密切削加工。一個の試作から",
    template: "%s | 岡部製作所",
  },
  description:
    "医療機器・航空宇宙・半導体製造装置の精密部品を、一個の試作から削る東大阪の町工場。5軸加工機7台、公差±0.003mm。（ポートフォリオ用の架空の会社です）",
};

export default function OkabeLayout({ children }: LayoutProps<"/works/okabe">) {
  return (
    <div className="flex min-h-screen flex-col bg-ban font-plex text-tetsu [&_:is(h1,h2,h3,blockquote)]:[word-break:auto-phrase]">
      <div className="bg-tetsu px-5 py-2 text-center text-[11px] tracking-wider text-ban/70">
        これはポートフォリオ用の架空の会社のサイトです。
        <Link href="/" className="ml-2 underline underline-offset-2">
          制作者のサイトへ戻る
        </Link>
      </div>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
