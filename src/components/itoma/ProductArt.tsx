import type { Art } from "@/lib/itoma/data";

type View = "full" | "detail" | "top";

const VIEWBOX: Record<View, string> = {
  full: "0 0 400 500",
  detail: "90 150 220 275",
  top: "40 60 320 400",
};

export function isLight(hex: string) {
  const n = parseInt(hex.slice(1), 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  return 0.299 * r + 0.587 * g + 0.114 * b > 150;
}

export function ProductArt({
  art,
  name,
  id,
  view = "full",
  className = "",
}: {
  art: Art;
  name: string;
  id: string;
  view?: View;
  className?: string;
}) {
  const ink = isLight(art.label) ? "#2B2622" : "#F4EEE3";
  const gid = `${id}-${view}`;

  return (
    <svg
      viewBox={VIEWBOX[view]}
      className={`block h-full w-full ${className}`}
      role="img"
      aria-label={`${name}の商品イメージ`}
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id={`${gid}-gloss`} x1="0" x2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset=".18" stopColor="#fff" stopOpacity=".28" />
          <stop offset=".3" stopColor="#fff" stopOpacity="0" />
          <stop offset=".85" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity=".18" />
        </linearGradient>
        <linearGradient id={`${gid}-light`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity=".22" />
          <stop offset=".6" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <pattern id={`${gid}-obi`} width="12" height="12" patternUnits="userSpaceOnUse">
          <rect width="12" height="12" fill={art.cap} />
          <path d="M0 6h12M6 0v12" stroke="#000" strokeOpacity=".18" strokeWidth="1" />
          <circle cx="6" cy="6" r="1.6" fill="#fff" fillOpacity=".35" />
        </pattern>
      </defs>

      {/* 壁と台 */}
      <rect width="400" height="500" fill={art.bg} />
      <rect y="408" width="400" height="92" fill="#000" fillOpacity=".05" />
      <rect width="400" height="500" fill={`url(#${gid}-light)`} />
      <ellipse cx="200" cy="420" rx="120" ry="9" fill="#000" fillOpacity=".16" />

      <Body art={art} gid={gid} ink={ink} name={name} />
      {art.prop && <Prop kind={art.prop} />}
    </svg>
  );
}

/** room：縦方向に使える高さ。文字数が多いほど小さくする */
function VLabel({ x, y, size, room, ink, name }: { x: number; y: number; size: number; room: number; ink: string; name: string }) {
  size = Math.min(size, room / (name.length * 1.3));
  return (
    <text
      x={x}
      y={y}
      fill={ink}
      fontSize={size}
      fontFamily="var(--font-mincho)"
      style={{ writingMode: "vertical-rl", letterSpacing: "0.2em" }}
    >
      {name}
    </text>
  );
}

function Mark({ x, y, ink }: { x: number; y: number; ink: string }) {
  return (
    <text x={x} y={y} fill={ink} fontSize="8" textAnchor="middle" fontFamily="var(--font-roman)" letterSpacing="3">
      ITOMA
    </text>
  );
}

function Body({ art, gid, ink, name }: { art: Art; gid: string; ink: string; name: string }) {
  const gloss = `url(#${gid}-gloss)`;
  switch (art.shape) {
    case "pump":
    case "foam": {
      const foam = art.shape === "foam";
      const bx = foam ? 138 : 140;
      const bw = foam ? 124 : 120;
      const by = foam ? 250 : 215;
      return (
        <g>
          <rect x={bx} y={by} width={bw} height={420 - by} rx={foam ? 34 : 16} fill={art.body} />
          <rect x={bx} y={by} width={bw} height={420 - by} rx={foam ? 34 : 16} fill={gloss} />
          <rect x="181" y={by - 30} width="38" height="32" fill={art.body} />
          <rect x="181" y={by - 30} width="38" height="32" fill={gloss} />
          <rect x="172" y={by - 44} width="56" height="18" rx="3" fill={art.cap} />
          <rect x="194" y={by - 76} width="12" height="34" fill={art.cap} />
          <rect x="170" y={by - 94} width={foam ? 64 : 58} height={foam ? 24 : 20} rx="5" fill={art.cap} />
          <rect x={foam ? 228 : 222} y={by - 89} width={foam ? 26 : 38} height="8" rx="3" fill={art.cap} />
          <rect x="162" y={by + 42} width="76" height={foam ? 110 : 140} fill={art.label} />
          <VLabel x={200} y={by + 60} size={26} room={foam ? 70 : 100} ink={ink} name={name} />
          <Mark x={200} y={by + (foam ? 142 : 172)} ink={ink} />
        </g>
      );
    }
    case "dropper":
      return (
        <g>
          <rect x="150" y="262" width="100" height="158" rx="12" fill={art.body} />
          <rect x="150" y="262" width="100" height="158" rx="12" fill={gloss} />
          <rect x="178" y="232" width="44" height="32" rx="3" fill={art.cap} />
          <path d="M184 234 C178 200 180 168 200 160 C220 168 222 200 216 234 Z" fill={art.cap} />
          <path d="M184 234 C178 200 180 168 200 160 C220 168 222 200 216 234 Z" fill={gloss} />
          <rect x="166" y="280" width="68" height="124" fill={art.label} />
          <VLabel x={200} y={294} size={22} room={88} ink={ink} name={name} />
          <Mark x={200} y={396} ink={ink} />
        </g>
      );
    case "jar":
      return (
        <g>
          <rect x="112" y="318" width="176" height="102" rx="14" fill={art.body} />
          <rect x="112" y="318" width="176" height="102" rx="14" fill={gloss} />
          <rect x="106" y="280" width="188" height="44" rx="8" fill={art.cap} />
          <rect x="106" y="280" width="188" height="44" rx="8" fill={gloss} />
          <rect x="112" y="344" width="176" height="46" fill={art.label} />
          <text x="200" y="374" textAnchor="middle" fill={ink} fontSize="22" fontFamily="var(--font-mincho)" letterSpacing="8">
            {name}
          </text>
          <Mark x={200} y={404} ink={art.label} />
        </g>
      );
    case "tube":
      return (
        <g>
          <path d="M162 362 L142 150 L258 150 L238 362 Z" fill={art.body} />
          <path d="M162 362 L142 150 L258 150 L238 362 Z" fill={gloss} />
          <rect x="138" y="134" width="124" height="18" fill={art.body} />
          <path d="M146 140h108M146 146h108" stroke="#000" strokeOpacity=".15" />
          <rect x="166" y="360" width="68" height="60" rx="6" fill={art.cap} />
          <VLabel x={200} y={196} size={28} room={130} ink={ink} name={name} />
          <Mark x={200} y={340} ink={ink} />
        </g>
      );
    case "box":
      return (
        <g>
          <rect x="96" y="238" width="208" height="182" fill={art.body} />
          <rect x="96" y="238" width="208" height="182" fill={gloss} />
          <rect x="88" y="214" width="224" height="40" fill={art.body} />
          <rect x="88" y="246" width="224" height="8" fill="#000" fillOpacity=".06" />
          <rect x="236" y="214" width="34" height="206" fill={`url(#${gid}-obi)`} />
          <rect x="122" y="286" width="84" height="96" fill="none" stroke={art.label} strokeOpacity=".5" />
          <VLabel x={164} y={300} size={22} room={76} ink={art.label} name={name} />
        </g>
      );
  }
}

function Prop({ kind }: { kind: NonNullable<Art["prop"]> }) {
  if (kind === "yuzu")
    return (
      <g>
        <ellipse cx="312" cy="420" rx="36" ry="5" fill="#000" fillOpacity=".14" />
        <circle cx="312" cy="390" r="32" fill="#D9A93A" />
        <circle cx="301" cy="378" r="9" fill="#fff" fillOpacity=".25" />
        <path d="M312 358 q10 -16 26 -12 q-8 14 -26 12z" fill="#5F6B3E" />
      </g>
    );
  if (kind === "rice")
    return (
      <g fill="#F7F1E4">
        {[
          [80, 416, 20], [96, 419, -30], [112, 414, 60], [300, 418, 10], [318, 415, -50], [330, 419, 35], [88, 410, 80],
        ].map(([x, y, r], i) => (
          <ellipse key={i} cx={x} cy={y} rx="5" ry="2.6" transform={`rotate(${r} ${x} ${y})`} />
        ))}
      </g>
    );
  return (
    <g stroke="#6F7458" strokeWidth="2" fill="none" strokeLinecap="round">
      <path d="M330 420 C320 380 300 350 270 330" />
      {[0, 1, 2, 3, 4].map((i) => (
        <path key={i} d={`M${322 - i * 11} ${398 - i * 15} l-14 -6 M${322 - i * 11} ${398 - i * 15} l4 -14`} />
      ))}
    </g>
  );
}
