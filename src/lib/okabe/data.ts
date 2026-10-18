import { asset } from "@/lib/asset";

export const BASE = "/works/okabe";
export const photo = (name: string) => asset(`/works/okabe/${name}.webp`);

export const nav = [
  { href: `${BASE}/technology`, label: "技術・設備", no: "01" },
  { href: `${BASE}/cases`, label: "加工実績", no: "02" },
  { href: `${BASE}/company`, label: "会社概要", no: "03" },
  { href: `${BASE}/recruit`, label: "採用情報", no: "04" },
];

export const company = {
  name: "株式会社 岡部製作所",
  short: "岡部製作所",
  zip: "〒577-0066",
  address: "大阪府東大阪市高井田西3丁目8-21",
  tel: "06-0000-0000",
  fax: "06-0000-0001",
  hours: "平日 8:15〜17:15",
};

/** トップの数字。図面の寸法のように並べる */
export const figures = [
  { label: "見積りの回答", value: "24", unit: "時間以内", note: "図面が届いた翌営業日の同じ時刻まで" },
  { label: "試作の最短納期", value: "3", unit: "日", note: "アルミ・樹脂、5個までの場合" },
  { label: "保証できる公差", value: "0.003", unit: "mm", note: "恒温室20℃で全数を測定" },
  { label: "5軸加工機", value: "7", unit: "台", note: "本社工場4台・第二工場3台" },
];

export const strengths = [
  {
    no: "01",
    title: "段取りは、一回で。",
    body: "5軸加工機なら、部品をつかみ直さずに五つの面を削れます。つかみ直すたびに生まれる0.01ミリのずれがなくなり、複雑な形でも図面どおりの位置に穴が並びます。治具の設計から自社で行うので、一個だけの試作でも段取りに時間をかけません。",
    spec: [
      ["同時5軸加工機", "7台"],
      ["最大ワーク", "φ650×H500mm"],
      ["治具の設計", "自社（CAD/CAM 6ライセンス）"],
    ],
    photo: "fiveaxis",
    alt: "5軸加工機の中で、エンドミルが金属のブロックを削っている",
  },
  {
    no: "02",
    title: "測り終えてから、出荷する。",
    body: "温度が1℃変わると、100ミリのアルミは0.0023ミリ伸びます。だから測定は、一年中20℃に保った恒温室で。三次元測定機で全数を測り、検査成績書を付けてお届けします。測定データはCSVでもお渡しできます。",
    spec: [
      ["恒温測定室", "20℃±0.5℃"],
      ["三次元測定機", "ZEISS CONTURA"],
      ["検査成績書", "全数に添付"],
    ],
    photo: "cmm",
    alt: "測定機のプローブが、削り上がった部品の寸法を測っている",
  },
  {
    no: "03",
    title: "チタンも、インコネルも。",
    body: "医療と航空の仕事を二十年続けてきたので、削りにくい材料ほど得意です。チタン合金、インコネル718、PEEKなど、材料ごとの刃物と切削条件を千件以上の記録として残しています。初めての材料でも、まず一個削ってお見せします。",
    spec: [
      ["対応材質", "40種以上"],
      ["切削条件の記録", "1,200件"],
      ["材料の手配", "ミルシート付きで代行"],
    ],
    photo: "titanium",
    alt: "削り上がったばかりの、光沢のある金属部品",
  },
];

export const industries = [
  { name: "医療機器", share: 38, examples: "歯科インプラント、内視鏡の先端部品、手術器具" },
  { name: "航空・宇宙", share: 24, examples: "エンジン用ブラケット、小型衛星のハウジング" },
  { name: "半導体製造装置", share: 21, examples: "ウエハ搬送アーム、真空チャンバーの部品" },
  { name: "ロボット・分析機器", share: 17, examples: "減速機ケース、PEEKのマニホールド" },
];

export type Case = {
  slug: string;
  title: string;
  industry: string;
  material: string;
  size: string;
  tolerance: string;
  qty: string;
  days: string;
  photo: string;
  note: string;
};

