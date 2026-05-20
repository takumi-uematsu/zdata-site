"use client";
import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import Container from "@/components/ui/Container";
import ZBarSymbol from "@/components/ui/ZBarSymbol";
import HaloAndRipples from "@/components/ui/HaloAndRipples";
import NovaIntro from "@/components/ui/NovaIntro";
import Citystars from "@/components/ui/Citystars";
import LensFlare from "@/components/ui/LensFlare";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Hero — ORYZO-style scroll-pinned multi-scene experience.
 *
 *   Outer section is ~500vh tall. Inner sticky wrapper stays centered in the
 *   viewport. Scroll progress (0 → 1) drives every reveal — nothing animates
 *   on time-based mount delay (so scroll = animation, no scroll = static).
 *
 *   Scroll progress map (5 scenes blend into each other):
 *
 *     0.00 – 0.08  construction frame draws in (pathLength)
 *     0.05 – 0.15  Z-Data wordmark + eyebrow fades in (Scene 1)
 *     0.15 – 0.28  Z-Bar bars build up (opacity + scaleY)
 *     0.20 – 0.40  Scene 2 text: "ビジネスの脈動は、顧客の声から始まる" reveals
 *     0.36 – 0.42  Scene 2 → 3 crossfade
 *     0.42 – 0.60  Scene 3 text: 80% 声なき離脱 inserts
 *     0.58 – 0.64  Scene 3 → 4 crossfade
 *     0.64 – 0.80  Scene 4 text: VOICE / RHYTHM / ASSET pillars
 *     0.78 – 0.84  Scene 4 → 5 crossfade
 *     0.84 – 1.00  Scene 5: CTA + scroll to features cue
 *
 *   The Z-Bar centerpiece (with construction frame + halo) persists across
 *   scenes — only the surrounding text changes. Background corner glows
 *   slowly shift position with scroll, giving a sense of "scrolling through
 *   a single tableau" rather than stacking sections.
 */
