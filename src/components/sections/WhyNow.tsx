import Container from "@/components/ui/Container";
import Reveal, { RevealItem } from "@/components/ui/Reveal";
import SectionMarker from "@/components/ui/SectionMarker";
import ConstructionAccent from "@/components/ui/ConstructionAccent";

const REASONS = [
  {
    no: "01",
    year: "2024 →",
    title: "Cookie の終焉",
    body: "3rdパーティCookieの段階的廃止により、ターゲティングの精度が急落。",
    pull: "顧客が自ら渡す声の価値が、相対的に急上昇している。",
  },
  {
    no: "02",
    year: "2025 →",
    title: "生成AIの実用化",
    body: "0PD × 自社ナレッジを統合したアセット自動生成が、技術的に可能になった。",
    pull: "2年前には不可能だった個社別の提案書を自動生成。今は現実的。",
  },
  {
    no: "03",
    year: "2026",
    title: "日本市場の空白",
    body: "グローバルでは0PD×AI市場が約$3B規模で立ち上がっている。日本は「ZPD × AI生成」の統合プレイヤーがまだいない。",
    pull: "今が、市場を作る側に立つチャンス。",
  },
];

export default function WhyNow() {
  return (
    <section
      id="why-now"
      className="relative overflow-hidden bg-deepNight py-20 md:py-28"
    >
      <Container width="wide">
        <SectionMarker track="09" title="Why 2026" subtitle="なぜ今か" />

        <Reveal
          stagger
          className="mt-12 grid items-end gap-8 lg:grid-cols-[1fr_1fr] lg:gap-16"
        >
          <RevealItem>
            <p className="font-syne italic font-bold leading-[0.92] tracking-[-0.02em] text-white text-[clamp(2.5rem,calc(5.5vw_+_0.8rem),4.5rem)]">
              The window
              <br />
              <span className="text-sunsetPink">is open.</span>
            </p>
          </RevealItem>
          <RevealItem>
            <p className="text-pretty text-bodylg leading-relaxed text-white/75 [word-break:keep-all]">
              2026年は、声を
              <span className="text-windowLight">所有</span>
              する側が勝つ。ターゲティングの土台が崩れ、AI が現実になり、日本市場には穴がある。
              <span className="text-sunsetPink">3つの追い風</span>
              が同時に吹いている。
            </p>
          </RevealItem>
        </Reveal>

        <Reveal stagger className="mt-16 space-y-14 md:space-y-16">
          {REASONS.map((r) => (
            <RevealItem key={r.no}>
              <ConstructionAccent halo="subtle" pad="default" subtle>
              <article className="grid items-start gap-6 md:grid-cols-[140px_1fr_1fr] md:gap-12">
                <div>
                  <p className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-windowLight">
                    Reason {r.no}
                  </p>
                  <p className="mt-2 font-syne italic font-bold leading-none text-twilight text-[clamp(3rem,6vw,4.5rem)]">
                    {r.no}
                  </p>
                  <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.22em] text-white/40">
                    {r.year}
                  </p>
                </div>
                <div>
                  <h3 className="font-jp text-h2 font-bold leading-tight text-white">
                    {r.title}
                  </h3>
                  <p className="mt-4 text-pretty text-body leading-relaxed text-white/70 [word-break:keep-all]">
                    {r.body}
                  </p>
                </div>
                <div className="relative border-l border-windowLight/35 pl-5 md:pl-6">
                  <p className="font-jp text-bodylg font-medium leading-relaxed text-windowLight">
                    {r.pull}
                  </p>
                </div>
              </article>
              </ConstructionAccent>
            </RevealItem>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
