import Link from "next/link";
import { BASE, categories, legalPages } from "@/lib/itoma/data";
import { Newsletter } from "./Newsletter";

export function Footer() {
  return (
    <footer className="mt-32 bg-ink text-kinari">
      <div className="mx-auto max-w-[1320px] px-5 pt-20 md:px-10">
        <div className="grid gap-14 md:grid-cols-12">
          <div className="md:col-span-5">
            <p data-split="lines" className="font-mincho text-2xl leading-relaxed md:text-3xl">
              季節の便りを、
              <br />
              月に一度だけ。
            </p>
            <p className="mt-4 text-sm leading-loose text-kinari/60">
              新しいロットの仕込み日と、工房の近況をお送りします。
            </p>
            <Newsletter />
          </div>

          <FooterCol title="商品" className="md:col-span-2 md:col-start-7">
            <FooterLink href={`${BASE}/collections/all`}>すべての商品</FooterLink>
            {categories.map((c) => (
              <FooterLink key={c.slug} href={`${BASE}/collections/${c.slug}`}>
                {c.verb}
              </FooterLink>
            ))}
          </FooterCol>
          <FooterCol title="ITOMAについて" className="md:col-span-2">
            <FooterLink href={`${BASE}/about`}>工房について</FooterLink>
            <FooterLink href={`${BASE}/journal`}>読みもの</FooterLink>
            <FooterLink href={`${BASE}/faq`}>よくある質問</FooterLink>
            <FooterLink href={`${BASE}/contact`}>お問い合わせ</FooterLink>
          </FooterCol>
          <FooterCol title="ご利用案内" className="md:col-span-2">
            {legalPages.map((p) => (
              <FooterLink key={p.slug} href={`${BASE}/legal/${p.slug}`}>
                {p.title.replace("に基づく表記", "")}
              </FooterLink>
            ))}
          </FooterCol>
        </div>

        <div className="mt-24 flex flex-col justify-between gap-6 border-t border-kinari/15 py-8 text-xs text-kinari/50 md:flex-row md:items-end">
          <p className="leading-loose">
            ITOMA 西陣工房　〒602-0000 京都府京都市上京区（架空の住所です）
            <br />
            営業日 火〜土 11:00–17:00
          </p>
          <p className="num">© ITOMA 2026</p>
        </div>
      </div>
      <p
        aria-hidden
        data-split="chars"
        className="select-none overflow-hidden whitespace-nowrap text-center font-roman leading-[0.72] text-kinari/[0.07] text-[28vw]"
      >
        ITOMA
      </p>
    </footer>
  );
}

function FooterCol({ title, className, children }: { title: string; className?: string; children: React.ReactNode }) {
  return (
    <div className={className}>
      <p className="text-xs tracking-jp text-kinari/50">{title}</p>
      <ul className="mt-5 space-y-3 text-sm">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="link-u">
        {children}
      </Link>
    </li>
  );
}
