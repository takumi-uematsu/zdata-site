import Container from "@/components/ui/Container";
import Reveal, { RevealItem } from "@/components/ui/Reveal";
import SectionMarker from "@/components/ui/SectionMarker";
import ConstructionAccent from "@/components/ui/ConstructionAccent";
import MockDashboard from "@/components/mocks/MockDashboard";
import MockAssetBuilder from "@/components/mocks/MockAssetBuilder";
import MockKnowledge from "@/components/mocks/MockKnowledge";
import MockDiagnose from "@/components/mocks/MockDiagnose";
import MockConcierge from "@/components/mocks/MockConcierge";
import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

const FEATURES: {
  no: string;
  tag: string;
  title: string;
  highlight: string;
  body: string;
  mock: ReactNode;
}[] = [
  {
    no: "01",
    tag: "Dashboard",
    title: "インサイトダッシュボード",
    highlight: "今アプローチすべき企業を、一目で。",
    body: "企業別インテントスコア・PainPoint可視化・行動分析を一つの画面に。Hot / Warm / Cold の3層で、営業の動き出しを決められる。",
    mock: <MockDashboard />,
  },
  {
    no: "02",
    tag: "Asset Builder",
    title: "アセットビルダー",
    highlight: "若手でも、ベテラン級の提案を。",
    body: "0PD × 自社ナレッジ → 個社別の提案書・コンテンツを AI が下書き。営業はチューニングに専念し、戦える人を増やす。",
    mock: <MockAssetBuilder />,
  },
  {
    no: "03",
    tag: "Knowledge",
    title: "ナレッジ管理",
    highlight: "ナレッジが、人に依存しない資産になる。",
    body: "事例・方法論・データを構造化して蓄積。AI が業種・トピック横断で活用し、組織の知恵を増幅する。",
    mock: <MockKnowledge />,
  },
  {
    no: "04",
    tag: "Diagnose",
    title: "診断",
    highlight: "10問で、本音を引き出す。",
    body: "対話型 AI 診断で、回答者の課題を構造化。離脱しにくい設計で、0PD を自然に集める。",
    mock: <MockDiagnose />,
  },
  {
    no: "05",
    tag: "Concierge",
    title: "コンシェルジュ",
    highlight: "対話で、声をさらに深く。",
    body: "AI チャットで深掘り → 追加の 0PD を自然に収集。診断後のフォローも自動化し、声を厚みに変える。",
    mock: <MockConcierge />,
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="relative overflow-hidden bg-deepNight py-20 md:py-28"
    >
      <Container width="wide">
        <SectionMarker
          track="02"
          total={4}
          title="Inside the Studio"
          subtitle="5つのコア機能"
        />

        <Reveal
          stagger
          className="mt-12 grid items-end gap-8 lg:grid-cols-[1fr_1fr] lg:gap-16"
        >
          <RevealItem>
            <p className="font-syne italic font-bold leading-[0.92] tracking-[-0.02em] text-white text-[clamp(2.5rem,calc(5.5vw_+_0.8rem),4.5rem)]">
              5 modules.
              <br />
              <span className="text-windowBlue">One pulse.</span>
            </p>
          </RevealItem>
          <RevealItem>
            <p className="text-pretty text-bodylg leading-relaxed text-white/75 [word-break:keep-all]">
              声を集め、脈動を読み、アセット化する。Z-Data はその一連を、
              <span className="text-windowLight">5 つのモジュール</span>
              で支える。どれかを抜き出して使うこともできるが、揃ったときに最大の出力になるよう設計されている。
            </p>
          </RevealItem>
        </Reveal>

        <div className="mt-16 space-y-24 md:space-y-28">
          {FEATURES.map((f, i) => {
            const reverse = i % 2 === 1;
            return (
              <Reveal key={f.no} stagger>
                <div className="grid items-center gap-10 md:grid-cols-[1.1fr_0.9fr] md:gap-14">
                  <RevealItem className={cn(reverse && "md:order-2")}>
                    <ConstructionAccent halo="subtle" pad="default" subtle>
                      {f.mock}
                    </ConstructionAccent>
                  </RevealItem>
                  <RevealItem className={cn(reverse && "md:order-1")}>
                    <div className="flex items-baseline gap-3 font-mono text-[11px] uppercase tracking-[0.22em]">
                      <span className="text-white/40">Module {f.no}</span>
                      <span className="text-white/25">·</span>
                      <span className="text-windowLight">{f.tag}</span>
                    </div>
                    <h3 className="text-balance mt-4 font-jp text-h1 font-bold leading-tight text-white text-[clamp(1.75rem,3.8vw,2.5rem)]">
                      {f.title}
                    </h3>
                    <p className="text-balance mt-4 font-jp text-h3 font-medium leading-snug text-windowBlue">
                      {f.highlight}
                    </p>
                    <p className="mt-5 max-w-md text-pretty text-body leading-relaxed text-white/72 [word-break:keep-all]">
                      {f.body}
                    </p>
                  </RevealItem>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
