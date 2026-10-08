export const BASE = "/works/itoma";

export type Shape = "pump" | "dropper" | "jar" | "tube" | "box" | "foam";

export type Art = {
  shape: Shape;
  bg: string;
  body: string;
  cap: string;
  label: string;
  /** 小物：柚子・米・なし */
  prop?: "yuzu" | "rice" | "leaf";
};

export type Variant = { id: string; label: string; price: number };

export type Product = {
  slug: string;
  name: string;
  kana: string;
  kind: string;
  category: CategorySlug;
  volume: string;
  tagline: string;
  description: string[];
  keyIngredients: { name: string; note: string }[];
  howTo: string[];
  ingredients: string;
  variants: Variant[];
  badge?: string;
  art: Art;
};

export type CategorySlug = "cleanse" | "tone" | "protect" | "gift";

export const categories: {
  slug: CategorySlug;
  verb: string;
  en: string;
  lead: string;
}[] = [
  {
    slug: "cleanse",
    verb: "落とす",
    en: "Cleanse",
    lead: "一日分の皮脂と日焼け止めを、こすらずに。米ぬか油をベースにした、洗い上がりのつっぱらない二品。",
  },
  {
    slug: "tone",
    verb: "整える",
    en: "Tone",
    lead: "洗顔のあと、肌が乾ききる前の十秒に。京北の柚子の種から採ったエキスを、ほんの少しだけ。",
  },
  {
    slug: "protect",
    verb: "守る",
    en: "Protect",
    lead: "眠っているあいだの乾燥から。重ねすぎず、朝まで残る油分の量を何度も試しました。",
  },
  {
    slug: "gift",
    verb: "贈る",
    en: "Gift",
    lead: "包装は西陣の帯屋さんから譲り受けた端切れで。一つとして同じ柄はありません。",
  },
];

const shipping =
  "ご注文から2営業日以内に京都の工房より発送します。送料は全国一律660円、8,800円以上のご注文で無料です。";

