"use client";

import Link from "next/link";
import { useState } from "react";

const kinds = ["商品について", "ご注文・配送について", "返品・返金について", "卸・取材のご相談", "その他"];

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const [kind, setKind] = useState(kinds[0]);
  const needsOrder = kind === "ご注文・配送について" || kind === "返品・返金について";

  if (sent)
    return (
      <div role="status" className="border-t border-line py-16">
        <p className="font-mincho text-2xl">送信しました。</p>
        <p className="mt-4 text-sm leading-[2] text-sumi">
          2営業日以内に、ご入力のメールアドレスへお返事します。
          <br />
          （デモサイトのため、実際には送信されていません）
        </p>
      </div>
    );

  return (
    <form
      className="space-y-8 border-t border-line pt-10"
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      <Field label="お名前" required>
        <input required name="name" autoComplete="name" className={input} />
      </Field>
      <Field label="メールアドレス" required>
        <input required type="email" name="email" autoComplete="email" className={input} />
      </Field>
      <Field label="お問い合わせの種類" required>
        <select value={kind} onChange={(e) => setKind(e.target.value)} className={input}>
          {kinds.map((k) => (
            <option key={k}>{k}</option>
          ))}
        </select>
      </Field>
      {needsOrder && (
        <Field label="注文番号" note="ご注文確認メールに記載の #1001 のような番号">
          <input name="order" placeholder="#" className={input} />
        </Field>
      )}
      <Field label="内容" required>
        <textarea required name="message" rows={6} className={`${input} resize-y`} />
      </Field>
      <label className="flex items-start gap-3 text-sm">
        <input required type="checkbox" className="mt-1 accent-ink" />
        <span>
          <Link href="/works/itoma/legal/privacy" className="underline underline-offset-2">プライバシーポリシー</Link>
          に同意します
        </span>
      </label>
      <button className="h-14 w-full bg-ink text-sm tracking-[0.2em] text-kinari transition-colors hover:bg-kaki md:w-64">
        送信する
      </button>
    </form>
  );
}

const input =
  "mt-2 w-full border-b border-line bg-transparent py-3 text-[15px] transition-colors focus:border-ink focus:outline-none";

function Field({ label, required, note, children }: { label: string; required?: boolean; note?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-sm">
        {label}
        {required && <span className="ml-2 text-xs text-kaki">必須</span>}
      </span>
      {note && <span className="ml-3 text-xs text-mute">{note}</span>}
      {children}
    </label>
  );
}
