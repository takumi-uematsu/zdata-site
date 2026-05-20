"use client";
import { useMemo } from "react";
import { cn } from "@/lib/cn";

interface CitylightsProps {
  /** number of dots */
  count?: number;
  className?: string;
  /** opacity ceiling for dots */
  intensity?: number;
}

interface Dot {
  x: number;
  y: number;
  delay: number;
  dur: number;
  size: number;
  hue: "windowLight" | "windowBlue" | "sunsetPink";
}

function seeded(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

export default function Citylights({
  count = 90,
  className,
  intensity = 0.85,
}: CitylightsProps) {
  const dots = useMemo<Dot[]>(() => {
    const rand = seeded(20260514);
    const result: Dot[] = [];
    for (let i = 0; i < count; i++) {
      const hueRoll = rand();
      result.push({
        x: rand() * 100,
        y: rand() * 100,
        delay: rand() * 5,
        dur: 3.2 + rand() * 3.6,
        size: rand() < 0.85 ? 2 : 3,
        hue:
          hueRoll < 0.7
            ? "windowLight"
            : hueRoll < 0.92
              ? "windowBlue"
              : "sunsetPink",
      });
    }
    return result;
  }, [count]);

  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      style={{ opacity: intensity }}
    >
      {dots.map((d, i) => {
        const color =
          d.hue === "windowLight"
            ? "#FFD89E"
            : d.hue === "windowBlue"
              ? "#8FB8E8"
              : "#FF8AB4";
        return (
          <span
            key={i}
            className="absolute rounded-full animate-twinkle"
            style={{
              left: `${d.x}%`,
              top: `${d.y}%`,
              width: d.size,
              height: d.size,
              backgroundColor: color,
              boxShadow: `0 0 ${d.size * 3}px ${color}`,
              animationDelay: `${d.delay}s`,
              animationDuration: `${d.dur}s`,
            }}
          />
        );
      })}
    </div>
  );
}