export const products: Product[] = [
  {
    slug: "hodoku-oil",
    name: "ほどく",
    kana: "ほどく",
    kind: "クレンジングオイル",
    category: "cleanse",
    volume: "150mL",
    tagline: "なでるだけで、落ちていく。",
    description: [
      "乾いた手と顔に2プッシュ。30秒ほど円を描くようになじませると、メイクがふっと浮いてきます。ぬるま湯を少し足して白く乳化させてから、すすいでください。",
      "ベースは国産の米ぬか油。落としたあとに油膜が残りにくく、ダブル洗顔は不要です。香りは柚子の果皮をほんのわずかに。",
    ],
    keyIngredients: [
      { name: "米ぬか油", note: "滋賀の精米所から。皮脂となじみやすい油" },
      { name: "柚子果皮油", note: "京北の農家で搾汁後に残る皮を蒸留" },
    ],
    howTo: [
      "乾いた手に2〜3プッシュ取る",
      "顔全体に30秒、力を入れずになじませる",
      "少量のぬるま湯で乳化させ、すすぐ",
    ],
    ingredients:
      "コメヌカ油、トリエチルヘキサノイン、オレイン酸ポリグリセリル-10、ユズ果皮油、トコフェロール",
    variants: [
      { id: "main", label: "本体 150mL", price: 4180 },
      { id: "refill", label: "詰め替え 150mL", price: 3520 },
    ],
    badge: "定番",
    art: { shape: "pump", bg: "#E4DACB", body: "#C9A46B", cap: "#2B2622", label: "#F4EEE3", prop: "yuzu" },
  },
  {
    slug: "susugu-foam",
    name: "すすぐ",
    kana: "すすぐ",
    kind: "泡洗顔料",
    category: "cleanse",
    volume: "120mL",
    tagline: "朝の顔は、これだけでいい。",
    description: [
      "ポンプを押すと、きめの細かい泡がそのまま出てきます。泡立てる手間がいらないので、時間のない朝に。",
      "洗浄成分はアミノ酸系のみ。洗ったあと、タオルで押さえた時点でつっぱりを感じない設計です。",
    ],
    keyIngredients: [
      { name: "ココイルグルタミン酸Na", note: "肌と同じ弱酸性の洗浄成分" },
      { name: "米発酵液", note: "伏見の酒蔵から分けてもらう酒粕由来" },
    ],
    howTo: ["手のひらに1〜2プッシュ", "泡を転がすように洗う", "ぬるま湯で10回以上すすぐ"],
    ingredients: "水、ココイルグルタミン酸Na、グリセリン、コメ発酵液、ベタイン、クエン酸、フェノキシエタノール",
    variants: [{ id: "main", label: "本体 120mL", price: 3520 }],
    art: { shape: "foam", bg: "#DCE0D6", body: "#F5F2EB", cap: "#6F7458", label: "#6F7458" },
  },
  {
    slug: "shizumeru-lotion",
    name: "しずめる",
    kana: "しずめる",
    kind: "化粧水",
    category: "tone",
    volume: "150mL",
    tagline: "とろみのない、水のような化粧水。",
    description: [
      "肌に乗せた瞬間に、すっと引いていくさらさらとしたテクスチャー。手のひらで3回に分けて重ねるのがおすすめです。",
      "柚子の種から採ったエキスと、グリセリンだけで保湿。成分の数を減らすことを、最初に決めました。",
    ],
    keyIngredients: [
      { name: "ユズ種子エキス", note: "果汁を搾ったあとの種から抽出" },
      { name: "グリセリン", note: "植物由来。べたつかない濃度に調整" },
    ],
    howTo: ["洗顔後すぐ、500円玉大を手に取る", "手のひらで押さえるように3回重ねる"],
    ingredients: "水、グリセリン、BG、ユズ種子エキス、ペンチレングリコール、クエン酸Na",
    variants: [
      { id: "main", label: "本体 150mL", price: 4620 },
      { id: "refill", label: "詰め替え 150mL", price: 3960 },
    ],
    badge: "定番",
    art: { shape: "pump", bg: "#E6E2D8", body: "#B9C3BF", cap: "#3B3F3A", label: "#F7F4EE" },
  },
  {
    slug: "todomeru-serum",
    name: "とどめる",
    kana: "とどめる",
    kind: "美容液",
    category: "tone",
    volume: "30mL",
    tagline: "三滴で足りる、と気づいてほしい。",
    description: [
      "化粧水のあとに、スポイトで3滴。少なく感じるかもしれませんが、手のひらで温めてから押さえると顔全体に広がります。",
      "米由来のセラミドを、肌のすき間を埋めるように配合しました。30mLで約2か月お使いいただけます。",
    ],
    keyIngredients: [
      { name: "米ぬかセラミド", note: "乾燥で失われがちな保湿膜を補う" },
      { name: "スクワラン", note: "オリーブ由来。重さを残さない油分" },
    ],
    howTo: ["化粧水のあと、3滴を手のひらへ", "両手で温め、顔を包むように押さえる"],
    ingredients: "水、スクワラン、グリセリン、コメヌカスフィンゴ糖脂質、ユズ種子エキス、キサンタンガム",
    variants: [{ id: "main", label: "30mL", price: 6820 }],
    badge: "300本限定ロット",
    art: { shape: "dropper", bg: "#D8C9B8", body: "#7A4B33", cap: "#E9E1D3", label: "#F3ECE0", prop: "rice" },
  },
  {
    slug: "najimu-emulsion",
    name: "なじむ",
    kana: "なじむ",
    kind: "乳液",
    category: "protect",
    volume: "100mL",
    tagline: "季節の変わり目に、一本。",
    description: [
      "水分と油分のちょうど間にあるような、軽い乳液。夏は乳液だけで、冬はこのあとにバームを重ねて。",
      "ベタつきが苦手な方にも続けてもらえるよう、塗った5分後の手触りを基準に処方を決めています。",
    ],
    keyIngredients: [
      { name: "シア脂", note: "固すぎない融点のものを選定" },
      { name: "米ぬか油", note: "クレンジングと同じ、滋賀の精米所から" },
    ],
    howTo: ["パール2粒大を手に取る", "顔の内側から外側へ伸ばす"],
    ingredients: "水、スクワラン、グリセリン、シア脂、コメヌカ油、ステアリン酸グリセリル、キサンタンガム",
    variants: [{ id: "main", label: "100mL", price: 5060 }],
    art: { shape: "pump", bg: "#EDE6DA", body: "#EFE9DE", cap: "#9A5B3F", label: "#9A5B3F" },
  },
  {
    slug: "nemuru-balm",
    name: "ねむる",
    kana: "ねむる",
    kind: "夜用バーム",
    category: "protect",
    volume: "40g",
    tagline: "一日の最後に、ふたをする。",
    description: [
      "指先で少量すくい、手のひらで溶かしてから顔を包みます。体温でほどけて、薄い膜のように肌に残ります。",
      "香りはほんのわずかなヒノキ。寝室に入る前、明かりを落としてから使ってほしい一品です。",
    ],
    keyIngredients: [
      { name: "ミツロウ", note: "丹波の養蜂家から" },
      { name: "ヒノキ水", note: "京北の製材所で出る端材を蒸留" },
    ],
    howTo: ["米粒2つ分を指に取る", "手のひらで溶かしてから顔を包む"],
    ingredients: "スクワラン、シア脂、ミツロウ、コメヌカ油、ヒノキ水、トコフェロール",
    variants: [{ id: "main", label: "40g", price: 5940 }],
    badge: "新作",
    art: { shape: "jar", bg: "#2E2B27", body: "#3E3A34", cap: "#C9A46B", label: "#E9E1D3", prop: "leaf" },
  },
  {
    slug: "hitoiki-hand",
    name: "ひと息",
    kana: "ひといき",
    kind: "ハンドクリーム",
    category: "protect",
    volume: "50g",
    tagline: "机の引き出しに入る大きさ。",
    description: [
      "仕事の合間に塗っても、すぐにキーボードを触れるさらりとした仕上がり。香りは柚子とヒノキを半分ずつ。",
    ],
    keyIngredients: [{ name: "シア脂", note: "保湿の主役。手の甲の乾燥に" }],
    howTo: ["小豆大を手の甲に取り、両手で伸ばす"],
    ingredients: "水、グリセリン、シア脂、スクワラン、ユズ果皮油、ヒノキ水、セテアリルアルコール",
    variants: [{ id: "main", label: "50g", price: 2420 }],
    art: { shape: "tube", bg: "#E9DDCB", body: "#E7C98F", cap: "#2B2622", label: "#2B2622", prop: "yuzu" },
  },
  {
    slug: "sanpun-set",
    name: "三分間",
    kana: "さんぷんかん",
    kind: "ギフトセット",
    category: "gift",
    volume: "4点セット",
    tagline: "落とす、整える、守る。その全部を。",
    description: [
      "ほどく（50mL）、しずめる（50mL）、とどめる（10mL）、ねむる（15g）のミニサイズ4点を、帯の端切れで包んでお届けします。",
      "メッセージカードを無料でお付けします。ご注文時の備考欄にご記入ください。",
    ],
    keyIngredients: [{ name: "帯の端切れ", note: "西陣の帯屋さんから。柄は選べません" }],
    howTo: ["夜、ほどく→しずめる→とどめる→ねむるの順に"],
    ingredients: "各商品ページをご確認ください。",
    variants: [{ id: "main", label: "4点セット", price: 12100 }],
    badge: "ギフト包装込み",
    art: { shape: "box", bg: "#D9CBB6", body: "#F1EADF", cap: "#9A5B3F", label: "#2B2622" },
  },
  {
    slug: "tamesu-trial",
    name: "ためす",
    kana: "ためす",
    kind: "お試しセット",
    category: "gift",
    volume: "7日分",
    tagline: "肌に合うか、まず一週間。",
    description: [
      "定番の3品を7日分ずつ。はじめての方は、まずこちらから。お一人さま1回限り、ポスト投函でお届けします。",
    ],
    keyIngredients: [{ name: "ほどく / しずめる / とどめる", note: "各7日分の小分けパウチ" }],
    howTo: ["1日1包ずつ、夜のお手入れに"],
    ingredients: "各商品ページをご確認ください。",
    variants: [{ id: "main", label: "7日分", price: 1980 }],
    art: { shape: "box", bg: "#E4E2D9", body: "#FBF8F2", cap: "#6F7458", label: "#6F7458" },
  },
];

