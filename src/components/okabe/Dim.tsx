/**
 * 図面の寸法線。両端の補助線と矢印、中央に寸法の数字。
 * data-draw で左右から線が伸びる
 */
export function Dim({ label, className = "", delay }: { label: string; className?: string; delay?: number }) {
  return (
    <div className={`flex items-center gap-2 ${className}`} data-draw data-delay={delay}>
      <Half side="l" />
      <span className="shrink-0 font-mono text-[11px] tracking-wider md:text-xs">{label}</span>
      <Half side="r" />
    </div>
  );
}

function Half({ side }: { side: "l" | "r" }) {
  const l = side === "l";
  return (
    <span className={`relative flex h-4 flex-1 items-center ${l ? "" : "flex-row-reverse"}`}>
      {/* 補助線 */}
      <span className="h-full w-px shrink-0 bg-current opacity-60" />
      {/* 矢印 */}
      <svg viewBox="0 0 8 8" className={`h-2 w-2 shrink-0 ${l ? "" : "rotate-180"}`} aria-hidden>
        <path d="M0 4 8 1v6z" fill="currentColor" />
      </svg>
      <span data-line className={`h-px flex-1 bg-current ${l ? "origin-left" : "origin-right"}`} />
    </span>
  );
}
