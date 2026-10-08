import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JournalCover } from "@/components/itoma/JournalCover";
import { BASE, getPost, posts } from "@/lib/itoma/data";

export const dynamicParams = false;

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/works/itoma/journal/[slug]">): Promise<Metadata> {
  const p = getPost((await params).slug);
  return p ? { title: p.title, description: p.excerpt } : {};
}

export default async function PostPage({ params }: PageProps<"/works/itoma/journal/[slug]">) {
  const post = getPost((await params).slug);
  if (!post) notFound();
  const i = posts.indexOf(post);
  const next = posts[(i + 1) % posts.length];

  return (
    <article className="mx-auto max-w-[1320px] px-5 md:px-10">
      <header className="mx-auto max-w-3xl py-16 text-center md:py-24">
        <p className="flex justify-center gap-4 text-xs text-mute">
          <span className="num">{post.date}</span>
          <span>{post.tag}</span>
        </p>
        <h1 data-split="lines" className="mt-6 font-mincho text-3xl leading-[1.7] tracking-jp md:text-5xl">{post.title}</h1>
      </header>
      <div data-reveal="clip" className="overflow-hidden">
        <div>
          <JournalCover post={post} large />
        </div>
      </div>
      <div className="mx-auto mt-16 max-w-[34rem] md:mt-24">
        <p className="font-mincho text-lg leading-[2.2]">{post.excerpt}</p>
        <div data-stagger className="mt-10 space-y-8 text-[15px] leading-[2.3] text-sumi">
          {post.body.map((b, j) => (
            <p key={j}>{b}</p>
          ))}
        </div>
        <p className="mt-16 text-right text-xs tracking-jp text-mute">ITOMA 西陣工房</p>
      </div>

      <nav className="mx-auto mt-24 grid max-w-3xl gap-4 border-t border-line pt-8 text-sm md:grid-cols-2">
        <Link href={`${BASE}/journal`} className="link-u justify-self-start">← 読みもの一覧</Link>
        <Link href={`${BASE}/journal/${next.slug}`} className="group md:text-right">
          <span className="text-xs text-mute">次の記事</span>
          <span className="mt-1 block font-mincho text-lg group-hover:text-kaki">{next.title}</span>
        </Link>
      </nav>
    </article>
  );
}
