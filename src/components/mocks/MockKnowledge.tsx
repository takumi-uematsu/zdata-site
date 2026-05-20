import MockChrome from "./MockChrome";

const ARTICLES = [
  {
    title: "価格交渉における顧客の3つの不安と切り返し",
    kind: "Pattern",
    industry: "Consulting",
    date: "2026 / 04 / 12",
    hot: true,
  },
  {
    title: "ROI 試算で「投資回収期間」を見せる5ステップ",
    kind: "Method",
    industry: "SaaS · Consulting",
    date: "2026 / 03 / 28",
  },
  {
    title: "競合と並んだときの差別化トーク（業種別）",
    kind: "Script",
    industry: "All",
    date: "2026 / 02 / 15",
  },
  {
    title: "ベテラン営業の暗黙知を、若手に渡す方法論",
    kind: "Method",
    industry: "All",
    date: "2025 / 12 / 03",
  },
];

const kindStyle = {
  Pattern: "border-sunsetPink/30 bg-sunsetPink/10 text-sunsetPink",
  Method: "border-windowBlue/30 bg-windowBlue/10 text-windowBlue",
  Script: "border-windowLight/30 bg-windowLight/10 text-windowLight",
} as const;

export default function MockKnowledge() {
  return (
    <MockChrome title="knowledge" subtitle="search" ribbon="287 IDX" tone="light">
      <div className="flex h-full flex-col gap-3 bg-[#F5F4EF] px-4 py-4 text-[#1A1A1A]">
        {/* search */}
        <div className="flex items-center gap-2 rounded-sm border border-charcoal/12 bg-white px-3 py-2.5">
          <span aria-hidden className="text-charcoal/40">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="7" />
              <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
            </svg>
          </span>
          <span className="font-jp text-[12.5px] text-charcoal">
            <span className="text-charcoal/85">価格交渉</span>
            <span className="ml-1 inline-block h-3 w-px translate-y-0.5 bg-charcoal/40 align-middle" />
          </span>
          <div className="ml-auto flex items-center gap-1.5 font-mono text-[9.5px] uppercase tracking-[0.16em] text-charcoal/45">
            Sort <span className="text-charcoal/85">↓ Recent</span>
          </div>
        </div>

        <div className="flex items-baseline gap-3 font-mono text-[10px] uppercase tracking-[0.18em] text-charcoal/60">
          <span className="text-niteflyte">287 results</span>
          <span className="text-charcoal/30">·</span>
          <span>Industry · Consulting</span>
        </div>

        <ul className="flex-1 divide-y divide-charcoal/8 overflow-hidden rounded-sm border border-charcoal/12 bg-white">
          {ARTICLES.map((a) => (
            <li key={a.title} className="px-3 py-2.5">
              <div className="flex items-center gap-2">
                <span
                  className={`rounded-sm border px-1.5 py-0.5 font-mono text-[8.5px] uppercase tracking-[0.18em] ${kindStyle[a.kind as keyof typeof kindStyle]}`}
                >
                  {a.kind}
                </span>
                <span className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-charcoal/50">
                  {a.industry}
                </span>
                <span className="ml-auto font-mono text-[9.5px] tracking-wide text-charcoal/40">
                  {a.date}
                </span>
                {a.hot && (
                  <span className="inline-flex items-center gap-1 rounded-sm bg-sunsetPink/12 px-1.5 py-0.5 font-mono text-[8.5px] uppercase tracking-[0.18em] text-sunsetPink">
                    <span
                      aria-hidden
                      className="inline-block h-1.5 w-1.5 animate-twinkle rounded-full bg-sunsetPink"
                    />
                    Hot
                  </span>
                )}
              </div>
              <p className="mt-1 font-jp text-[12.5px] font-bold leading-tight text-charcoal">
                {a.title}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </MockChrome>
  );
}
