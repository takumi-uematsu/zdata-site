"use client";
import { motion } from "framer-motion";

const EASE_OUT = [0.16, 1, 0.3, 1] as const;
const BOUNCE = [0.34, 1.56, 0.64, 1] as const;

/**
 * Construction overlay with an ORYZO-style draw-in loading sequence.
 *
 *   0.20s → horizontal crosshair draws
 *   0.40s → vertical crosshair draws
 *   0.55s → dashed bounding rect draws
 *   0.95s → reference ellipse draws
 *   1.60s → 8 anchor squares pop in (bounce, stagger 0.06s)
 *   2.00s → 16 ruler ticks pop in (stagger 0.04s)
 *
 * After all elements are drawn, they stay visible — the Z-Bar lives on the
 * artboard, not "completed."
 */
export default function ConstructionFrameAnimated() {
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
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{
          pathLength: { duration: 0.9, delay: 0.1, ease: EASE_OUT },
          opacity: { duration: 0.25, delay: 0.1 },
        }}
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
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{
          pathLength: { duration: 0.85, delay: 0.25, ease: EASE_OUT },
          opacity: { duration: 0.25, delay: 0.25 },
        }}
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
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{
          pathLength: { duration: 1.0, delay: 0.35, ease: EASE_OUT },
          opacity: { duration: 0.25, delay: 0.35 },
        }}
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
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{
          pathLength: { duration: 1.1, delay: 0.55, ease: EASE_OUT },
          opacity: { duration: 0.25, delay: 0.55 },
        }}
      />
      {/* 8 anchor squares — pop in with bounce */}
      {anchors.map(([x, y], i) => (
        <motion.rect
          key={i}
          x={x - 0.75}
          y={y - 0.75}
          width="1.5"
          height="1.5"
          fill="#FF8AB4"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            duration: 0.4,
            delay: 0.9 + i * 0.05,
            ease: BOUNCE,
          }}
          style={{
            transformOrigin: `${x}px ${y}px`,
            transformBox: "fill-box",
          }}
        />
      ))}
      {/* ruler ticks (top + bottom of each bar) */}
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
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{
              pathLength: { duration: 0.3, delay: 1.25 + i * 0.04 },
              opacity: { duration: 0.18, delay: 1.25 + i * 0.04 },
            }}
          />
          <motion.line
            x1={x}
            y1="65.4"
            x2={x}
            y2="67"
            stroke="rgba(255,138,180,0.55)"
            strokeWidth="0.2"
            vectorEffect="non-scaling-stroke"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{
              pathLength: { duration: 0.3, delay: 1.25 + i * 0.04 },
              opacity: { duration: 0.18, delay: 1.25 + i * 0.04 },
            }}
          />
        </g>
      ))}
    </svg>
  );
}
