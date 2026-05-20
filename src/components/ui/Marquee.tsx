"use client";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

interface MarqueeProps {
  children: ReactNode;
  /** seconds for one full loop */
  duration?: number;
  className?: string;
  reverse?: boolean;
}

/**
 * Seamless horizontal marquee. Duplicates the children once for the loop and
 * translates -50% over `duration` seconds. Respects reduced-motion (snaps to
 * a static row).
 */
export default function Marquee({
  children,
  duration = 35,
  className,
  reverse = false,
}: MarqueeProps) {
  const reduced = useReducedMotion();
  return (
    <div className={cn("relative overflow-hidden", className)}>
      {reduced ? (
        <div className="flex">{children}</div>
      ) : (
        <motion.div
          className="flex w-max"
          animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
          transition={{ duration, repeat: Infinity, ease: "linear" }}
        >
          <div className="flex shrink-0">{children}</div>
          <div aria-hidden className="flex shrink-0">
            {children}
          </div>
        </motion.div>
      )}
    </div>
  );
}
