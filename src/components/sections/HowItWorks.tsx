import Container from "@/components/ui/Container";
import Reveal, { RevealItem } from "@/components/ui/Reveal";
import SectionMarker from "@/components/ui/SectionMarker";
import ConstructionAccent from "@/components/ui/ConstructionAccent";

const STEPS = [
  {
    n: "01",
    label: "Install",
    title: "設置する",
    body: "診断テーマをカスタマイズして、Webサイトに埋め込み。",
  },
  {
    n: "02",
    label: "Capture",
    title: "集める",
    body: "診断 + コンシェルジュで、訪問者の声（0PD）を構造化データとして収集。",
  },
  {
    n: "03",
    label: "Read",
    title: "分析する",
    body: "インテントスコアで「今動くべき企業」を可視化、課題カテゴリを集計。",
  },
  {
    n: "04",
    label: "Press",
    title: "生成する",
    body: "0PD × 自社ナレッジ → 個社別アセットをAIが自動生成、営業に渡す。",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative overflow-hidden bg-deepNight py-20 md:py-28"
    >
      {/* ambient corner glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-[18vw] -bottom-[10vh] h-[60vh] w-[60vh] rounded-full bg-sunsetPink/10 blur-3xl"
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
        <SectionMarker
          track="06"
          title="Pressing the Tape"
          subtitle="動き方"
        />

        <Reveal
          stagger
          className="mt-12 grid items-end gap-8 lg:grid-cols-[1fr_1fr] lg:gap-16"
        >
          <RevealItem>
            <p className="font-syne italic font-bold leading-[0.92] tracking-[-0.02em] text-white text-[clamp(2.5rem,5.5vw+0.8rem,4.5rem)]">
              Install. Capture.
              <br />
              <span className="text-windowLight">Read. Press.</span>
            </p>
          </RevealItem>
          <RevealItem>
            <p className="text-pretty text-bodylg leading-relaxed text-white/75 [word-break:keep-all]">
              訪問者の声を集めるところから、AI が個社別アセットを生成するところまで、
              <span className="text-windowLight">4ステップ</span>
              で完結する。短いサイクルを回し続けることで、データもナレッジも厚みを増していく。
            </p>
          </RevealItem>
        </Reveal>

        <Reveal
          stagger
          className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {STEPS.map((s, i) => (
            <RevealItem key={s.n}>
              <ConstructionAccent halo="subtle" pad="default" subtle className="relative h-full bg-deepNight/40 backdrop-blur-sm">
              <div className="flex items-baseline justify-between font-mono text-[10px] uppercase tracking-[0.22em] text-white/50">
                <span>Step {s.n}</span>
                <span className="text-windowLight">{s.label}</span>
              </div>
              <p className="mt-6 font-syne italic font-bold leading-none text-[68px] tracking-[-0.03em] text-windowLight">
                {s.n}
              </p>
              <h3 className="mt-5 font-jp text-h2 font-bold leading-tight text-white">
                {s.title}
              </h3>
              <p className="mt-3 text-pretty text-bodysm leading-relaxed text-white/70 [word-break:keep-all]">
                {s.body}
              </p>
              {i < STEPS.length - 1 && (
                <span
                  aria-hidden
                  className="absolute -right-3 top-1/2 hidden h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full border border-white/14 bg-deepNight text-windowLight lg:flex"
                >
                  →
                </span>
              )}
              </ConstructionAccent>
            </RevealItem>
          ))}
        </Reveal>

        <Reveal className="mt-10 flex items-center justify-between border-t border-white/12 pt-4 font-mono text-[10.5px] uppercase tracking-[0.22em] text-white/55">
          <span>Cycle time · ~2 weeks per pass</span>
          <span className="text-windowLight">
            Continuous improvement, by design
          </span>
        </Reveal>
      </Container>
    </section>
  );
}
