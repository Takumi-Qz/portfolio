import type { Metadata } from "next";
import Link from "next/link";
import { JournalCover } from "@/components/itoma/JournalCover";
import { PageTitle } from "@/components/itoma/PageTitle";
import { BASE, posts } from "@/lib/itoma/data";

export const metadata: Metadata = { title: "読みもの" };

export default function JournalPage() {
  const [first, ...rest] = posts;
  return (
    <div className="mx-auto max-w-[1320px] px-5 md:px-10">
      <PageTitle en="Journal" lead="素材の産地のこと、工房のこと、肌のこと。月に一、二本のペースで書いています。">
        読みもの
      </PageTitle>

      <Link href={`${BASE}/journal/${first.slug}`} className="group grid gap-8 border-t border-line pt-10 md:grid-cols-12">
        <div className="md:col-span-8">
          <JournalCover post={first} large />
        </div>
        <div className="md:col-span-4">
          <p className="flex gap-4 text-xs text-mute">
            <span className="num">{first.date}</span>
            <span>{first.tag}</span>
          </p>
          <h2 className="mt-3 font-mincho text-3xl leading-relaxed group-hover:text-kaki">{first.title}</h2>
          <p className="mt-5 text-sm leading-[2.1] text-sumi">{first.excerpt}</p>
          <p className="mt-8 text-sm tracking-jp">続きを読む →</p>
        </div>
      </Link>

      <ul data-stagger className="mt-24">
        {rest.map((p) => (
          <li key={p.slug}>
            <Link
              href={`${BASE}/journal/${p.slug}`}
              className="group grid grid-cols-[1fr_96px] items-center gap-6 border-t border-line py-8 md:grid-cols-[9rem_8rem_1fr_200px]"
            >
              <span className="num text-sm text-mute">{p.date}</span>
              <span className="hidden text-xs tracking-jp text-mute md:block">{p.tag}</span>
              <div className="col-start-1 row-start-2 md:col-start-auto md:row-start-auto">
                <h2 className="font-mincho text-xl leading-relaxed group-hover:text-kaki">{p.title}</h2>
                <p className="mt-2 hidden text-sm text-sumi md:block">{p.excerpt}</p>
              </div>
              <div className="col-start-2 row-span-2 row-start-1 md:col-start-auto md:row-span-1 md:row-start-auto">
                <JournalCover post={p} />
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
