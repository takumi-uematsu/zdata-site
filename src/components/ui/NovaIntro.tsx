"use client";
import { motion } from "framer-motion";

/**
 * Mount-time "nova bloom" — a single warm amber/pink glow expands from the
 * centre of the viewport and fades out, revealing the Hero behind. 2 second
 * one-shot. Inspired by city-pop sunset / nova birth.
 *
 *   t = 0.0s   black backdrop covers viewport
 *   t = 0.0s   tiny bright spot appears at centre
 *   t = 0.4s   spot has expanded to a soft amber bloom
 *   t = 1.2s   bloom is at full size, opacity peak
 *   t = 2.0s   backdrop + bloom fade away completely; Hero is fully visible
 */
export default function NovaIntro() {
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-50 overflow-hidden"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.9, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
      style={{ willChange: "opacity" }}
    >
      {/* Solid black backdrop that fades earlier than the bloom */}
      <motion.div
        className="absolute inset-0 bg-deepNight"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 1.3, delay: 0.4, ease: "easeOut" }}
      />

      {/* Nova bloom — expanding warm radial glow */}
      <motion.div
        className="absolute left-1/2 top-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(255,216,158,0.95) 0%, rgba(255,138,180,0.7) 18%, rgba(255,138,180,0.3) 38%, rgba(74,123,199,0.12) 60%, transparent 80%)",
          mixBlendMode: "screen",
          translateX: "-50%",
          translateY: "-50%",
        }}
        initial={{ width: 20, height: 20, opacity: 0 }}
        animate={{
          width: ["20px", "60vw", "200vh"],
          height: ["20px", "60vw", "200vh"],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 2.2,
          times: [0, 0.45, 1],
          ease: [0.16, 1, 0.3, 1],
        }}
      />

      {/* Secondary inner glow — denser pink core */}
      <motion.div
        className="absolute left-1/2 top-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(255,138,180,0.9) 0%, rgba(255,216,158,0.3) 35%, transparent 70%)",
          mixBlendMode: "screen",
          translateX: "-50%",
          translateY: "-50%",
        }}
        initial={{ width: 10, height: 10, opacity: 0 }}
        animate={{
          width: ["10px", "20vw", "80vh"],
          height: ["10px", "20vw", "80vh"],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 1.8,
          delay: 0.05,
          times: [0, 0.4, 1],
          ease: [0.16, 1, 0.3, 1],
        }}
      />
    </motion.div>
  );
}
