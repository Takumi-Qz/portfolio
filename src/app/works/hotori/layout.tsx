import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "ほとり — 白樺湖のほとり、薪サウナ付きの一棟貸し",
  description: "長野・白樺湖の北岸に二棟だけ。棟ごとに薪サウナがあり、水風呂のかわりに湖があります。（ポートフォリオ用の架空の宿です）",
};

export default function HotoriLayout({ children }: LayoutProps<"/works/hotori">) {
  return (
    <div className="flex min-h-screen flex-col bg-moku font-gothic text-yuki [&_:is(h1,h2,h3,blockquote)]:[word-break:auto-phrase]">
      <div className="bg-moku-deep px-5 py-2 text-center text-[11px] tracking-wider text-yuki/70">
        これはポートフォリオ用の架空の宿のランディングページです。
        <Link href="/" className="ml-2 underline underline-offset-2">
          制作者のサイトへ戻る
        </Link>
      </div>
      <main className="flex-1">{children}</main>
    </div>
  );
}
