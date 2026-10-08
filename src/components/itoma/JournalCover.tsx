import type { Post } from "@/lib/itoma/data";

/** 写真の代わりの表紙：色面＋日付の数字＋縦書きのタグ */
export function JournalCover({ post, large = false }: { post: Post; large?: boolean }) {
  const [, m, d] = post.date.split(".");
  return (
    <div
      className={`relative overflow-hidden ${large ? "aspect-[16/9]" : "aspect-[3/2]"}`}
      style={{ background: post.tone }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_30%,rgba(255,255,255,.28),transparent_55%)]" />
      <span
        className={`absolute -bottom-[0.12em] left-4 font-mincho leading-none text-white/35 ${large ? "text-[34vw] md:text-[22vw]" : "text-[9rem]"}`}
      >
        {m}
        <span className="text-[0.4em]">.{d}</span>
      </span>
      <span className="vertical absolute right-4 top-4 font-mincho text-xs tracking-[0.4em] text-white/90">
        {post.tag}
      </span>
    </div>
  );
}