export const cases: Case[] = [
  {
    slug: "dental-implant",
    title: "歯科インプラントのフィクスチャー試作",
    industry: "医療機器",
    material: "純チタン2種",
    size: "φ4.0 × 10mm",
    tolerance: "ねじ部 ±0.005mm",
    qty: "30本",
    days: "7日",
    photo: "screw",
    note: "あごの骨に入るねじの部分です。ねじ山の角度を0.5度ずつ変えた3種類を削り、骨へのなじみ方を比べる試験に使われました。",
  },
  {
    slug: "engine-bracket",
    title: "航空機エンジン用ブラケット",
    industry: "航空・宇宙",
    material: "インコネル718",
    size: "120 × 80 × 35mm",
    tolerance: "±0.005mm",
    qty: "12個",
    days: "14日",
    photo: "bracket",
    note: "熱に強い反面、刃物がすぐ傷む材料です。刃物の交換時期を数値で管理し、12個すべてを同じ寸法にそろえました。",
  },
  {
    slug: "satellite-housing",
    title: "小型衛星のリアクションホイール用ハウジング",
    industry: "航空・宇宙",
    material: "アルミ合金 A7075",
    size: "φ110 × 40mm",
    tolerance: "平面度 0.003mm",
    qty: "4個",
    days: "10日",
    photo: "housing",
    note: "肉厚1.2ミリまで削り込み、1個あたり38グラムの軽量化。打ち上げの振動試験にも合格しています。",
  },
  {
    slug: "wafer-arm",
    title: "ウエハ搬送アーム",
    industry: "半導体製造装置",
    material: "アルミ合金 A6061（硬質アルマイト）",
    size: "380 × 60 × 8mm",
    tolerance: "平行度 0.01mm",
    qty: "20本",
    days: "12日",
    photo: "arm",
    note: "薄く長い部品は、削ると反ります。荒削りのあと一晩寝かせてから仕上げることで、反りを0.01ミリ以内に抑えました。",
  },
  {
    slug: "endoscope-tip",
    title: "内視鏡の先端部品",
    industry: "医療機器",
    material: "ステンレス SUS316L",
    size: "φ3.2 × 8mm",
    tolerance: "±0.003mm",
    qty: "200個",
    days: "21日",
    photo: "tip",
    note: "米粒ほどの部品に、直径0.4ミリの穴を5つ。自動旋盤と5軸加工機を組み合わせて削っています。",
  },
  {
    slug: "reducer-case",
    title: "協働ロボットの減速機ケース",
    industry: "ロボット・分析機器",
    material: "アルミ合金 A2017",
    size: "φ90 × 60mm",
    tolerance: "±0.005mm",
    qty: "50個",
    days: "10日",
    photo: "case",
    note: "試作5個から始まり、量産の50個まで同じ工程で。試作と量産で寸法が変わらないことを評価いただきました。",
  },
  {
    slug: "peek-manifold",
    title: "分析装置用のPEEKマニホールド",
    industry: "ロボット・分析機器",
    material: "PEEK樹脂",
    size: "60 × 40 × 20mm",
    tolerance: "穴径 φ0.3mm",
    qty: "5個",
    days: "5日",
    photo: "manifold",
    note: "内部で交差する細い流路を、バリを残さずに貫通させました。洗浄から梱包まで、クリーンな状態でお届けしています。",
  },
];

export const steps = [
  { no: "01", title: "図面を送る", body: "PDF・STEP・IGES・DXFのどれでも。手描きのスケッチから図面に起こすこともできます。", time: "当日" },
  { no: "02", title: "見積りを受け取る", body: "加工方法と、納期の目安、費用の内訳を添えてお返事します。", time: "24時間以内" },
  { no: "03", title: "加工の準備", body: "CAMで加工プログラムをつくり、必要なら専用の治具を設計します。", time: "1〜2日" },
  { no: "04", title: "削る", body: "5軸加工機・自動旋盤・放電加工機から、部品に合う機械を選びます。", time: "最短半日" },
  { no: "05", title: "測る", body: "恒温室で全数を測定し、検査成績書をつくります。", time: "半日" },
  { no: "06", title: "届ける", body: "部品ごとに個包装し、翌日に届く便で発送します。", time: "最短3日目" },
];

