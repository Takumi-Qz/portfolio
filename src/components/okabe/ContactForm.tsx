"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

const kinds = [
  { key: "quote", label: "見積りの依頼" },
  { key: "tech", label: "加工・材質のご相談" },
  { key: "visit", label: "工場見学（お取引先さま）" },
  { key: "recruit", label: "採用について（見学・応募）" },
];

export function ContactForm() {
  // 採用ページなどから ?type=recruit で来たら種別を選んでおく
  const type = useSearchParams().get("type");
  const [kind, setKind] = useState(kinds.some((k) => k.key === type) ? type! : "quote");
  const [files, setFiles] = useState<File[]>([]);
  const [sent, setSent] = useState(false);
  const quote = kind === "quote";

  if (sent)
    return (
      <div role="status" className="border-t-2 border-tetsu py-16">
        <p className="text-3xl font-bold">送信しました。</p>
        <p className="mt-6 text-[15px] leading-[2] text-tetsu/80">
          {quote ? "24時間以内に、見積りをメールでお送りします。" : "2営業日以内に、担当者からご連絡します。"}
          <br />
          （デモサイトのため、実際には送信されていません）
        </p>
      </div>
    );

  return (
    <form
      className="border-t-2 border-tetsu"
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      <fieldset className="border-b border-sen py-8">
        <legend className="sr-only">お問い合わせの種類</legend>
        <p className="text-sm font-bold">
          お問い合わせの種類<Req />
        </p>
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {kinds.map((k) => (
            <label
              key={k.key}
              className={`flex cursor-pointer items-center gap-3 border px-4 py-4 text-[15px] transition-colors ${
                kind === k.key ? "border-tetsu bg-tetsu text-ban" : "border-sen hover:border-tetsu"
              }`}
            >
              <input type="radio" name="kind" value={k.key} checked={kind === k.key} onChange={() => setKind(k.key)} className="sr-only" />
              <span className={`h-3 w-3 rounded-full border ${kind === k.key ? "border-abura bg-abura" : "border-hagane"}`} />
              {k.label}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-x-8 sm:grid-cols-2">
        <Field label="会社名・学校名" required={kind !== "recruit"}>
          <input name="company" required={kind !== "recruit"} autoComplete="organization" className={input} />
        </Field>
        <Field label="部署">
          <input name="dept" className={input} />
        </Field>
        <Field label="お名前" required>
          <input name="name" required autoComplete="name" className={input} />
        </Field>
        <Field label="メールアドレス" required>
          <input type="email" name="email" required autoComplete="email" className={input} />
        </Field>
        <Field label="電話番号">
          <input type="tel" name="tel" autoComplete="tel" className={`${input} font-mono`} />
        </Field>
      </div>

      {quote && (
        <>
          <div className="border-b border-sen py-6">
            <p className="text-sm font-bold">図面ファイル</p>
            <p className="mt-1 text-xs text-hagane">PDF・STEP・IGES・DXF・DWG、1ファイル20MBまで。手描きの写真でも構いません。</p>
            <label className="mt-4 flex cursor-pointer flex-col items-center justify-center gap-2 border border-dashed border-hagane bg-ban-hi px-6 py-10 text-center transition-colors hover:border-tetsu">
              <span className="font-mono text-2xl" aria-hidden>+</span>
              <span className="text-sm">ファイルを選ぶ</span>
              <input
                type="file"
                name="drawings"
                multiple
                accept=".pdf,.step,.stp,.igs,.iges,.dxf,.dwg,image/*"
                className="sr-only"
                onChange={(e) => setFiles(Array.from(e.target.files ?? []))}
              />
            </label>
            {files.length > 0 && (
              <ul className="mt-3 space-y-1 font-mono text-xs">
                {files.map((f) => (
                  <li key={f.name} className="flex justify-between gap-4 border-b border-sen py-2">
                    <span className="truncate">{f.name}</span>
                    <span className="text-hagane">{(f.size / 1024 / 1024).toFixed(1)} MB</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="grid gap-x-8 sm:grid-cols-3">
            <Field label="材質">
              <input name="material" placeholder="例：SUS316L" className={input} />
            </Field>
            <Field label="数量">
              <input name="qty" inputMode="numeric" placeholder="例：5個" className={input} />
            </Field>
            <Field label="希望の納期">
              <input name="due" placeholder="例：10月末まで" className={input} />
            </Field>
          </div>
        </>
      )}

      <Field label="内容" required={!quote}>
        <textarea name="message" rows={5} required={!quote} className={`${input} resize-y`} />
      </Field>

      <div className="mt-6 space-y-4 border-t border-sen py-8 text-sm">
        {quote && (
          <label className="flex items-start gap-3">
            <input type="checkbox" name="nda" className="mt-1 accent-tetsu" />
            <span>図面を送る前に、秘密保持契約（NDA）を結びたい</span>
          </label>
        )}
        <label className="flex items-start gap-3">
          <input type="checkbox" required className="mt-1 accent-tetsu" />
          <span>個人情報の取り扱いに同意します</span>
        </label>
      </div>

      <button className="group flex h-16 w-full items-center justify-between bg-tetsu px-7 text-ban transition-colors hover:bg-abura hover:text-tetsu md:w-80">
        {quote ? "見積りを依頼する" : "送信する"}
        <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
      </button>
    </form>
  );
}

const input = "mt-2 w-full border-b border-sen bg-transparent py-3 text-[15px] transition-colors placeholder:text-hagane/60 focus:border-tetsu focus:outline-none";

function Req() {
  return <span className="ml-2 bg-abura px-1.5 py-0.5 text-[10px] font-bold text-tetsu">必須</span>;
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="block pt-6">
      <span className="text-sm font-bold">
        {label}
        {required && <Req />}
      </span>
      {children}
    </label>
  );
}