export type Post = {
  slug: string;
  date: string;
  tag: string;
  title: string;
  excerpt: string;
  body: string[];
  tone: string;
};

export const posts: Post[] = [
  {
    slug: "yuzu-peel",
    date: "2026.09.18",
    tag: "素材のこと",
    title: "柚子の皮を、捨てない理由",
    excerpt: "京北の農家さんでは、毎年十一月に二トン近い柚子を搾ります。そのあとに残る皮の話。",
    tone: "#C9A46B",
    body: [
      "京都市の北の端、京北と呼ばれる地域に、三代続く柚子農家があります。毎年十一月の終わり、ここでは二トン近い柚子が搾られ、果汁は近くのポン酢屋さんへ運ばれていきます。",
      "残るのは、山のような皮と種です。以前は堆肥にするしかなかったそれを、少しだけ分けてもらえないかとお願いしたのが、ITOMAの始まりでした。",
      "皮は蒸留して精油に、種はエキスに。一年で使える量は決まっていて、なくなればその年の製造は終わりです。",
    ],
  },
  {
    slug: "three-minutes",
    date: "2026.08.30",
    tag: "使い方",
    title: "夜の三分間、いちばん短い手順",
    excerpt: "クレンジングから眠るまで、タイマーで測ってみました。秒単位の、わたしたちの手順です。",
    tone: "#6F7458",
    body: [
      "0:00 ほどくを2プッシュ。乾いた顔に30秒。0:40 ぬるま湯で乳化させて、すすぐ。1:20 タオルで押さえる。こすらない。",
      "1:30 しずめるを3回に分けて。2:10 とどめるを3滴。2:40 ねむるを米粒2つ分。2:58、明かりを消す。",
      "三分間に収まらない日があっても、もちろん構いません。ただ、急いでいる日でもこれだけはできる、という長さにしておきたかったのです。",
    ],
  },
  {
    slug: "winter-batch",
    date: "2026.07.12",
    tag: "工房から",
    title: "西陣の工房で、冬の分を仕込む",
    excerpt: "七月、いちばん暑い時期に、冬に届けるバームを仕込みます。三百本ずつ、全部で六回。",
    tone: "#9A5B3F",
    body: [
      "工房は西陣の古い町家の一階です。元は帯の糸を染める作業場だったそうで、土間には今も染料の跡が残っています。",
      "ITOMAの製品は、一度に三百本までしか作りません。それ以上になると、充填から検品まで三人の手で目が届かなくなるからです。",
    ],
  },
  {
    slug: "over-washing",
    date: "2026.06.03",
    tag: "肌のこと",
    title: "乾燥する季節の「洗いすぎ」について",
    excerpt: "朝の洗顔料をやめてみたら、という相談をよくいただきます。皮膚科の先生に聞いた話をまとめました。",
    tone: "#B9C3BF",
    body: [
      "肌の表面には、皮脂と汗が混ざってできた薄い膜があります。洗浄力の強いものを一日に何度も使うと、この膜が戻る前にまた洗い流してしまうことになります。",
      "夜しっかり落としているなら、朝はぬるま湯か、泡で軽く。それで物足りなければ、少しずつ足していけばいいのです。",
    ],
  },
];

