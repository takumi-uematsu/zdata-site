import MockChrome from "./MockChrome";

const STRUCTURE = [
  { idx: "01", title: "なぜ Z-Data か", state: "edited" },
  { idx: "02", title: "Aurora 社の課題構造", state: "ai" },
  { idx: "03", title: "提案のスコープ", state: "ai" },
  { idx: "04", title: "ROI 試算", state: "draft" },
  { idx: "05", title: "導入スケジュール", state: "draft" },
];

const SOURCES = [
  { label: "診断結果 · 3件", note: "0PD / 2026-04" },
  { label: "ケース #234, #567", note: "Knowledge" },
  { label: "業界レポート 2025", note: "External" },
];

export default function MockAssetBuilder() {
  return (
    <MockChrome title="builder" subtitle="proposal · v3" ribbon="AI" tone="tinted">
      <div className="grid h-full grid-cols-[1.5fr_1fr] text-white">
        {/* document */}
        <div className="relative flex flex-col gap-3 px-4 py-4">
          <div className="flex items-baseline justify-between">
            <p className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-windowLight/85">
              Draft · v3
            </p>
            <p className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-white/45">
              Auto-saved 14:22
            </p>
          </div>
          <h3 className="font-jp text-[15px] font-bold leading-tight text-white">
            提案書 — Aurora 株式会社
            <span className="ml-2 font-mono text-[10px] uppercase tracking-[0.18em] text-windowLight/70">
              Q2 2026
            </span>
          </h3>

          <ul className="space-y-1.5">
            {STRUCTURE.map((s) => (
              <li
                key={s.idx}
                className="flex items-center gap-3 rounded-sm border border-white/8 bg-white/[0.03] px-3 py-2"
              >
                <span className="font-mono text-[10px] tracking-wide text-white/40">
                  {s.idx}
                </span>
                <span className="flex-1 font-jp text-[12px] text-white/90">
                  {s.title}
                </span>
                {s.state === "edited" && (
                  <span className="rounded-sm border border-windowBlue/40 bg-windowBlue/12 px-1.5 py-0.5 font-mono text-[8.5px] uppercase tracking-[0.18em] text-windowBlue">
                    Edited
                  </span>
                )}
                {s.state === "ai" && (
                  <span className="flex items-center gap-1 rounded-sm border border-sunsetPink/40 bg-sunsetPink/12 px-1.5 py-0.5 font-mono text-[8.5px] uppercase tracking-[0.18em] text-sunsetPink">
                    <span
                      aria-hidden
                      className="inline-block h-1.5 w-1.5 animate-twinkle rounded-full bg-sunsetPink"
                    />
                    AI gen
                  </span>
                )}
                {s.state === "draft" && (
                  <span className="rounded-sm border border-white/15 px-1.5 py-0.5 font-mono text-[8.5px] uppercase tracking-[0.18em] text-white/45">
                    Draft
                  </span>
                )}
              </li>
            ))}
          </ul>

          <div className="mt-auto flex items-center justify-between border-t border-white/12 pt-3 font-mono text-[10px] uppercase tracking-[0.18em]">
            <span className="text-white/55">5 slides · 12 sources</span>
            <span className="text-windowLight">▶ AI 生成中…</span>
          </div>
        </div>

        {/* sources side panel */}
        <aside className="flex flex-col gap-3 border-l border-white/10 bg-black/15 px-4 py-4">
          <p className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-windowLight/80">
            Sources
          </p>
          <ul className="space-y-2">
            {SOURCES.map((s) => (
              <li
                key={s.label}
                className="rounded-sm border border-white/8 bg-white/[0.03] px-2.5 py-2"
              >
                <p className="font-jp text-[11.5px] text-white/90">{s.label}</p>
                <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.14em] text-white/45">
                  {s.note}
                </p>
              </li>
            ))}
          </ul>

          <p className="mt-3 font-mono text-[9.5px] uppercase tracking-[0.18em] text-white/55">
            Tags
          </p>
          <div className="flex flex-wrap gap-1.5">
            {["PRICE", "SCALE", "AI", "ROI", "ENT"].map((t) => (
              <span
                key={t}
                className="rounded-sm border border-windowBlue/30 bg-windowBlue/10 px-1.5 py-0.5 font-mono text-[9px] tracking-wider text-windowBlue"
              >
                {t}
              </span>
            ))}
          </div>
        </aside>
      </div>
    </MockChrome>
  );
}
