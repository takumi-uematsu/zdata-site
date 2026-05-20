import Container from "@/components/ui/Container";
import Reveal, { RevealItem } from "@/components/ui/Reveal";
import SectionMarker from "@/components/ui/SectionMarker";
import ConstructionAccent from "@/components/ui/ConstructionAccent";

/**
 * About Z-Data — explains what Zero Party Data is, why it matters, and what
 * Z-Data does with it. Placed between Hero (brand impression) and Features
 * (product proof) to bridge the narrative.
 *
 *   1. Manifesto pull: "Owned data, not borrowed."
 *   2. 3-column comparison: 1st Party / 3rd Party / Zero Party Data
 *   3. Why valuable: 3 benefits (Honest / Actionable / Scalable)
 */
export default function About() {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-deepNight py-20 md:py-28"
    >
      {/* ambient corner glows + dotted grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-[15vw] top-1/4 h-[60vh] w-[60vh] rounded-full bg-windowLight/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-[12vw] -bottom-[10vh] h-[50vh] w-[50vh] rounded-full bg-sunsetPink/10 blur-3xl"
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
          track="01"
          total={4}
          title="What is Z-Data"
          subtitle="Z-Dataとは"
        />

        {/* Manifesto pull + intro */}
        <Reveal
          stagger
          className="mt-12 grid items-end gap-8 lg:grid-cols-[1fr_1fr] lg:gap-16"
        >
          <RevealItem>
            <p className="font-syne italic font-bold leading-[0.92] tracking-[-0.025em] text-white text-[clamp(2.25rem,calc(4.8vw_+_0.6rem),3.8rem)]">
              <span className="text-sunsetPink">Owned data,</span>
              <br />
              not borrowed.
            </p>
          </RevealItem>
          <RevealItem>
            <p className="text-pretty text-bodylg leading-relaxed text-white/75 [word-break:keep-all]">
              Z-Data は{" "}
              <span className="text-windowLight">Zero Party Data（0PD）</span>
              ── 顧客が
              <span className="text-sunsetPink">意思を持って渡す情報</span>
              ── を起点に、営業・マーケティングの精度を上げる BtoB SaaS です。
            </p>
            <p className="mt-5 font-jp text-h3 font-bold leading-snug text-white [word-break:keep-all]">
              顧客が自ら渡す声を、ビジネスの推進力に。
            </p>
          </RevealItem>
        </Reveal>

        {/* 3-Party Data comparison */}
        <div className="mt-16">
          <p className="text-center font-mono text-[11px] uppercase tracking-[0.24em] text-windowLight/85">
            3 Types of customer data
          </p>
          <Reveal stagger className="mt-8 grid gap-6 md:grid-cols-3">
            <RevealItem>
              <ConstructionAccent halo="subtle" subtle>
                <div className="flex h-full flex-col gap-3">
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/45">
                    1st Party Data
                    <span className="ml-2 text-white/30">／ 自社収集</span>
                  </p>
                  <p className="font-jp text-h3 font-bold leading-tight text-white">
                    Web行動・購買ログ
                  </p>
                  <p className="text-bodysm leading-relaxed text-white/65 [word-break:keep-all]">
                    「誰が何をしたか」は分かる。でも「
                    <span className="text-white/80">なぜ・何を求めているか</span>
                    」は見えない。
                  </p>
                </div>
              </ConstructionAccent>
            </RevealItem>

            <RevealItem>
              <ConstructionAccent halo="subtle" subtle>
                <div className="flex h-full flex-col gap-3">
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/45">
                    3rd Party Data
                    <span className="ml-2 text-white/30">／ 外部購入</span>
                  </p>
                  <p className="font-jp text-h3 font-bold leading-tight text-white">
                    プラットフォーム所有
                  </p>
                  <p className="text-bodysm leading-relaxed text-white/65 [word-break:keep-all]">
                    Cookie 規制で精度急落。
                    <span className="text-white/80">他社の所有物</span>
                    で、自社の競争優位にならない。
                  </p>
                </div>
              </ConstructionAccent>
            </RevealItem>

            <RevealItem>
              <ConstructionAccent halo="strong">
                <div className="flex h-full flex-col gap-3">
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-sunsetPink">
                    ● Zero Party Data
                    <span className="ml-2 text-windowLight/80">／ 顧客提供</span>
                  </p>
                  <p className="font-jp text-h3 font-bold leading-tight text-white">
                    自社固有のデータ資産
                  </p>
                  <p className="text-bodysm leading-relaxed text-white/65 [word-break:keep-all]">
                    診断・対話で顧客が
                    <span className="text-sunsetPink">意思を持って渡す</span>
                    情報。偽装できず、商談に直結する。
                  </p>
                </div>
              </ConstructionAccent>
            </RevealItem>
          </Reveal>
        </div>

        {/* Why valuable */}
        <Reveal
          stagger
          className="mt-20 grid items-start gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16"
        >
          <RevealItem>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-sunsetPink">
              Why valuable ／ なぜ 0PD が強いか
            </p>
            <h3 className="mt-5 font-jp font-bold leading-tight text-white text-[clamp(1.4rem,calc(2.6vw_+_0.4rem),2rem)] [word-break:keep-all]">
              <span className="text-sunsetPink">Cookie の終焉</span> ×{" "}
              <span className="text-windowBlue">生成AIの実用化</span>
              。
              <br />
              「顧客が自ら渡す声」の価値が、いま急上昇している。
            </h3>
          </RevealItem>
          <RevealItem>
            <ul className="space-y-5">
              <li className="border-l-2 border-sunsetPink/60 pl-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-sunsetPink">
                  01 ／ Honest
                </p>
                <p className="mt-1.5 font-jp text-bodylg font-medium leading-relaxed text-white [word-break:keep-all]">
                  偽装も汚染もない、
                  <span className="text-sunsetPink">本当の声</span>
                  が集まる
                </p>
              </li>
              <li className="border-l-2 border-windowLight/60 pl-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-windowLight">
                  02 ／ Actionable
                </p>
                <p className="mt-1.5 font-jp text-bodylg font-medium leading-relaxed text-white [word-break:keep-all]">
                  商談で響くインサイトに、
                  <span className="text-windowLight">直結</span>
                  する
                </p>
              </li>
              <li className="border-l-2 border-windowBlue/60 pl-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-windowBlue">
                  03 ／ Scalable
                </p>
                <p className="mt-1.5 font-jp text-bodylg font-medium leading-relaxed text-white [word-break:keep-all]">
                  個社別の提案書を、
                  <span className="text-windowBlue">AIが自動生成</span>
                  する
                </p>
              </li>
            </ul>
          </RevealItem>
        </Reveal>
      </Container>
    </section>
  );
}