export const faqs: { group: string; items: { q: string; a: string }[] }[] = [
  {
    group: "ご注文について",
    items: [
      { q: "支払い方法は何が使えますか？", a: "クレジットカード（Visa / Mastercard / JCB / AMEX）、Shop Pay、Apple Pay、Google Pay、コンビニ払いに対応しています。" },
      { q: "注文後にキャンセルできますか？", a: "発送準備に入る前であれば承ります。ご注文確認メールに記載のアドレスまで、なるべくお早めにご連絡ください。" },
      { q: "領収書は発行できますか？", a: "ご注文完了後、マイページの注文履歴からPDFでダウンロードいただけます。" },
    ],
  },
  {
    group: "配送について",
    items: [
      { q: "いつ届きますか？", a: shipping + " 北海道・沖縄・離島は、さらに1〜3日ほどかかる場合があります。" },
      { q: "配送日時の指定はできますか？", a: "ご注文日の4日後以降で、日付と時間帯（午前／14-16時／16-18時／18-20時／19-21時）をご指定いただけます。" },
    ],
  },
  {
    group: "商品・肌について",
    items: [
      { q: "敏感肌でも使えますか？", a: "全製品でパッチテストを実施していますが、すべての方に刺激が起きないわけではありません。不安な方は「ためす」で一週間お試しください。" },
      { q: "使用期限はどのくらいですか？", a: "未開封で製造から2年、開封後は半年を目安にお使いください。製造年月は底面に記載しています。" },
      { q: "香料は入っていますか？", a: "合成香料は使っていません。香りはすべて柚子果皮油とヒノキ水によるものです。" },
    ],
  },
  {
    group: "返品・交換について",
    items: [
      { q: "肌に合わなかった場合は？", a: "開封後でも、お届けから30日以内であれば1回に限り返金いたします。詳しくは返金ポリシーをご覧ください。" },
    ],
  },
];

export const legalPages = [
  { slug: "tokushoho", title: "特定商取引法に基づく表記" },
  { slug: "privacy", title: "プライバシーポリシー" },
  { slug: "terms", title: "利用規約" },
  { slug: "shipping", title: "配送ポリシー" },
  { slug: "refund", title: "返金ポリシー" },
] as const;

export const SHIPPING_FEE = 660;
export const FREE_SHIPPING = 8800;
export const GIFT_WRAP = 330;

export const yen = (n: number) => `${n.toLocaleString("ja-JP")}円`;

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);
export const getPost = (slug: string) => posts.find((p) => p.slug === slug);
