"use client";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";

/**
 * Z-Bar — the brand symbol, animated.
 *
 *   Entry phase: each bar grows from height 0 with stagger ripping from the
 *   centre (bar idx 3 / tallest) outward to both ends — the wave radiates.
 *
 *   Loop phase: each bar oscillates around its rest height. Delay pattern is
 *   the same centre-outward ripple, so a wave travels through the bars every
 *   cycle (~5 s) like an equalizer reading a sound that emanates from the
 *   middle.
 */

const BARS = [
  { x: 13, w: 8, baseY: 48, h: 17, amp: 0.22, rippleDelay: 0.85 },
  { x: 24, w: 8, baseY: 38, h: 27, amp: 0.18, rippleDelay: 0.6 },
  { x: 35, w: 8, baseY: 28, h: 37, amp: 0.14, rippleDelay: 0.3 },
  { x: 46, w: 8, baseY: 18, h: 47, amp: 0.1, rippleDelay: 0.0 },
  { x: 57, w: 8, baseY: 30, h: 35, amp: 0.13, rippleDelay: 0.2 },
  { x: 68, w: 8, baseY: 42, h: 23, amp: 0.2, rippleDelay: 0.5 },
  { x: 79, w: 8, baseY: 35, h: 30, amp: 0.16, rippleDelay: 0.75 },
  { x: 90, w: 7, baseY: 50, h: 15, amp: 0.26, rippleDelay: 1.0 },
];

const BOTTOM = 65;
const EASE_OUT = [0.16, 1, 0.3, 1] as const;

interface ZBarSymbolProps {
  className?: string;
  size?: number;
  width?: number;
  height?: number;
  viewBox?: string;
  paused?: boolean;
  animateEntry?: boolean;
  entryDelay?: number;
  idSuffix?: string;
}

export default function ZBarSymbol({
  className,
  size = 240,
  width,
  height,
  viewBox = "0 0 100 100",
  paused = false,
  animateEntry = false,
  entryDelay = 0,
  idSuffix = "live",
}: ZBarSymbolProps) {
  const reduced = useReducedMotion();
  const isStatic = paused || reduced;
  const [entered, setEntered] = useState(!animateEntry || isStatic);
  const gradId = `zbar-${idSuffix}`;

  const w = width ?? size;
  const h = height ?? size;

  useEffect(() => {
    if (!animateEntry || isStatic) return;
    // entry plays ripples from centre outward; longest delay is rippleDelay=1.0
    // then bar duration 0.75s. Total ≈ 1.75s + entryDelay.
    const t = window.setTimeout(
      () => setEntered(true),
      Math.round((entryDelay + 1.0 + 0.8) * 1000),
    );
    return () => window.clearTimeout(t);
  }, [animateEntry, isStatic, entryDelay]);

  return (
    <svg
      viewBox={viewBox}
      width={w}
      height={h}
      preserveAspectRatio="xMidYMax meet"
      className={cn("inline-block select-none", className)}
      aria-hidden
    >
      <defs>
        <linearGradient id={gradId} x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#FF8AB4" />
          <stop offset="50%" stopColor="#1B3A7A" />
          <stop offset="100%" stopColor="#4A7BC7" />
        </linearGradient>
      </defs>
      {BARS.map((b, i) => {
        if (isStatic) {
          return (
            <rect
              key={i}
              x={b.x}
              y={b.baseY}
              width={b.w}
              height={b.h}
              rx={1}
              fill={`url(#${gradId})`}
            />
          );
        }
        if (!entered) {
          // entry phase — grow from zero, ripple from centre outward
          return (
            <motion.rect
              key={`entry-${i}`}
              x={b.x}
              width={b.w}
              rx={1}
              fill={`url(#${gradId})`}
              initial={{ y: BOTTOM, height: 0 }}
              animate={{ y: b.baseY, height: b.h }}
              transition={{
                duration: 0.7,
                ease: EASE_OUT,
                delay: entryDelay + b.rippleDelay,
              }}
            />
          );
        }
        // loop phase — oscillate, also centre-outward
        const peakH = b.h * (1 + b.amp);
        const troughH = b.h * (1 - b.amp * 0.55);
        const dur = 5.0;
        return (
          <motion.rect
            key={`loop-${i}`}
            x={b.x}
            width={b.w}
            rx={1}
            fill={`url(#${gradId})`}
            initial={{ y: b.baseY, height: b.h }}
            animate={{
              y: [
                b.baseY,
                BOTTOM - peakH,
                b.baseY,
                BOTTOM - troughH,
                b.baseY,
              ],
              height: [b.h, peakH, b.h, troughH, b.h],
            }}
            transition={{
              duration: dur,
              repeat: Infinity,
              ease: "easeInOut",
              delay: b.rippleDelay,
              times: [0, 0.22, 0.5, 0.72, 1],
            }}
          />
        );
      })}
    </svg>
  );
}
