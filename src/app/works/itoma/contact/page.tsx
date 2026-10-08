import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/itoma/ContactForm";
import { PageTitle } from "@/components/itoma/PageTitle";
import { BASE } from "@/lib/itoma/data";

export const metadata: Metadata = { title: "お問い合わせ" };

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-[1320px] px-5 md:px-10">
      <PageTitle en="Contact">お問い合わせ</PageTitle>
      <div className="grid gap-14 md:grid-cols-12">
        <aside className="space-y-10 text-sm leading-[2] text-sumi md:col-span-4">
          <p>
            お返事は、営業日（火〜土）の2日以内にお送りします。土日や連休明けは、少しお時間をいただくことがあります。
          </p>
          <div>
            <p className="font-mincho text-base text-ink">送る前に</p>
            <p className="mt-2">
              配送や返品についての多くは
              <Link href={`${BASE}/faq`} className="mx-1 underline underline-offset-2">よくある質問</Link>
              でお答えしています。
            </p>
          </div>
          <div>
            <p className="font-mincho text-base text-ink">工房</p>
            <p className="mt-2">
              京都府京都市上京区（架空の住所です）
              <br />
              毎月第二土曜 11:00–16:00 のみ開放
            </p>
          </div>
        </aside>
        <div className="md:col-span-7 md:col-start-6">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
