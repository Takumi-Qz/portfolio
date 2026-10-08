/** 横に流れ続ける帯。中身を2回並べて -50% まで送る */
export function Marquee({ items, className = "", speed = 40 }: { items: string[]; className?: string; speed?: number }) {
  const row = (hidden?: boolean) => (
    <div aria-hidden={hidden} className="flex shrink-0 items-center">
      {items.map((t, i) => (
        <span key={i} className="flex items-center">
          <span className="px-8">{t}</span>
          <span className="opacity-40">✳︎</span>
        </span>
      ))}
    </div>
  );
  return (
    <div className={`group overflow-hidden ${className}`}>
      <div className="marquee flex w-max" style={{ animationDuration: `${speed}s` }}>
        {row()}
        {row(true)}
      </div>
    </div>
  );
}
