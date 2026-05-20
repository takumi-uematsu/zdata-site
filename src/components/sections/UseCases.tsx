"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Container from "@/components/ui/Container";
import SectionMarker from "@/components/ui/SectionMarker";
import ConstructionAccent from "@/components/ui/ConstructionAccent";
import { cn } from "@/lib/cn";

interface UseCase {
  id: string;
  label: string;
  industry: string;
  code: string;
  before: string;
  after: string;
  metric: string;
}

const CASES: UseCase[] = [
  {
    id: "consulting",
    label: "Consulting",
    industry: "コンサルティング会社",
    code: "CASE / CON-01",
    before:
      "提案パターンの多さ × 高単価 × 専門性が差別化要素。だが、提案書はベテラン依存、若手は1社あたり2-3時間の準備が必要。",
    after:
      "0PDで顧客課題を事前に構造化。アセットビルダーが個社別の提案素材を自動生成。若手でもベテラン級の提案が可能に。",
    metric: "提案準備時間を 50-70% 削減",
  },
  {
    id: "saas",
    label: "Vertical SaaS",
    industry: "バーティカルSaaS",
    code: "CASE / SAA-01",
    before:
      "業種特化のSaaSは、商談ごとに業界知見の擦り合わせが必要。営業担当によってヒアリング深度・トーク内容にばらつきが大きい。",
    after:
      "業界別の0PDテンプレで、初回商談前から顧客課題が見える。チーム横断でナレッジ・トークスクリプトをAIが拡充。",
    metric: "商談化率を 1.5-3倍 向上",
  },
  {
    id: "manufacturing",
    label: "Manufacturing",
    industry: "製造業（装置・部品）",
    code: "CASE / MFG-01",
    before:
      "技術的に複雑な装置・部品の販売は、長期商談 × 多関係者で意思決定に時間がかかる。RFP対応に営業＋技術が大量稼働。",
    after:
      "事前診断で「現場の困りごと」を構造化。技術提案書のドラフトをAIが生成、営業＋技術はチューニングに集中。",
    metric: "RFP対応工数を 40% 削減",
  },
  {
    id: "professional",
    label: "Professional",
    industry: "専門サービス業（法務・会計・人事）",
    code: "CASE / PRO-01",
    before:
      "属人的な専門知識が売り。だが、その知識は個人のヘッドに眠ったまま、組織のアセットになっていない。",
    after:
      "0PDで顧客の悩みを構造化、過去の対応事例とAIが照合。組織のナレッジが体系化され、新人もベテランの判断ロジックを参照できる。",
    metric: "新人立ち上がり期間を 短縮",
  },
];

export default function UseCases() {
  const [active, setActive] = useState<string>(CASES[0].id);
  const current = CASES.find((c) => c.id === active) ?? CASES[0];

  return (
    <section
      id="use-cases"
      className="relative overflow-hidden bg-deepNight py-20 md:py-28"
    >
      <Container width="wide">
        <SectionMarker track="07" title="Field Recordings" subtitle="想定する活用シーン" />

        <div className="mt-12 grid items-end gap-8 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <p className="font-syne italic font-bold leading-[0.92] tracking-[-0.02em] text-white text-[clamp(2.5rem,5.5vw+0.8rem,4.5rem)]">
            Different industries.
            <br />
            <span className="text-sunsetPink">One pulse to read.</span>
          </p>
          <p className="text-pretty text-bodylg leading-relaxed text-white/75 [word-break:keep-all]">
            業種ごとに、声の使い道は変わる。コンサル、SaaS、製造、専門サービス。それぞれの
            <span className="text-windowLight">「Before / After」</span>
            を覗いてみる。
          </p>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-2 border-t border-white/12 pt-4 sm:gap-3">
          {CASES.map((c, i) => {
            const isActive = c.id === active;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => setActive(c.id)}
                aria-pressed={isActive}
                className={cn(
                  "group inline-flex items-baseline gap-2 rounded-sm border px-3 py-1.5 transition-all duration-200 sm:px-4 sm:py-2",
                  isActive
                    ? "border-windowLight bg-windowLight/10"
                    : "border-white/12 hover:border-white/35",
                )}
              >
                <span
                  className={cn(
                    "font-mono text-[9px] uppercase tracking-[0.2em]",
                    isActive ? "text-windowLight" : "text-white/35",
                  )}
                >
                  0{i + 1}
                </span>
                <span
                  className={cn(
                    "text-[13px] font-medium",
                    isActive ? "text-white" : "text-white/65",
                  )}
                >
                  {c.label}
                </span>
              </button>
            );
          })}
        </div>

        <ConstructionAccent halo="subtle" pad="none" className="mt-6">
        <div className="overflow-hidden rounded-md border border-white/14 bg-white/[0.03] backdrop-blur-sm">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="grid gap-10 p-8 md:p-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16"
            >
              <div>
                <p className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-windowLight/80">
                  {current.code}
                </p>
                <p className="mt-3 font-jp text-h2 font-bold leading-tight text-white">
                  {current.industry}
                </p>
                <div className="mt-6 inline-flex items-center gap-2 rounded-sm bg-sunsetPink/12 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-sunsetPink">
                  ▶ {current.metric}
                </div>
              </div>

              <div>
                <div>
                  <p className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-white/45">
                    A · Before — 導入前
                  </p>
                  <p className="mt-3 text-pretty text-body leading-relaxed text-white/70 [word-break:keep-all]">
                    {current.before}
                  </p>
                </div>
                <div
                  aria-hidden
                  className="my-7 h-px w-full bg-gradient-to-r from-transparent via-windowLight/30 to-transparent"
                />
                <div>
                  <p className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-sunsetPink">
                    B · After — 導入後
                  </p>
                  <p className="mt-3 text-pretty text-body leading-relaxed text-white/90 [word-break:keep-all]">
                    {current.after}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        </ConstructionAccent>
      </Container>
    </section>
  );
}
