import Container from "@/components/ui/Container";
import Reveal, { RevealItem } from "@/components/ui/Reveal";
import SectionMarker from "@/components/ui/SectionMarker";
import ConstructionAccent from "@/components/ui/ConstructionAccent";
import WhitepaperForm from "@/components/ui/WhitepaperForm";

export default function CTA() {
  return (
    <section
      id="cta"
      className="relative overflow-hidden bg-deepNight py-20 md:py-28"
    >
      {/* ORYZO-style warm corner glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-[15vw] -bottom-[15vh] h-[80vh] w-[80vh] rounded-full bg-sunsetPink/15 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-[10vw] -top-[15vh] h-[55vh] w-[55vh] rounded-full bg-windowLight/10 blur-3xl"
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
        <SectionMarker track="04" total={4} title="Get the Pressing" subtitle="資料ダウンロード" />

        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <Reveal stagger>
            <RevealItem>
              <p className="font-syne italic font-bold leading-[0.92] tracking-[-0.025em] text-white text-[clamp(3rem,calc(6vw_+_1rem),5.5rem)]">
                Take the
                <br />
                <span className="text-sunsetPink">record home.</span>
              </p>
            </RevealItem>
            <RevealItem className="mt-8">
              <p className="font-jp text-h2 font-bold leading-tight text-white">
                Z-Data を、まず
                <span className="text-windowLight">資料</span>
                で知る。
              </p>
            </RevealItem>
            <RevealItem className="mt-6">
              <p className="text-pretty text-bodylg leading-relaxed text-white/80 [word-break:keep-all]">
                全機能の詳細、想定する導入企業像、料金プランの全貌を
                <span className="text-windowLight">10ページ</span>
                にまとめました。
              </p>
            </RevealItem>

            <RevealItem className="mt-10">
              <ul className="space-y-3 border-l border-white/15 pl-5 font-mono text-[11px] uppercase tracking-[0.18em] text-white/65">
                <li>● 10 pages</li>
                <li>● PDF · ~4 MB</li>
                <li>● JP / 2026 May edition</li>
                <li>● Sent instantly to your inbox</li>
              </ul>
            </RevealItem>
          </Reveal>

          <Reveal>
            <ConstructionAccent halo="strong" ripples pad="none">
              <div className="rounded-2xl border border-white/14 bg-deepNight/55 p-6 backdrop-blur-md md:p-10">
                <WhitepaperForm />
              </div>
            </ConstructionAccent>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
