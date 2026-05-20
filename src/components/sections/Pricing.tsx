import Container from "@/components/ui/Container";
import Reveal, { RevealItem } from "@/components/ui/Reveal";
import SectionMarker from "@/components/ui/SectionMarker";
import ConstructionAccent from "@/components/ui/ConstructionAccent";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/cn";

interface Plan {
  id: string;
  name: string;
  pitch: string;
  body: string;
  cta: string;
  recommended?: boolean;
  pulse: string;
}

const PLANS: Plan[] = [
  {
    id: "poc",
    name: "PoC",
    pulse: "P / 01",
    pitch: "1-2ヶ月の無料トライアル",
    body: "診断 + ダッシュボード基本機能でデータ蓄積の価値を体感。",
    cta: "PoCを相談する",
  },
  {
    id: "starter",
    name: "Starter",
    pulse: "P / 02",
    pitch: "中小規模のBtoB企業向け",
    body: "診断 + ダッシュボード + コンシェルジュ + ナレッジ基本。",
    cta: "お問い合わせ",
  },
  {
    id: "growth",
    name: "Growth",
    pulse: "P / 03",
    pitch: "本格運用フェーズへ",
    body: "全機能 + アセットビルダー + テーマカスタマイズ + 優先サポート。",
    cta: "お問い合わせ",
    recommended: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    pulse: "P / 04",
    pitch: "大企業・セキュリティ要件",
    body: "個社専用環境 + API連携 + カスタムAI + SLA。",
    cta: "お問い合わせ",
  },
];

interface MatrixRow {
  label: string;
  values: [string, string, string, string]; // PoC / Starter / Growth / Enterprise
}

const MATRIX: MatrixRow[] = [
  { label: "診断（基本）", values: ["✓", "✓", "✓", "✓"] },
  { label: "ダッシュボード", values: ["✓", "✓", "✓", "✓"] },
  { label: "コンシェルジュ", values: ["–", "✓", "✓", "✓"] },
  { label: "ナレッジ管理", values: ["–", "基本", "✓", "✓"] },
  { label: "アセットビルダー", values: ["–", "–", "✓", "✓"] },
  { label: "テーマカスタマイズ", values: ["–", "–", "✓", "✓"] },
  { label: "API連携（SF/HubSpot等）", values: ["–", "–", "–", "✓"] },
  { label: "個社専用環境", values: ["–", "–", "–", "✓"] },
  { label: "SLA", values: ["–", "–", "–", "✓"] },
  { label: "優先サポート", values: ["–", "–", "✓", "✓"] },
];

export default function Pricing() {
  return (
    <section
      id="pricing"
      className="relative overflow-hidden bg-deepNight py-20 md:py-28"
    >
      {/* ambient corner glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-[15vw] -top-[10vh] h-[55vh] w-[55vh] rounded-full bg-sunsetPink/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-[15vw] bottom-[10vh] h-[50vh] w-[50vh] rounded-full bg-windowLight/8 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.7) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      <Container width="wide" className="relative z-10">
        <SectionMarker track="03" total={4} title="Editions" subtitle="プラン体系" />

        <Reveal
          stagger
          className="mt-12 grid items-end gap-8 lg:grid-cols-[1fr_1fr] lg:gap-16"
        >
          <RevealItem>
            <p className="font-syne italic font-bold leading-[0.92] tracking-[-0.02em] text-white text-[clamp(2.5rem,5.5vw+0.8rem,4.5rem)]">
              Four pressings.
              <br />
              <span className="text-windowLight">Same record.</span>
            </p>
          </RevealItem>
          <RevealItem>
            <p className="text-pretty text-bodylg leading-relaxed text-white/75 [word-break:keep-all]">
              事業フェーズに合わせて、選べる4プラン。価格は事業規模・利用シーンに応じて
              <span className="text-windowLight">個別ご案内</span>
              します。
            </p>
          </RevealItem>
        </Reveal>

        <Reveal stagger className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {PLANS.map((p) => (
            <RevealItem key={p.id}>
              <ConstructionAccent halo={p.recommended ? "strong" : "subtle"} pad="none" subtle={!p.recommended} className="h-full">
              <div
                className={cn(
                  "card-lift relative flex h-full flex-col rounded-md border p-7 transition-all",
                  p.recommended
                    ? "border-sunsetPink/60 bg-gradient-to-b from-sunsetPink/10 to-transparent shadow-glow-pink"
                    : "border-white/14 bg-white/[0.03]",
                )}
              >
                {p.recommended && (
                  <span className="absolute -top-3 left-7 rounded-full bg-sunsetPink px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em] font-bold text-deepNight">
                    Recommended
                  </span>
                )}
                <div className="flex items-baseline justify-between font-mono text-[10px] uppercase tracking-[0.22em]">
                  <span className="text-white/40">{p.pulse}</span>
                  <span className={p.recommended ? "text-sunsetPink" : "text-white/45"}>
                    Edition
                  </span>
                </div>
                <p className="mt-5 font-syne italic font-bold text-[32px] leading-none text-white">
                  {p.name}
                </p>
                <p className="mt-2 text-bodysm text-windowLight">{p.pitch}</p>
                <p className="mt-5 text-pretty text-bodysm leading-relaxed text-white/70 [word-break:keep-all]">
                  {p.body}
                </p>
                <div className="mt-6 flex-1" />
                <Button
                  href="/#cta"
                  variant={p.recommended ? "primary" : "ghostOnDark"}
                  className="mt-6 w-full"
                >
                  {p.cta}
                </Button>
              </div>
              </ConstructionAccent>
            </RevealItem>
          ))}
        </Reveal>

        {/* feature matrix — spec sheet style */}
        <Reveal className="mt-16 overflow-hidden rounded-md border border-white/14 bg-deepNight/40 backdrop-blur-sm">
          <div className="flex items-center justify-between border-b border-white/10 px-6 py-3 font-mono text-[10.5px] uppercase tracking-[0.22em]">
            <span className="text-windowLight">
              Specification sheet · v0.1 · 2026
            </span>
            <span className="text-white/50">10 features × 4 editions</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-left text-bodysm">
              <thead>
                <tr className="border-b border-white/10 text-white/80">
                  <th
                    scope="col"
                    className="px-6 py-4 font-mono text-eyebrow uppercase text-white/55"
                  >
                    機能
                  </th>
                  {PLANS.map((p) => (
                    <th
                      key={p.id}
                      scope="col"
                      className={cn(
                        "px-4 py-4 text-center font-syne italic text-[15px] font-bold",
                        p.recommended ? "text-sunsetPink" : "text-white",
                      )}
                    >
                      {p.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="text-white/80">
                {MATRIX.map((row, i) => (
                  <tr
                    key={row.label}
                    className="border-b border-white/8 last:border-b-0 hover:bg-white/[0.02]"
                  >
                    <th
                      scope="row"
                      className="px-6 py-3 text-left text-bodysm font-medium text-white/85"
                    >
                      <span className="mr-3 font-mono text-[10px] text-white/30">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {row.label}
                    </th>
                    {row.values.map((v, j) => (
                      <td
                        key={j}
                        className={cn(
                          "px-4 py-3 text-center font-mono",
                          v === "✓"
                            ? "text-windowBlue"
                            : v === "–"
                              ? "text-white/25"
                              : "text-windowLight",
                        )}
                      >
                        {v}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
