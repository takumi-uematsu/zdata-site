"use client";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Aura around the Z-Bar — combines:
 *
 *   1. A breathing radial glow (sunsetPink → transparent), behind the bars,
 *      opacity 0.4 ↔ 1 over 5.5s. "AI emanating warmth."
 *   2. Concentric ripple waves emanating outward from the centre. Three
 *      offset rings, each grows 40px → 720px and fades over 5s. New ring
 *      starts every ~1.7s so there's always one in flight.
 *
 * Plays only after the Z-Bar entry sequence completes (delay ≈ 2.6s) so the
 * blueprint draws in first, then the aura switches on.
 */
export default function HaloAndRipples() {
  const reduced = useReducedMotion();

  return (
    <>
      {/* breathing radial halo — citypop multi-layer color */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -inset-40 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(255,138,180,0.55) 0%, rgba(255,216,158,0.32) 22%, rgba(143,184,232,0.18) 45%, rgba(255,138,180,0) 65%)",
          mixBlendMode: "screen",
        }}
        initial={{ opacity: 0, scale: 0.82 }}
        animate={
          reduced
            ? { opacity: 0.5, scale: 1 }
            : {
                opacity: [0.4, 1, 0.4],
                scale: [0.9, 1.12, 0.9],
              }
        }
        transition={{
          opacity: { duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 },
          scale: { duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 },
        }}
      />

      {/* inner core glow — denser amber */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -inset-16 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(255,216,158,0.35) 0%, rgba(255,138,180,0.18) 35%, transparent 65%)",
          mixBlendMode: "screen",
        }}
        animate={
          reduced
            ? {}
            : {
                opacity: [0.6, 1, 0.6],
              }
        }
        transition={{
          duration: 4.2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2.0,
        }}
      />

      {/* concentric ripple waves */}
      {!reduced && [0, 1, 2].map((i) => (
        <motion.div
          key={i}
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 rounded-full border border-sunsetPink/55"
          style={{ width: 40, height: 40, x: "-50%", y: "-50%" }}
          initial={{ width: 40, height: 40, opacity: 0 }}
          animate={{
            width: [40, 720],
            height: [40, 720],
            opacity: [0, 0.45, 0],
            borderWidth: ["2px", "0.5px"],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: 1.7 + i * 1.2,
            ease: "easeOut",
            times: [0, 0.25, 1],
          }}
        />
      ))}
    </>
  );
}
