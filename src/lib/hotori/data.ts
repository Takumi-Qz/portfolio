import { asset } from "@/lib/asset";

export const photo = (name: string) => asset(`/works/hotori/${name}.webp`);

export const cabins = ["東の棟", "西の棟"] as const;

/** 季節ごとの料金（1棟・2名・1泊朝食付き、税込） */
export const seasons = [
  { name: "春", months: [4, 5], water: "6〜12℃", note: "雪解け水で、湖がいちばん冷たい時期", weekday: 44000, holiday: 58000 },
  { name: "夏", months: [6, 7, 8, 9], water: "18〜22℃", note: "湖で泳げる、いちばん人気の季節", weekday: 52000, holiday: 68000 },
  { name: "秋", months: [10, 11], water: "14→7℃", note: "朝は霧。紅葉は10月中旬から", weekday: 48000, holiday: 62000 },
  { name: "冬", months: [12, 1, 2, 3], water: "結氷", note: "雪の中のサウナ。水風呂は井戸水の木樽で", weekday: 42000, holiday: 56000 },
];

export const extraGuest = 12000;
export const maxGuests = 4;

export const seasonOf = (d: Date) => seasons.find((s) => s.months.includes(d.getMonth() + 1))!;
/** 金・土は休前日料金 */
export const isHoliday = (d: Date) => d.getDay() === 5 || d.getDay() === 6;
export const priceOf = (d: Date, guests = 2) => {
  const s = seasonOf(d);
  return (isHoliday(d) ? s.holiday : s.weekday) + Math.max(0, guests - 2) * extraGuest;
};

/** デモ用の空室データ：日付から決まる疑似乱数。週末ほど埋まりやすい */
export const vacancy = (d: Date): (typeof cabins)[number][] => {
  const key = d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
  return cabins.filter((_, i) => {
    const h = Math.sin(key * 12.9898 + i * 78.233) * 43758.5453;
    const r = h - Math.floor(h);
    return r > (isHoliday(d) ? 0.82 : 0.45);
  });
};

export const yen = (n: number) => `¥${n.toLocaleString("ja-JP")}`;

/** 到着から夜までの過ごし方 */
export const timeline = [
  {
    time: "15:00",
    title: "着いたら、まず薪を見に行く",
    body: "管理棟で鍵を受け取って、林道を120m。棟の裏に、その日のぶんのナラ薪が積んであります。焚きつけは割ってありますが、太い薪を割るかどうかはお好みで。",
    img: "wood",
  },
  {
    time: "15:40",
    title: "ストーブに火を入れる",
    body: "室温が90℃を超えるまで、だいたい50分。火の番をしながらビールを一本、がちょうどいい長さです。",
    img: "stove",
  },
  {
    time: "16:30",
    title: "好きなだけ、ロウリュ",
    body: "サウナ室は2.4畳。4人で座っても膝が当たりません。ストーブの石に水をかけるのは何杯でも、誰にも気をつかわずに。",
    img: "sit",
  },
  {
    time: "16:45",
    title: "扉から十二歩で、湖",
    body: "サウナ室を出て、デッキを渡って桟橋の端まで十二歩。10月の湖は14℃前後。冬は雪景色の中、木樽の井戸水で。",
    img: "lake",
  },
  {
    time: "17:00",
    title: "デッキで、何もしない",
    body: "寝椅子が二脚。日が落ちると、聞こえるのはストーブが冷えていく音と、湖をわたる風の音だけです。",
    img: "rest",
  },
];

export const specs = [
  ["サウナ室", "2.4畳・定員4名・窓は湖向き"],
  ["ストーブ", "薪ストーブ（ナラ薪、一晩30本まで料金に込み）"],
  ["室温", "80〜95℃。薪の量でご自分で調整します"],
  ["水風呂", "湖（4〜11月）／井戸水の木樽（12〜3月）"],
  ["外気浴", "屋根付きデッキに寝椅子2脚、ブランケット"],
  ["ヴィヒタ", "6〜9月は白樺の生葉、それ以外の月は乾燥したもの"],
];

/** 知っておくと、滞在がもっと楽しくなること */
export const caveats = [
  ["夕食は、湖を見ながらBBQ", "地元の信州牛と高原野菜のBBQセット（2名 ¥9,800）が人気です。前日までのご予約で、デッキに炭を用意しておきます。持ち込みも自由です。"],
  ["朝ごはんは、棟まで届きます", "8時に、佐久のパン屋のパンと高原野菜のスープをお持ちします。霧の湖を眺めながら、デッキでどうぞ。"],
  ["桟橋の先は、ほとりだけの水辺", "桟橋から3mまでが泳げる範囲です。ライフジャケットを各棟に2着ご用意しているので、手ぶらで湖へ。"],
  ["画面のかわりに、星を", "各棟にテレビは置いていません。そのかわり、デッキの寝椅子から見上げる夜空があります。Wi-Fiは管理棟でつながります。"],
];

export const reviews = [
  {
    stars: 5,
    body: "水風呂が湖だと聞いて半信半疑でしたが、桟橋から入った瞬間、二人とも声が出ました。翌朝も霧の中でもう一度。チェックアウトの11時がこんなに惜しかった宿はないです。",
    who: "30代・夫婦",
    when: "2026年9月 東の棟",
  },
  {
    stars: 5,
    body: "自分で薪をくべて温度をつくるサウナは初めて。三人で交代しながら火の番をした時間が、いちばんの思い出になりました。",
    who: "40代・友人3名",
    when: "2026年8月 西の棟",
  },
  {
    stars: 4,
    body: "夜は本当に静かで、デッキで寝転んでいたら流れ星を三つ見ました。次は紅葉の時期に、友人を連れてまた来ます。",
    who: "20代・ひとり",
    when: "2026年7月 西の棟",
  },
];

export const faq = [
  ["サウナに慣れていなくても大丈夫ですか？", "到着時に10分ほど、ストーブの扱いと入り方をお伝えします。室温は薪の量で決まるので、低めの80℃から始める方も多いです。"],
  ["1名でも泊まれますか？", "もちろんです。サウナも湖も、ひとり占めでお過ごしください（料金は1棟料金です）。"],
  ["雨の日はどうなりますか？", "サウナもデッキも屋根付きなので、雨の日も変わらず楽しめます。雨音を聞きながらの外気浴を気に入ってくださる方も多いです。"],
  ["予約の変更はできますか？", "8日前までなら、日程の変更もキャンセルも無料です。台風や大雪で道路が通行止めになったときは、直前でも料金はいただきません。"],
  ["車がなくても行けますか？", "JR茅野駅から路線バスで55分、「白樺湖」下車。バス停まで送迎します（要予約・無料）。"],
];

/** 写真：Unsplash（Unsplash License）。色味はサイト用に調整しています */
export const credits = [
  ["hero", "Romanas", "PYkX4ruvXXs"],
  ["wood", "andre govia", "y5DxLQ5yyao"],
  ["stove", "SeongUk Kim", "YOdU8nmUAB4"],
  ["sit", "HUUM", "XSpVeZvDg_w"],
  ["lake", "Simona D'Auria", "dDKjrFzijbM"],
  ["rest", "Tiasha B", "griDRvxByAo"],
  ["room", "Clay Banks", "sDqyw1c5xaM"],
  ["loyly", "HUUM", "6eTBDTexZpM"],
  ["vihta", "Iglucraft", "lqSw-sR9Q7w"],
  ["winter", "Himmel S", "vYpiHdqzMhg"],
  ["forest", "Jakub Pabis", "--ScvBc6ht4"],
  ["dawn", "Amandine BATAILLE", "5i8JoOz91-Y"],
];