export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // construction frame draw-in
  const frameDraw = useTransform(scrollYProgress, [0, 0.08], [0, 1]);
  const anchorScale = useTransform(scrollYProgress, [0.05, 0.12], [0, 1]);

  // Z-Bar materialize
  const barOpacity = useTransform(scrollYProgress, [0.05, 0.18], [0, 1]);
  const barScale = useTransform(scrollYProgress, [0.05, 0.18], [0.86, 1]);

  // Halo + ripples
  const haloOpacity = useTransform(scrollYProgress, [0.12, 0.26], [0, 1]);

  // Scene 1: JP tagline (was Scene 2)
  const scene1Opacity = useTransform(
    scrollYProgress,
    [0.10, 0.22, 0.32, 0.40],
    [0, 1, 1, 0],
  );
  const scene1Y = useTransform(scrollYProgress, [0.10, 0.22], [20, 0]);

  // Scene 2: 3 pillars (was Scene 3)
  const scene2Opacity = useTransform(
    scrollYProgress,
    [0.40, 0.50, 0.62, 0.70],
    [0, 1, 1, 0],
  );
  const scene2Y = useTransform(scrollYProgress, [0.40, 0.50], [20, 0]);

  // Scene 3: CTA (was Scene 4)
  const scene3Opacity = useTransform(
    scrollYProgress,
    [0.70, 0.82, 1.0],
    [0, 1, 1],
  );
  const scene3Y = useTransform(scrollYProgress, [0.70, 0.82], [20, 0]);

  // progress indicator on the right edge
  const progressScale = scrollYProgress;

  // scroll cue at start (fades out as user starts scrolling)
  const cueOpacity = useTransform(scrollYProgress, [0, 0.06], [1, 0]);

  // gentle background glow position shift (camera-like movement)
  const glowX = useTransform(scrollYProgress, [0, 1], ["-15vw", "20vw"]);
  const glowY = useTransform(scrollYProgress, [0, 1], ["20vh", "-10vh"]);

  return (
    <section
      ref={ref}
      id="hero"
      className="relative bg-deepNight"
      style={{ height: "500vh" }}
    >
      {/* Nova bloom — mount-time intro */}
      <NovaIntro />

      <div className="sticky top-0 flex h-[100svh] flex-col overflow-hidden">
        {/* shifting warm corner glow */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute bottom-0 left-0 h-[110vh] w-[110vh] rounded-full bg-sunsetPink/20 blur-3xl"
          style={{ x: glowX, y: glowY }}
        />
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -top-[10vh] -right-[12vw] h-[70vh] w-[70vh] rounded-full bg-windowLight/18 blur-3xl"
          animate={reduced ? {} : { opacity: [0.45, 1, 0.45] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* sunset horizon — bottom amber/pink wash */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[40vh]"
          style={{
            background:
              "linear-gradient(to top, rgba(255,138,180,0.18) 0%, rgba(255,216,158,0.06) 40%, transparent 100%)",
          }}
        />

        {/* lens flare drift */}
        <LensFlare />

        {/* sparkle starfield (citypop star dust) */}
        <Citystars count={55} />

        {/* dotted grid */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.7) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        {/* vignette — darker edges, brighter center for film feel */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 35%, rgba(10,21,71,0.45) 100%)",
          }}
        />

        {/* right-edge scroll progress bar */}
        <div className="pointer-events-none absolute right-5 top-1/2 z-20 h-40 w-px -translate-y-1/2 bg-white/12">
          <motion.div
            aria-hidden
            className="origin-top bg-sunsetPink shadow-[0_0_10px_currentColor]"
            style={{ scaleY: progressScale, transformOrigin: "top", height: "100%" }}
          />
        </div>

        <Container
          width="wide"
          className="relative z-10 flex flex-1 flex-col py-6 pt-10 lg:py-8 lg:pt-12"
        >
          {/* TOP corner labels (always visible) */}
          <div className="flex items-baseline justify-between gap-4 font-mono text-[11px] uppercase tracking-[0.24em]">
            <p className="text-windowLight">
              <span>Vol. 01</span>
              <span className="text-white/35"> · </span>
              <span className="text-white/80">Overture</span>
            </p>
            <p className="flex items-center gap-2 text-sunsetPink">
              <span
                aria-hidden
                className="inline-block h-1.5 w-1.5 animate-twinkle rounded-full bg-sunsetPink shadow-[0_0_10px_currentColor]"
              />
              <span>ZD-1</span>
              <span className="text-white/30">·</span>
              <span>Recording</span>
            </p>
          </div>

          {/* MAIN — stage for all scenes */}
          <div className="relative flex flex-1 flex-col items-center justify-start pt-[2vh] lg:pt-[3vh]">
            {/* === PERMANENT: Z-Data brand mark — always visible across all scenes === */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 1.8, ease: EASE }}
              className="flex flex-col items-center gap-2.5"
            >
              <span className="font-syne italic font-bold tracking-tight text-white text-[clamp(1.6rem,2.5vw+0.5rem,2.5rem)] leading-none">
                Z-Data
              </span>
              <div className="flex items-center gap-3">
                <span aria-hidden className="h-px w-8 bg-sunsetPink/70" />
                <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-sunsetPink">
                  Zero Party Data Platform
                </span>
                <span aria-hidden className="h-px w-8 bg-sunsetPink/70" />
              </div>
            </motion.div>

            {/* === Z-Bar centerpiece — persists across scenes === */}
            <div className="relative mx-auto w-full max-w-[340px] mt-6 lg:mt-8">
              <motion.div style={{ opacity: haloOpacity }}>
                <HaloAndRipples />
              </motion.div>
              <div
                className="relative mx-auto"
                style={{ aspectRatio: "100 / 56" }}
              >
                {/* city-pop sultry shimmer wrapper — slow languid drift */}
                <motion.div
                  className="absolute inset-0"
                  animate={
                    reduced
                      ? {}
                      : {
                          rotate: [-1.2, 1.2, -1.2],
                          scale: [0.978, 1.022, 0.978],
                          filter: [
                            "drop-shadow(0 0 28px rgba(255,138,180,0.5)) drop-shadow(0 0 60px rgba(255,216,158,0.25)) hue-rotate(0deg)",
                            "drop-shadow(0 0 70px rgba(255,216,158,0.7)) drop-shadow(0 0 110px rgba(255,138,180,0.35)) hue-rotate(-14deg)",
                            "drop-shadow(0 0 28px rgba(255,138,180,0.5)) drop-shadow(0 0 60px rgba(255,216,158,0.25)) hue-rotate(0deg)",
                          ],
                        }
                  }
                  transition={{
                    duration: 9,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <ConstructionFrameScrollDriven
                    frameProgress={frameDraw}
                    anchorScaleMV={anchorScale}
                  />
                  <motion.div
                    style={{ opacity: barOpacity, scale: barScale }}
                    className="absolute inset-0"
                  >
                    <ZBarSymbol
                      viewBox="0 12 100 56"
                      width={340}
                      height={190}
                      className="absolute inset-0 h-full w-full"
                      idSuffix="hero"
                    />
                  </motion.div>
                </motion.div>
              </div>
            </div>

            {/* === Scene texts (Z-Data wordmark is now permanent, above Z-Bar) === */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              {/* SCENE 1: JP tagline */}
              <motion.div
                style={{ opacity: scene1Opacity, y: scene1Y }}
                className="pointer-events-auto absolute bottom-[12%] flex max-w-2xl flex-col items-center gap-2 text-center px-6"
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-windowLight/85">
                  Track 01 ／ The Pulse
                </p>
                <p className="font-jp font-bold leading-[1.22] text-white text-[clamp(1.4rem,2.4vw+0.4rem,2rem)] [word-break:keep-all]">
                  ビジネスの脈動は、
                  <span className="text-sunsetPink">顧客の声</span>
                  から始まる。
                </p>
              </motion.div>

              {/* SCENE 2: 3 pillars */}
              <motion.div
                style={{ opacity: scene2Opacity, y: scene2Y }}
                className="pointer-events-auto absolute inset-x-0 bottom-[10%] mx-auto flex max-w-4xl flex-col items-center gap-5 text-center px-6"
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-windowLight/85">
                  Track 02 ／ The Method
                </p>
                <p className="font-jp font-bold leading-tight text-white text-[clamp(1.3rem,2.4vw+0.3rem,1.9rem)] [word-break:keep-all]">
                  ノイズではなく、<span className="text-windowBlue">波形</span>を。
                </p>
                <div className="mt-2 grid w-full max-w-2xl grid-cols-3 gap-3 sm:gap-6 font-syne italic font-bold text-[clamp(1.1rem,2vw+0.2rem,1.6rem)]">
                  <span className="text-windowBlue">Voice</span>
                  <span className="text-windowLight">Rhythm</span>
                  <span className="text-sunsetPink">Asset</span>
                </div>
              </motion.div>

              {/* SCENE 3: CTA */}
              <motion.div
                style={{ opacity: scene3Opacity, y: scene3Y }}
                className="pointer-events-auto absolute inset-x-0 bottom-[10%] mx-auto flex max-w-2xl flex-col items-center gap-5 text-center px-6"
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-windowLight/85">
                  Track 03 ／ Get the Pressing
                </p>
                <p className="font-jp font-bold leading-tight text-white text-[clamp(1.3rem,2.4vw+0.3rem,1.9rem)] [word-break:keep-all]">
                  Z-Data を、まず
                  <span className="text-sunsetPink">資料</span>
                  で知る。
                </p>
                <div className="mt-3 flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
                  <a
                    href="/#cta"
                    className="group inline-flex items-center gap-3 rounded-sm bg-sunsetPink px-7 py-3.5 text-[14px] font-medium text-deepNight shadow-glow-pink transition-all hover:brightness-110"
                  >
                    <span>サービス資料をダウンロード</span>
                    <span
                      aria-hidden
                      className="transition-transform group-hover:translate-x-0.5"
                    >
                      →
                    </span>
                  </a>
                  <a
                    href="/#about"
                    className="link-slide font-mono text-[11px] uppercase tracking-[0.18em] text-white/60 hover:text-white"
                  >
                    What is Z-Data ↓
                  </a>
                </div>
              </motion.div>

              {/* SCROLL CUE — initial only */}
              <motion.div
                style={{ opacity: cueOpacity }}
                className="pointer-events-none absolute bottom-[10%] flex flex-col items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-white/55"
              >
                <span>Scroll to construct</span>
                <span className="animate-bounce text-windowLight">↓</span>
              </motion.div>
            </div>
          </div>

          {/* BOTTOM corner labels (always visible) */}
          <div className="flex flex-wrap items-baseline justify-between gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-white/45">
            <span>© Genova Inc. — Tokyo</span>
            <span className="hidden md:inline text-white/65">
              8-band β gradient
              <span className="mx-2 text-white/30">·</span>
              3 scenes / scroll
            </span>
            <span className="text-sunsetPink/80">* Powered by 0PD</span>
          </div>
        </Container>
      </div>
    </section>
  );
}

/* ───────────────────────────────────────────────────────────── */

interface ScrollFrameProps {
  frameProgress: MotionValue<number>;
  anchorScaleMV: MotionValue<number>;
}

function ConstructionFrameScrollDriven({
  frameProgress,
  anchorScaleMV,
}: ScrollFrameProps) {
  const anchors: Array<[number, number]> = [
    [8, 14],
    [53, 14],
    [98, 14],
    [8, 40.5],
    [98, 40.5],
    [8, 67],
    [53, 67],
    [98, 67],
  ];
  const ticks = [17, 28, 39, 50, 61, 72, 83, 93.5];

  return (
    <svg
      viewBox="0 12 100 56"
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden
    >
      {/* horizontal crosshair */}
      <motion.line
        x1="0"
        y1="40.5"
        x2="100"
        y2="40.5"
        stroke="rgba(255,138,180,0.32)"
        strokeWidth="0.2"
        strokeDasharray="0.6 0.45"
        vectorEffect="non-scaling-stroke"
        style={{ pathLength: frameProgress, opacity: frameProgress }}
      />
      {/* vertical crosshair */}
      <motion.line
        x1="53"
        y1="12"
        x2="53"
        y2="68"
        stroke="rgba(255,138,180,0.32)"
        strokeWidth="0.2"
        strokeDasharray="0.6 0.45"
        vectorEffect="non-scaling-stroke"
        style={{ pathLength: frameProgress, opacity: frameProgress }}
      />
      {/* dashed bounding rect */}
      <motion.rect
        x="8"
        y="14"
        width="90"
        height="53"
        fill="none"
        stroke="rgba(255,138,180,0.6)"
        strokeWidth="0.24"
        strokeDasharray="1 0.6"
        vectorEffect="non-scaling-stroke"
        style={{ pathLength: frameProgress, opacity: frameProgress }}
      />
      {/* reference ellipse */}
      <motion.ellipse
        cx="53"
        cy="40.5"
        rx="49"
        ry="30"
        fill="none"
        stroke="rgba(255,216,158,0.28)"
        strokeWidth="0.2"
        strokeDasharray="0.8 0.5"
        vectorEffect="non-scaling-stroke"
        style={{ pathLength: frameProgress, opacity: frameProgress }}
      />
      {/* 8 anchor squares */}
      {anchors.map(([x, y], i) => (
        <motion.rect
          key={i}
          x={x - 0.9}
          y={y - 0.9}
          width="1.8"
          height="1.8"
          fill="#FF8AB4"
          style={{
            scale: anchorScaleMV,
            transformOrigin: "center",
            transformBox: "fill-box",
          }}
        />
      ))}
      {/* ruler ticks */}
      {ticks.map((x, i) => (
        <g key={`tick-${i}`}>
          <motion.line
            x1={x}
            y1="14"
            x2={x}
            y2="15.6"
            stroke="rgba(255,138,180,0.55)"
            strokeWidth="0.2"
            vectorEffect="non-scaling-stroke"
            style={{ pathLength: frameProgress, opacity: frameProgress }}
          />
          <motion.line
            x1={x}
            y1="65.4"
            x2={x}
            y2="67"
            stroke="rgba(255,138,180,0.55)"
            strokeWidth="0.2"
            vectorEffect="non-scaling-stroke"
            style={{ pathLength: frameProgress, opacity: frameProgress }}
          />
        </g>
      ))}
    </svg>
  );
}