export const machines = [
  ["5軸マシニングセンタ", "DMG MORI DMU 50", "3", "X650 × Y520 × Z475"],
  ["5軸マシニングセンタ", "ヤマザキマザック VARIAXIS i-600", "2", "X610 × Y850 × Z510"],
  ["5軸複合加工機", "ヤマザキマザック INTEGREX i-200S", "2", "φ658 × 1,519"],
  ["立形マシニングセンタ", "オークマ MB-46VAE", "3", "X762 × Y460 × Z460"],
  ["主軸移動形自動旋盤", "シチズン L20", "2", "φ20"],
  ["ワイヤー放電加工機", "ファナック ROBOCUT α-C400iC", "1", "X400 × Y300 × Z255"],
  ["三次元測定機", "ZEISS CONTURA", "1", "700 × 1,000 × 600"],
  ["画像寸法測定器", "キーエンス IM-8000", "1", "φ200"],
  ["表面粗さ測定機", "ミツトヨ SJ-410", "1", "—"],
] as const;

export const materials = [
  ["チタン", ["Ti-6Al-4V", "純チタン2種", "Ti-6Al-7Nb"]],
  ["ステンレス", ["SUS303", "SUS304", "SUS316L", "SUS630"]],
  ["アルミ", ["A2017", "A5052", "A6061", "A7075"]],
  ["耐熱合金", ["インコネル718", "インコネル625", "ハステロイC-276"]],
  ["銅合金", ["C1100", "ベリリウム銅", "リン青銅"]],
  ["樹脂", ["PEEK", "POM", "PTFE", "ULTEM"]],
] as const;

export const certs = [
  ["ISO 9001:2015", "品質マネジメントシステム", "2009年取得"],
  ["JIS Q 9100:2016", "航空・宇宙・防衛の品質マネジメントシステム", "2017年取得"],
  ["ISO 13485:2016", "医療機器の品質マネジメントシステム", "2021年取得"],
];

export const history = [
  ["1971", "岡部勝が東大阪市高井田で創業。旋盤2台、従業員3人からのスタート。"],
  ["1983", "NC旋盤を導入。自動車部品の量産を始める。"],
  ["1996", "現在の本社工場を新築。"],
  ["2004", "二代目・岡部恵一が社長に。医療機器部品の試作を始める。"],
  ["2009", "ISO 9001の認証を取得。"],
  ["2012", "初めての5軸マシニングセンタを導入。"],
  ["2017", "JIS Q 9100の認証を取得。恒温測定室を新設。"],
  ["2019", "三代目・岡部直樹が社長に就任。"],
  ["2023", "5軸加工専用の第二工場が稼働。"],
  ["2025", "小型衛星の部品を初めて受注。"],
];

export const profileRows = [
  ["社名", "株式会社 岡部製作所"],
  ["創業", "1971年4月"],
  ["代表者", "代表取締役　岡部 直樹"],
  ["資本金", "3,000万円"],
  ["従業員", "28名（2026年4月時点）"],
  ["事業内容", "医療機器・航空宇宙・半導体製造装置向け精密部品の切削加工（試作から量産まで）"],
  ["本社工場", "〒577-0066 大阪府東大阪市高井田西3丁目8-21"],
  ["第二工場", "〒577-0065 大阪府東大阪市高井田中1丁目4-7（5軸加工専用）"],
  ["取引銀行", "りそな銀行 布施支店、大阪シティ信用金庫 高井田支店"],
];

export const news = [
  ["2026.09.18", "第二工場に5軸複合加工機を1台増やしました"],
  ["2026.07.30", "夏季休業のお知らせ（8月11日〜16日）"],
  ["2026.06.24", "医療機器の試作・開発展に出展しました"],
  ["2026.04.01", "新しい仲間が4人入社しました"],
];

export const recruitFigures = [
  { label: "平均年齢", value: "36.8", unit: "歳" },
  { label: "20代の社員", value: "9", unit: "人" },
  { label: "年間休日", value: "121", unit: "日" },
  { label: "月の平均残業", value: "11.5", unit: "時間" },
];

