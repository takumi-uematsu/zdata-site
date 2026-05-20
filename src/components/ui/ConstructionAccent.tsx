"use client";
import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * ConstructionAccent — the Hero's "ORYZO blueprint" treatment, reusable
 * around any focal visual in any section.
 *
 *   • dashed bounding rect draws in on scroll-into-view
 *   • 8 sunsetPink anchor squares pop in with bounce (corners + midpoints)
 *   • optional breathing halo glow behind the content
 *   • optional concentric ripple waves emanating from centre
 *   • optional city-pop shimmer (rotate + hue + drop-shadow)
 *
 * All animations respect prefers-reduced-motion.
 */

interface ConstructionAccentProps {
  children: ReactNode;
  className?: string;
  /** halo glow intensity behind content */
  halo?: "none" | "subtle" | "strong";
  /** concentric ripple waves emanating from centre (use sparingly) */
  ripples?: boolean;
  /** city-pop sultry shimmer */
  shimmer?: boolean;
  /** padding inside the frame */
  pad?: "none" | "tight" | "default" | "loose";
  /** lighter accent: less aggressive anchor visibility, useful for many in a row */
  subtle?: boolean;
}

const EASE_OUT = [0.16, 1, 0.3, 1] as const;
const BOUNCE = [0.34, 1.56, 0.64, 1] as const;

const padMap = {
  none: "",
  tight: "p-3 md:p-4",
  default: "p-5 md:p-7",
  loose: "p-8 md:p-12",
};

const ANCHORS = [
  "top-0 left-0 -translate-x-1/2 -translate-y-1/2",
  "top-0 left-1/2 -translate-x-1/2 -translate-y-1/2",
  "top-0 right-0 translate-x-1/2 -translate-y-1/2",
  "top-1/2 left-0 -translate-x-1/2 -translate-y-1/2",
  "top-1/2 right-0 translate-x-1/2 -translate-y-1/2",
  "bottom-0 left-0 -translate-x-1/2 translate-y-1/2",
  "bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2",
  "bottom-0 right-0 translate-x-1/2 translate-y-1/2",
];

export default function ConstructionAccent({
  children,
  className,
  halo = "subtle",
  ripples = false,
  shimmer = false,
  pad = "default",
  subtle = false,
}: ConstructionAccentProps) {
  const reduced = useReducedMotion();
  const anchorSize = subtle ? "h-1.5 w-1.5" : "h-2 w-2";
  const anchorOpacity = subtle ? "bg-sunsetPink/75" : "bg-sunsetPink";
  const borderOpacity = subtle ? "border-sunsetPink/22" : "border-sunsetPink/35";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.9, ease: EASE_OUT }}
      className={cn("relative", padMap[pad], className)}
    >
      {/* halo glow */}
      {halo !== "none" && (
        <motion.div
          aria-hidden
          className={cn(
            "pointer-events-none absolute rounded-full",
            halo === "strong" ? "-inset-16" : "-inset-8",
          )}
          style={{
            background:
              halo === "strong"
                ? "radial-gradient(circle, rgba(255,138,180,0.22) 0%, rgba(255,216,158,0.12) 28%, rgba(255,138,180,0) 60%)"
                : "radial-gradient(circle, rgba(255,138,180,0.12) 0%, rgba(255,138,180,0) 60%)",
            mixBlendMode: "screen",
          }}
          animate={
            reduced
              ? { opacity: 0.5 }
              : { opacity: [0.4, 0.9, 0.4], scale: [0.95, 1.05, 0.95] }
          }
          transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
        />
      )}

      {/* ripple waves */}
      {ripples &&
        !reduced &&
        [0, 1].map((i) => (
          <motion.div
            key={i}
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 rounded-full border border-sunsetPink/40"
            style={{ width: 40, height: 40, x: "-50%", y: "-50%" }}
            initial={{ width: 40, height: 40, opacity: 0 }}
            animate={{
              width: [40, 500],
              height: [40, 500],
              opacity: [0, 0.4, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              delay: 1 + i * 2,
              ease: "easeOut",
            }}
          />
        ))}

      {/* dashed bounding rect */}
      <motion.div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 rounded-sm border border-dashed",
          borderOpacity,
        )}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, delay: 0.2, ease: EASE_OUT }}
      />

      {/* 8 anchor squares — corners + midpoints */}
      {ANCHORS.map((pos, i) => (
        <motion.span
          key={i}
          aria-hidden
          className={cn(
            "pointer-events-none absolute rounded-[1px]",
            anchorSize,
            anchorOpacity,
            pos,
          )}
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: 0.4,
            delay: 0.5 + i * 0.05,
            ease: BOUNCE,
          }}
        />
      ))}

      {/* content */}
      {shimmer ? (
        <motion.div
          className="relative z-10"
          animate={
            reduced
              ? {}
              : {
                  rotate: [-0.25, 0.25, -0.25],
                  filter: [
                    "drop-shadow(0 0 10px rgba(255,138,180,0.25)) hue-rotate(0deg)",
                    "drop-shadow(0 0 24px rgba(255,216,158,0.35)) hue-rotate(-4deg)",
                    "drop-shadow(0 0 10px rgba(255,138,180,0.25)) hue-rotate(0deg)",
                  ],
                }
          }
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        >
          {children}
        </motion.div>
      ) : (
        <div className="relative z-10">{children}</div>
      )}
    </motion.div>
  );
}
