import MockChrome from "./MockChrome";

const ROWS = [
  { rank: "01", co: "株式会社オーロラ", score: 92, tag: "PRICE NEG", stage: "HOT", trend: "+12" },
  { rank: "02", co: "Lumen テクノロジーズ", score: 87, tag: "SCALE", stage: "WARM", trend: "+8" },
  { rank: "03", co: "ナナクサ製作所", score: 78, tag: "ROI", stage: "WARM", trend: "+4" },
  { rank: "04", co: "Halcyon Partners", score: 71, tag: "BUDGET", stage: "COLD", trend: "−2" },
];

const stageStyle = {
  HOT: "bg-sunsetPink/14 text-sunsetPink border-sunsetPink/35",
  WARM: "bg-windowLight/14 text-windowLight border-windowLight/35",
  COLD: "bg-white/8 text-white/55 border-white/15",
} as const;

export default function MockDashboard() {
  return (
    <MockChrome title="dashboard" subtitle="intent board" ribbon="LIVE" tone="dark">
      <div className="grid h-full grid-cols-[100px_1fr] text-white">
        {/* sidebar */}
        <aside className="hidden border-r border-white/8 bg-black/25 px-3 py-4 sm:block">
          <p className="font-syne italic text-[15px] font-bold">Z</p>
          <ul className="mt-6 space-y-3 font-mono text-[10px] uppercase tracking-[0.14em]">
            <li className="text-windowLight">● Board</li>
            <li className="text-white/45">○ Diagnose</li>
            <li className="text-white/45">○ Concierge</li>
            <li className="text-white/45">○ Builder</li>
            <li className="text-white/45">○ Knowledge</li>
          </ul>
        </aside>

        {/* main */}
        <div className="flex flex-col px-4 py-4">
          <div className="flex items-baseline justify-between">
            <div>
              <p className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-windowLight/85">
                Intent Board / Q1 · 2026
              </p>
              <p className="mt-1 font-jp text-[13px] font-bold text-white">
                今アプローチすべき企業
              </p>
            </div>
            <div className="flex gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-white/60">
              <span className="rounded-sm bg-white/8 px-2 py-1">Sort ↓ Score</span>
              <span className="rounded-sm bg-white/8 px-2 py-1">All Stages</span>
            </div>
          </div>

          <div className="mt-3 grid grid-cols-3 gap-2">
            <Kpi label="ACTIVE" value="248" sub="+24 wk" />
            <Kpi label="HOT" value="32" sub="+6 wk" highlight />
            <Kpi label="AVG SCORE" value="74" sub="0PD signal" />
          </div>

          {/* table */}
          <div className="mt-3 overflow-hidden rounded-sm border border-white/8">
            <div className="grid grid-cols-[28px_1fr_68px_82px_64px] gap-2 border-b border-white/8 bg-white/[0.02] px-2.5 py-2 font-mono text-[9px] uppercase tracking-[0.16em] text-white/45">
              <span>#</span>
              <span>Company</span>
              <span className="text-right">Score</span>
              <span>Pattern</span>
              <span className="text-center">Stage</span>
            </div>
            {ROWS.map((r) => (
              <div
                key={r.rank}
                className="grid grid-cols-[28px_1fr_68px_82px_64px] items-center gap-2 border-b border-white/6 px-2.5 py-2 last:border-b-0"
              >
                <span className="font-mono text-[10px] text-white/45">{r.rank}</span>
                <span className="font-jp text-[12px] text-white truncate">{r.co}</span>
                <span className="text-right font-mono text-[13px] font-bold text-windowBlue tabular-nums">
                  {r.score}
                  <span className="ml-1 text-[9px] text-windowLight/70">{r.trend}</span>
                </span>
                <span className="rounded-sm border border-white/15 bg-white/4 px-1.5 py-0.5 font-mono text-[9px] tracking-wider text-white/70 text-center">
                  {r.tag}
                </span>
                <span
                  className={`rounded-sm border px-1.5 py-0.5 text-center font-mono text-[9px] tracking-wider ${stageStyle[r.stage as keyof typeof stageStyle]}`}
                >
                  {r.stage}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MockChrome>
  );
}

function Kpi({
  label,
  value,
  sub,
  highlight,
}: {
  label: string;
  value: string;
  sub: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-sm border px-3 py-2 ${highlight ? "border-sunsetPink/40 bg-sunsetPink/8" : "border-white/12 bg-white/[0.03]"}`}
    >
      <p
        className={`font-mono text-[9px] uppercase tracking-[0.18em] ${highlight ? "text-sunsetPink" : "text-white/55"}`}
      >
        {label}
      </p>
      <p className="mt-0.5 font-syne italic text-[20px] font-bold leading-none text-white tabular-nums">
        {value}
      </p>
      <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.14em] text-white/50">
        {sub}
      </p>
    </div>
  );
}
