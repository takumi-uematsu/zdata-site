import Container from "@/components/ui/Container";
import Reveal, { RevealItem } from "@/components/ui/Reveal";
import SectionMarker from "@/components/ui/SectionMarker";
import ConstructionAccent from "@/components/ui/ConstructionAccent";
import { cn } from "@/lib/cn";

const PILLARS = [
  {
    no: "01",
    tag: "Voice",
    label: "VOICE",
    title: "声を集める",
    body: "診断 + AIコンシェルジュで、顧客の本音（0PD）を構造化データで収集。3rdパーティデータの限界を超える、自社固有のデータ資産へ。",
    outcome: "Owned data, not borrowed.",
    tone: "windowBlue" as const,
  },
  {
    no: "02",
    tag: "Rhythm",
    label: "RHYTHM",
    title: "脈動を読む",
    body: "インテントスコア（診断50・キーワード30・行動20）で、「今アプローチすべき企業」を3層で可視化。",
    outcome: "Time-sensitive intent, scored.",
    tone: "windowLight" as const,
  },
  {
    no: "03",
    tag: "Asset",
    label: "ASSET",
    title: "アセット化する",
    body: "0PD × 自社ナレッジ をAIが統合し、個社別の提案書・コンテンツを自動生成。組織のナレッジが、AIで増幅される。",
    outcome: "Knowledge becomes leverage.",
    tone: "sunsetPink" as const,
  },
];

const toneColor: Record<(typeof PILLARS)[number]["tone"], string> = {
  windowBlue: "text-windowBlue",
  windowLight: "text-windowLight",
  sunsetPink: "text-sunsetPink",
};

export default function Solution() {
  return (
    <section
      id="solution"
      className="relative overflow-hidden bg-deepNight py-20 md:py-28"
    >
      {/* ambient corner glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-[18vw] top-1/4 h-[60vh] w-[60vh] rounded-full bg-windowLight/10 blur-3xl"
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
        <SectionMarker track="04" title="The Method" subtitle="手法" />

        <div className="mt-14 grid gap-12 lg:grid-cols-[5fr_7fr] lg:gap-20">
          {/* Left: pull quote */}
          <Reveal stagger>
            <RevealItem>
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-windowLight">
                Manifesto
              </p>
            </RevealItem>
            <RevealItem className="mt-5">
              <p className="font-syne italic font-bold leading-[0.92] tracking-[-0.025em] text-white text-[clamp(3rem,7vw,5.5rem)]">
                Noise is
                <br />
                not signal.
              </p>
            </RevealItem>
            <RevealItem className="mt-8">
              <div className="h-px w-16 bg-windowLight/60" />
            </RevealItem>
            <RevealItem className="mt-5">
              <p className="text-balance font-jp font-bold leading-tight text-white text-[clamp(1.5rem,3.4vw,2.25rem)]">
                ノイズではなく、
                <br />
                <span className="text-windowBlue">波形</span>を。
              </p>
            </RevealItem>
            <RevealItem className="mt-7">
              <p className="text-pretty text-bodylg leading-relaxed text-white/80 [word-break:keep-all]">
                Z-Data は、
                <span className="text-windowLight">ゼロパーティデータ × AI × 自社ナレッジ</span>
                を統合し、顧客の声を
                <span className="text-sunsetPink">模倣不可能な独自アセット</span>
                に変える BtoB SaaS です。
              </p>
            </RevealItem>
          </Reveal>

          {/* Right: 3 pillars as editorial columns */}
          <Reveal stagger className="grid gap-4 md:grid-cols-3">
            {PILLARS.map((p) => (
              <RevealItem key={p.no}>
                <ConstructionAccent halo="subtle" pad="default" subtle>
                  <article
                    className={cn(
                      "card-lift group flex h-full flex-col border-t border-white/20 pt-5 hover:border-windowLight",
                    )}
                  >
                  <div className="flex items-baseline justify-between font-mono text-[10px] uppercase tracking-[0.22em]">
                    <span className="text-white/45">{p.no}</span>
                    <span
                      className={cn(
                        "transition-colors",
                        toneColor[p.tone],
                        "opacity-60 group-hover:opacity-100",
                      )}
                    >
                      ● {p.tag}
                    </span>
                  </div>
                  <h3
                    className={cn(
                      "mt-6 font-syne italic font-bold leading-[0.9] tracking-tight text-[clamp(2.2rem,calc(3vw_+_0.8rem),3rem)]",
                      toneColor[p.tone],
                    )}
                  >
                    {p.label}
                  </h3>
                  <p className="mt-5 font-jp text-h3 font-bold leading-tight text-white">
                    {p.title}
                  </p>
                  <p className="mt-3 text-pretty text-bodysm leading-relaxed text-white/70 [word-break:keep-all]">
                    {p.body}
                  </p>
                  <div className="mt-6 flex-1" />
                  <p
                    className={cn(
                      "mt-6 border-t border-white/12 pt-4 font-mono text-[10.5px] uppercase tracking-[0.16em]",
                      toneColor[p.tone],
                      "opacity-80",
                    )}
                  >
                    → {p.outcome}
                  </p>
                  </article>
                </ConstructionAccent>
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