export const voices = [
  {
    name: "中村 颯太",
    role: "5軸加工　入社4年目",
    from: "工業高校 機械科卒",
    quote: "三年目の秋、初めて一人で5軸の段取りを任されました。",
    body: "最初の一年は、先輩の段取りを横で見ながら、刃物の名前を覚えるところから。二年目にCAMを教わり、三年目に自分のプログラムで削った部品が、測定でそのまま合格したときは本当にうれしかったです。今はチタンのスクリューを担当しています。",
    photo: "voice1",
  },
  {
    name: "吉岡 真帆",
    role: "品質保証　入社6年目",
    from: "大学 機械工学科卒",
    quote: "部品が会社を出ていく前に、最後に触るのが私たちです。",
    body: "恒温室で三次元測定機を動かし、検査成績書をつくっています。測った数字は加工の担当者にすぐ返すので、次の一個がもっと良くなる。そのやり取りが毎日あるのが、この会社のいいところだと思います。",
    photo: "voice2",
  },
];

export const jobs = [
  {
    title: "マシニングセンタのオペレーター",
    type: "正社員",
    who: "未経験から歓迎。工業高校・高専・大学の機械系の方、ものづくりが好きな方",
    pay: "月給 22万〜36万円（経験・能力により決定）",
    hours: "8:15〜17:15（休憩60分）",
  },
  {
    title: "品質保証（三次元測定）",
    type: "正社員",
    who: "図面が読める方。測定機の経験があれば尚可",
    pay: "月給 24万〜38万円",
    hours: "8:15〜17:15（休憩60分）",
  },
  {
    title: "生産管理",
    type: "正社員",
    who: "製造業での工程管理・購買の経験がある方",
    pay: "月給 26万〜40万円",
    hours: "8:15〜17:15（休憩60分）",
  },
];

export const benefits = [
  "賞与 年2回（昨年度実績 4.2か月分）",
  "技能検定（旋盤・フライス盤・機械検査）の受験費用を全額負担",
  "退職金制度、社会保険完備",
  "社員食堂（昼食1食300円）",
  "マイカー通勤可（駐車場無料）",
  "工具・作業着・安全靴を支給",
];

export const day = [
  ["8:15", "朝礼。その日に削る部品と、納期を全員で確認"],
  ["8:30", "段取り。治具を取り付け、刃物の長さを測る"],
  ["10:00", "加工スタート。一個目を測定室に持っていく"],
  ["12:00", "昼休み。社員食堂の今日の定食は唐揚げ"],
  ["13:00", "測定結果を見て、プログラムを微調整"],
  ["15:30", "翌日の部品のCAMプログラムをつくる"],
  ["17:15", "機械を清掃して終業"],
];

/** 写真のクレジット：[キー, 撮影者, Unsplash の写真ID] */
export const credits: [string, string, string][] = [
  ["hero", "mastars MT", "WETHYvfFnbg"],
  ["fiveaxis", "Mike Winkler", "mtyk-fF1CdQ"],
  ["cmm", "kira cheng", "vzSWktaawVU"],
  ["titanium", "Jelifer Maniago", "8MBTn3Z71zI"],
  ["hands", "Hans Westbeek", "_luiFaaZU6k"],
  ["chips", "Sergei Piunninen", "zA8U2EZvI4Y"],
  ["tools", "Ben Spray", "f0T-eGanP_4"],
  ["floor", "aluminum Zheng ji", "sxtClAGwRck"],
  ["drawing", "Sven Mieke", "fteR0e2BzKo"],
  ["night", "Roman Davydko", "ED1b2TV3ujI"],
  ["voice1", "Call me LAMB", "aLWgHZ1PC0o"],
  ["voice2", "Christopher De los ríos", "hZ-W1F_SDyI"],
  ["screw", "Katarzyna Zygnerska", "eHwRLpfHSKY"],
  ["parts", "Mastars", "VxdR-Z4cr1k"],
];
