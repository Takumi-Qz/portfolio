import Link from "next/link";
import { JournalCover } from "@/components/itoma/JournalCover";
import { ProductArt } from "@/components/itoma/ProductArt";
import { ProductShelf } from "@/components/itoma/ProductShelf";
import { CursorPreview } from "@/components/motion/CursorPreview";
import { Magnetic } from "@/components/motion/Magnetic";
import { Marquee } from "@/components/motion/Marquee";
import { BASE, categories, getProduct, posts, products } from "@/lib/itoma/data";

export default function ItomaTop() {
  const hero = getProduct("hodoku-oil")!;
  const heroSub = getProduct("nemuru-balm")!;

  return (
    <>
      {/* Hero */}
      <section className="mx-auto grid max-w-[1320px] gap-10 px-5 pb-24 pt-10 md:grid-cols-12 md:px-10 md:pt-16">
        <div className="flex justify-between md:col-span-4 md:flex-col md:justify-start">
          <h1 data-split="chars" className="vertical font-mincho text-[34px] leading-[1.9] tracking-[0.2em] md:text-[46px]">
            一日の終わりに、
            <br />
            <span className="inline-block pt-[2.2em]">三分間の暇を。</span>
          </h1>
          <p data-reveal="up" data-delay="1.4" className="vertical self-end text-[11px] leading-loose tracking-[0.3em] text-mute md:mt-auto md:self-start">
            京都・西陣の小さな工房から
          </p>
        </div>

        <div className="relative md:col-span-8">
          <div data-speed="0.12" className="md:ml-auto md:w-[78%]">
            <div data-reveal="clip" className="aspect-[4/5] overflow-hidden">
              <div className="h-full w-full">
                <ProductArt art={hero.art} name={hero.name} id="hero" view="top" />
              </div>
            </div>
          </div>
          <div data-speed="-0.35" className="absolute -bottom-16 left-0 hidden w-[34%] md:block">
            <div data-reveal="clip" className="aspect-square overflow-hidden border-[10px] border-kinari">
              <div className="h-full w-full">
                <ProductArt art={heroSub.art} name={heroSub.name} id="hero-sub" view="detail" />
              </div>
            </div>
          </div>
          <p data-reveal="up" data-delay="1" className="mt-5 text-right text-xs tracking-jp text-mute md:mt-6">
            ほどく　クレンジングオイル　150mL
          </p>
        </div>
      </section>

      {/* Statement */}
      <section className="mx-auto max-w-[1320px] px-5 py-20 md:px-10 md:py-36">
        <div className="grid gap-10 md:grid-cols-12">
          <p data-reveal="up" className="text-xs tracking-jp text-mute md:col-span-2">
            わたしたちのこと
          </p>
          <div className="md:col-span-10">
            <div className="font-mincho text-[20px] leading-[2.1] md:text-[30px] md:[&>p]:whitespace-nowrap">
              <p data-split="lines">化粧品を、増やすより減らしたい。</p>
              <p data-split="lines" data-delay="0.12">夜の手入れは三つの手順で、三分間で終わるように。</p>
              <p data-split="lines" data-delay="0.24">そのかわり、使うものは一つずつ丁寧につくります。</p>
            </div>
            <div data-stagger className="mt-14 grid max-w-3xl grid-cols-3 border-t border-line pt-6 text-sm">
              {[
                ["300", "本", "一度につくる上限"],
                ["7", "品", "定番は七つだけ"],
                ["3", "人", "工房のつくり手"],
              ].map(([n, u, l]) => (
                <div key={l}>
                  <p className="font-mincho text-4xl md:text-6xl">
                    <span data-count>{n}</span>
                    <span className="ml-1 font-mincho text-base">{u}</span>
                  </p>
                  <p className="mt-2 text-xs tracking-jp text-mute">{l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Marquee
        className="border-y border-line py-5 font-mincho text-2xl tracking-[0.2em] text-sumi md:py-7 md:text-4xl"
        items={["一度に、三百本まで", "京北の柚子の皮から", "西陣の町家でつくる", "合成香料は使わない", "毎晩、三分間だけ"]}
      />

      {/* Categories — ホバーで商品が追従 */}
      <section className="mx-auto max-w-[1320px] px-5 pt-24 md:px-10 md:pt-36">
        <p data-reveal="up" className="mb-8 text-xs tracking-jp text-mute">
          四つの手順から選ぶ
        </p>
        <div className="border-t border-line">
          <CursorPreview
            boxClassName="h-80 w-64"
            rows={categories.map((c, i) => {
              const rep = products.find((p) => p.category === c.slug)!;
              return {
                key: c.slug,
                href: `${BASE}/collections/${c.slug}`,
                row: (
                  <div className="group grid grid-cols-[3rem_1fr_auto] items-center gap-4 border-b border-line py-7 md:grid-cols-[6rem_16rem_1fr_auto] md:py-12">
                    <span className="num text-xs text-mute">0{i + 1}</span>
                    <span className="font-mincho text-3xl tracking-[0.2em] transition-[translate,color] duration-500 group-hover:translate-x-3 group-hover:text-kaki md:text-6xl">
                      {c.verb}
                    </span>
                    <span className="hidden max-w-xl text-sm leading-loose text-sumi md:block">{c.lead}</span>
                    <span className="text-xs tracking-jp transition-transform duration-500 group-hover:translate-x-2">
                      {products.filter((p) => p.category === c.slug).length}品 →
                    </span>
                  </div>
                ),
                preview: <ProductArt art={rep.art} name={rep.name} id={`cat-${c.slug}`} />,
              };
            })}
          />
        </div>
      </section>

      {/* Shelf — 横に流れる商品棚 */}
      <div className="mt-24 md:mt-20">
        <ProductShelf items={products}>
          <div>
            <p className="text-xs tracking-jp text-mute">商品</p>
            <h2 data-split="lines" className="mt-4 font-mincho text-3xl leading-relaxed tracking-jp md:text-5xl">
              工房の棚に
              <br />
              並ぶもの
            </h2>
          </div>
          <div className="mt-10 md:mt-0">
            <p className="max-w-xs text-sm leading-[2.1] text-sumi">定番の七品と、贈りものが二つ。季節によって、限定のロットが加わります。</p>
            <Link href={`${BASE}/collections/all`} className="link-u mt-6 inline-block text-sm tracking-jp">
              一覧で見る →
            </Link>
          </div>
        </ProductShelf>
      </div>

      {/* Ritual */}
      <section className="bg-paper py-24 md:py-40">
        <div className="mx-auto grid max-w-[1320px] gap-14 px-5 md:grid-cols-12 md:px-10">
          <div className="md:col-span-4">
            <div className="md:sticky md:top-32">
              <p className="text-xs tracking-jp text-mute">使いかた</p>
              <h2 data-split="lines" className="mt-4 font-mincho text-3xl leading-relaxed tracking-jp md:text-5xl">
                三分間の
                <br />
                つかいかた
              </h2>
              <Link href={`${BASE}/journal/three-minutes`} className="link-u mt-8 inline-block text-sm tracking-jp">
                秒単位の手順を読む →
              </Link>
            </div>
          </div>
          <ol className="md:col-span-7 md:col-start-6">
            {[
              ["0:00", "落とす", "ほどくを2プッシュ。乾いた顔に30秒、なでるだけ。", "hodoku-oil"],
              ["1:30", "整える", "しずめるを3回に分けて。とどめるを3滴。", "shizumeru-lotion"],
              ["2:40", "守る", "ねむるを米粒2つ分。手のひらで溶かして顔を包む。", "nemuru-balm"],
            ].map(([t, v, d, s]) => {
              const p = getProduct(s)!;
              return (
                <li key={t} data-reveal="up" className="grid grid-cols-[1fr_96px] gap-6 border-t border-line py-10 md:grid-cols-[1fr_160px] md:py-14">
                  <div>
                    <p className="flex items-baseline gap-6">
                      <span className="font-mincho text-5xl md:text-7xl">{t}</span>
                      <span className="font-mincho text-xl tracking-[0.2em]">{v}</span>
                    </p>
                    <p className="mt-5 text-sm leading-loose text-sumi">
                      {d}
                      <Link href={`${BASE}/products/${s}`} className="ml-2 border-b border-sumi/40 text-xs">
                        {p.name}を見る
                      </Link>
                    </p>
                  </div>
                  <div className="aspect-[4/5]">
                    <ProductArt art={p.art} name={p.name} id={`ritual-${s}`} view="detail" />
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* Atelier */}
      <section className="mx-auto grid max-w-[1320px] items-center gap-12 px-5 py-24 md:grid-cols-12 md:px-10 md:py-40">
        <div data-reveal="clip" className="aspect-[3/4] overflow-hidden md:col-span-5">
          <div className="warp h-full w-full opacity-80" />
        </div>
        <div data-speed="-0.15" className="md:col-span-6 md:col-start-7">
          <p className="text-xs tracking-jp text-mute">西陣の工房</p>
          <h2 data-split="lines" className="mt-4 font-mincho text-3xl leading-[1.8] tracking-jp md:text-5xl">
            帯の糸を染めていた
            <br />
            町家の土間で。
          </h2>
          <p data-reveal="up" className="mt-8 max-w-md text-sm leading-[2.2] text-sumi">
            工房は、西陣の古い町家の一階にあります。元は帯の糸を染める作業場で、土間には今も藍の跡が残っています。充填から検品まで、三人の手で目が届く量だけをつくっています。
          </p>
          <Magnetic className="mt-10">
            <Link
              href={`${BASE}/about`}
              data-cursor="読む"
              className="grid h-32 w-32 place-items-center rounded-full border border-ink text-sm tracking-jp transition-colors duration-500 hover:bg-ink hover:text-kinari"
            >
              工房について
            </Link>
          </Magnetic>
        </div>
      </section>

      {/* Journal */}
      <section className="mx-auto max-w-[1320px] px-5 md:px-10">
        <div className="mb-12 flex items-end justify-between border-b border-line pb-6">
          <h2 data-split="lines" className="font-mincho text-2xl tracking-jp md:text-4xl">
            読みもの
          </h2>
          <Link href={`${BASE}/journal`} className="link-u text-sm tracking-jp">
            一覧へ
          </Link>
        </div>
        <div data-stagger className="grid gap-10 md:grid-cols-3">
          {posts.slice(0, 3).map((p, i) => (
            <Link key={p.slug} href={`${BASE}/journal/${p.slug}`} className={`group ${i === 1 ? "md:mt-16" : ""}`} data-cursor="読む">
              <div className="overflow-hidden">
                <div className="transition-transform duration-[1.2s] ease-[cubic-bezier(.2,.8,.2,1)] group-hover:scale-105">
                  <JournalCover post={p} />
                </div>
              </div>
              <p className="mt-4 flex gap-4 text-xs text-mute">
                <span className="num">{p.date}</span>
                <span>{p.tag}</span>
              </p>
              <h3 className="mt-2 font-mincho text-lg leading-relaxed transition-colors group-hover:text-kaki">{p.title}</h3>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
