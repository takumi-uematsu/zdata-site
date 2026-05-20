"use client";
import { useMemo } from "react";

/**
 * Sparkle starfield — citypop star dust scattered across the Hero. Each star
 * twinkles on its own slow phase (3-7s). Sizes vary slightly for parallax-like
 * depth. Seeded random so SSR + client render the same dots.
 */

function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

interface CitystarsProps {
  count?: number;
  /** seed for deterministic positions */
  seed?: number;
}

export default function Citystars({ count = 55, seed = 7777 }: CitystarsProps) {
  const stars = useMemo(() => {
    const rand = seeded(seed);
    return Array.from({ length: count }, () => {
      const hueRoll = rand();
      return {
        x: rand() * 100,
        y: rand() * 100,
        size: 1 + rand() * 1.6,
        delay: rand() * 6,
        duration: 3 + rand() * 4,
        hue:
          hueRoll < 0.70 ? "amber" : hueRoll < 0.92 ? "windowBlue" : "sunsetPink",
      };
    });
  }, [count, seed]);

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {stars.map((s, i) => {
        const color =
          s.hue === "amber"
            ? "#FFD89E"
            : s.hue === "windowBlue"
              ? "#8FB8E8"
              : "#FF8AB4";
        return (
          <span
            key={i}
            className="absolute rounded-full animate-twinkle"
            style={{
              left: `${s.x}%`,
              top: `${s.y}%`,
              width: `${s.size}px`,
              height: `${s.size}px`,
              backgroundColor: color,
              boxShadow: `0 0 ${s.size * 4}px ${color}`,
              animationDelay: `${s.delay}s`,
              animationDuration: `${s.duration}s`,
            }}
          />
        );
      })}
    </div>
  );
}
