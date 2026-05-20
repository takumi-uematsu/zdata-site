import Container from "@/components/ui/Container";
import Reveal, { RevealItem } from "@/components/ui/Reveal";
import CountUp from "@/components/ui/CountUp";
import SectionMarker from "@/components/ui/SectionMarker";
import ConstructionAccent from "@/components/ui/ConstructionAccent";

const POINTS = [
  {
    no: "01",
    label: "DATA",
    title: "「誰が来たか」は分かる。「何を求めているか」は分からない。",
    body: "Web行動データやリードスコアでは、訪問は捕捉できる。しかし、その先の本音までは届かない。",
  },
  {
    no: "02",
    label: "VOICE",
    title: "「満足度」は出る。「商談で響くインサイト」は出ない。",
    body: "汎用アンケートはスコアを返す。しかし、現場の営業が今日使える言葉までは降りてこない。",
  },
  {
    no: "03",
    label: "KNOWLEDGE",
    title: "ベテランしか戦えない。ナレッジは組織に残らない。",
    body: "営業の経験頼みでは、戦える人が限られる。その知恵はチームの資産にもならない。",
  },
];

export default function Problem() {
  return (
    <section
      id="problem"
      className="relative overflow-hidden bg-deepNight py-20 md:py-28"
    >
      <Container width="wide">
        <SectionMarker track="03" title="The Silent Exit" subtitle="声なき離脱" />

        <div className="mt-14 grid items-start gap-12 lg:grid-cols-[5fr_7fr] lg:gap-20">
          {/* Left: hero figure */}
          <Reveal stagger className="relative">
            <RevealItem>
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-windowLight">
                In one figure
              </p>
            </RevealItem>
            <RevealItem className="mt-5">
              <ConstructionAccent halo="strong" shimmer ripples pad="loose">
                <p
                  className="font-syne italic font-bold leading-[0.82] tracking-[-0.03em] text-transparent bg-clip-text bg-gradient-to-b from-sunsetPink via-twilight to-windowBlue text-[clamp(6.5rem,18vw,12.5rem)]"
                  aria-label="80パーセント"
                >
                  <CountUp to={80} suffix="%" duration={1400} />
                </p>
              </ConstructionAccent>
            </RevealItem>
            <RevealItem className="mt-7">
              <div className="h-px w-20 bg-white/30" />
            </RevealItem>
            <RevealItem className="mt-5">
              <p className="font-mono text-[11px] uppercase leading-relaxed tracking-[0.18em] text-white/55">
                BtoB Industry observation
                <br />
                Source · 2025 → 2026
              </p>
            </RevealItem>
            <RevealItem className="mt-8">
              <div className="inline-flex items-center gap-3 border-l-2 border-sunsetPink/70 pl-4 py-1 font-mono text-[11px] uppercase tracking-[0.18em] text-sunsetPink">
                ● Latent leads exit
                <br className="hidden md:inline" />
                without ever speaking up
              </div>
            </RevealItem>
          </Reveal>

          {/* Right: editorial points */}
          <div>
            <Reveal stagger>
              <RevealItem>
                <h2 className="text-balance font-jp font-bold leading-[1.18] tracking-tight text-white text-[clamp(1.85rem,4vw,2.9rem)] [word-break:keep-all]">
                  潜在層は、声を出さずに
                  <br />
                  <span className="text-sunsetPink">離脱する。</span>
                </h2>
              </RevealItem>
              <RevealItem className="mt-3">
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/45">
                  Three reasons why visibility ends at the surface
                </p>
              </RevealItem>
            </Reveal>

            <Reveal stagger className="mt-10 divide-y divide-white/12">
              {POINTS.map((p) => (
                <RevealItem key={p.no}>
                  <div className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-3 py-7 md:gap-x-10">
                    <div className="flex flex-col items-start gap-2">
                      <span className="font-syne italic font-bold text-[30px] leading-none text-windowLight">
                        {p.no}
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/45">
                        {p.label}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-jp text-h3 font-bold leading-[1.4] text-white">
                        {p.title}
                      </h3>
                      <p className="mt-3 text-pretty text-bodysm leading-relaxed text-white/65 [word-break:keep-all]">
                        {p.body}
                      </p>
                    </div>
                  </div>
                </RevealItem>
              ))}
            </Reveal>

            <Reveal className="mt-8 flex items-start gap-4 rounded-sm border border-sunsetPink/35 bg-sunsetPink/8 px-5 py-4">
              <span className="font-syne italic font-bold text-[22px] leading-none text-sunsetPink">
                →
              </span>
              <p className="font-jp text-body leading-relaxed text-white/90">
                結果として、潜在顧客の
                <span className="px-1 font-bold text-sunsetPink">80%以上</span>
                が「声なき離脱」をしている。
              </p>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
