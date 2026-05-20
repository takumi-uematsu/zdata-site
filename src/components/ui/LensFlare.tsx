"use client";
import { motion, useReducedMotion } from "framer-motion";

/**
 * A soft amber/pink lens flare circle that drifts diagonally across the
 * viewport very slowly. Multiple flares with different speeds and tints,
 * additive blend mode. Subtle but adds a sensual, languid city-pop drift.
 */
export default function LensFlare() {
  const reduced = useReducedMotion();
  if (reduced) return null;

  return (
    <>
      {/* large warm amber flare drifting bottom-left → top-right */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute h-[55vh] w-[55vh] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(255,216,158,0.22) 0%, rgba(255,138,180,0.10) 35%, transparent 70%)",
          mixBlendMode: "screen",
          filter: "blur(8px)",
        }}
        initial={{ x: "-15vw", y: "85vh" }}
        animate={{
          x: ["-15vw", "70vw"],
          y: ["85vh", "-15vh"],
        }}
        transition={{
          duration: 32,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* second smaller pink flare drifting opposite */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute h-[35vh] w-[35vh] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(255,138,180,0.20) 0%, rgba(143,184,232,0.08) 40%, transparent 70%)",
          mixBlendMode: "screen",
          filter: "blur(6px)",
        }}
        initial={{ x: "85vw", y: "20vh" }}
        animate={{
          x: ["85vw", "-10vw"],
          y: ["20vh", "90vh"],
        }}
        transition={{
          duration: 38,
          repeat: Infinity,
          ease: "linear",
          delay: 4,
        }}
      />

      {/* tiny accent flare */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute h-[18vh] w-[18vh] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(255,216,158,0.30) 0%, transparent 65%)",
          mixBlendMode: "screen",
          filter: "blur(4px)",
        }}
        initial={{ x: "30vw", y: "-10vh" }}
        animate={{
          x: ["30vw", "80vw"],
          y: ["-10vh", "100vh"],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "linear",
          delay: 8,
        }}
      />
    </>
  );
}
