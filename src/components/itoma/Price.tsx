/** 価格は「4,180円（税込）」の日本式。本文と同じゴシックの等幅数字で組む */
export function Price({ value, tax = false, className = "" }: { value: number; tax?: boolean; className?: string }) {
  return (
    <span className={`num whitespace-nowrap ${className}`}>
      {value.toLocaleString("ja-JP")}
      <span className="ml-[0.1em] text-[0.62em]">円</span>
      {tax && <span className="ml-1 text-[0.5em] text-mute">（税込）</span>}
    </span>
  );
}
