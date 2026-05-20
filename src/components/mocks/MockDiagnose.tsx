import MockChrome from "./MockChrome";

const OPTIONS = [
  { id: "A", label: "新規リードの量", selected: false },
  { id: "B", label: "商談化率（質）", selected: true },
  { id: "C", label: "クロージング", selected: false },
  { id: "D", label: "顧客維持・拡大", selected: false },
];

export default function MockDiagnose() {
  return (
    <MockChrome
      title="diagnose"
      subtitle="Q.07 / 10"
      ribbon="0PD"
      tone="dark"
    >
      <div className="flex h-full flex-col px-5 py-5 text-white">
        <div className="flex items-baseline justify-between">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-windowLight">
            Q. 07
          </p>
          <p className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-white/45">
            ~ 90 sec / question
          </p>
        </div>

        <h3 className="mt-4 font-jp text-[16px] font-bold leading-[1.45] text-white">
          現在、営業の最大の課題は
          <br />
          どこにありますか？
        </h3>

        <ul className="mt-5 space-y-2">
          {OPTIONS.map((o) => (
            <li key={o.id}>
              <div
                className={`group flex items-center gap-3 rounded-sm border px-3 py-2.5 transition-colors ${
                  o.selected
                    ? "border-sunsetPink/55 bg-sunsetPink/12"
                    : "border-white/12 bg-white/[0.025]"
                }`}
              >
                <span
                  className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${
                    o.selected
                      ? "border-sunsetPink bg-sunsetPink"
                      : "border-white/30"
                  }`}
                >
                  {o.selected && (
                    <span className="h-1.5 w-1.5 rounded-full bg-deepNight" />
                  )}
                </span>
                <span className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-white/45">
                  {o.id}
                </span>
                <span
                  className={`font-jp text-[12.5px] ${o.selected ? "text-white" : "text-white/80"}`}
                >
                  {o.label}
                </span>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-4">
          <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-white/55">
            <span>Progress · 70%</span>
            <span className="text-windowLight">Next →</span>
          </div>
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/8">
            <div
              className="h-full rounded-full bg-gradient-to-r from-windowBlue via-windowLight to-sunsetPink"
              style={{ width: "70%" }}
            />
          </div>
        </div>
      </div>
    </MockChrome>
  );
}
