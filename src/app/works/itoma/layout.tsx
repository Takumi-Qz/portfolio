import type { Metadata } from "next";
import Link from "next/link";
import { CartDrawer } from "@/components/itoma/CartDrawer";
import { CartProvider } from "@/components/itoma/CartProvider";
import { Footer } from "@/components/itoma/Footer";
import { Header } from "@/components/itoma/Header";
import { Preloader } from "@/components/itoma/Preloader";
import { Cursor } from "@/components/motion/Cursor";

export const metadata: Metadata = {
  title: {
    default: "ITOMA いとま — 一日の終わりの、三分間のスキンケア",
    template: "%s | ITOMA いとま",
  },
  description: "京都・西陣の小さな工房でつくる、夜のためのスキンケア。（ポートフォリオ用の架空ブランドです）",
};

export default function ItomaLayout({ children }: LayoutProps<"/works/itoma">) {
  return (
    <CartProvider>
      {/* 2回目以降はプリローダーを描画前に消す */}
      <script
        dangerouslySetInnerHTML={{
          __html: "try{if(sessionStorage.getItem('itoma-intro')==='1')document.documentElement.dataset.intro='done'}catch(e){}",
        }}
      />
      <Preloader />
      <div className="grain flex min-h-screen flex-col bg-kinari font-gothic text-ink">
        <div className="bg-sumi px-5 py-2 text-center text-[11px] tracking-wider text-kinari/80">
          これはポートフォリオ用の架空ブランドのデモサイトです。
          <Link href="/" className="ml-2 underline underline-offset-2">
            制作者のサイトへ戻る
          </Link>
        </div>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <CartDrawer />
        <Cursor />
      </div>
    </CartProvider>
  );
}
