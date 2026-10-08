"use client";

import { useState } from "react";

export function Newsletter() {
  const [done, setDone] = useState(false);

  if (done)
    return <p className="mt-8 border-b border-kinari/30 pb-3 text-sm">ご登録ありがとうございます（デモのため送信はされません）。</p>;

  return (
    <form
      className="mt-8 flex border-b border-kinari/40"
      onSubmit={(e) => {
        e.preventDefault();
        setDone(true);
      }}
    >
      <label htmlFor="nl-email" className="sr-only">
        メールアドレス
      </label>
      <input
        id="nl-email"
        type="email"
        required
        placeholder="メールアドレス"
        className="w-full bg-transparent py-3 text-sm placeholder:text-kinari/40 focus:outline-none"
      />
      <button className="shrink-0 px-2 text-sm tracking-jp">登録する →</button>
    </form>
  );
}
