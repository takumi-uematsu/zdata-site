"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";

interface KineticWordProps {
  words: string[];
  /** ms between word swaps */
  interval?: number;
  /** classes applied to the visible word (the ghost stays invisible) */
  className?: string;
}

/**
 * Word that cycles through a list with a vertical mask + blur transition.
 * A hidden "ghost" of the longest word reserves layout width so surrounding
 * text doesn't reflow as the cycle advances. Respects reduced-motion.
 */
export default function KineticWord({
  words,
  interval = 2400,
  className,
}: KineticWordProps) {
  const reduced = useReducedMotion();
  const [i, setI] = useState(0);

  useEffect(() => {
    if (reduced || words.length <= 1) return;
    const t = window.setInterval(() => {
      setI((x) => (x + 1) % words.length);
    }, interval);
    return () => window.clearInterval(t);
  }, [words.length, interval, reduced]);

  const longest = words.reduce((a, b) => (a.length >= b.length ? a : b));

  return (
    <span
      className={cn(
        "relative inline-flex items-baseline justify-start align-baseline",
        className,
      )}
    >
      {/* invisible width spacer — longest word locks layout */}
      <span aria-hidden className="invisible whitespace-nowrap">
        {longest}
      </span>
      {/* underline accent bar */}
      <span
        aria-hidden
        className="absolute -bottom-1 left-0 h-[3px] w-full origin-left bg-windowLight/35"
      />
      <span className="absolute inset-0 overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={words[i]}
            initial={
              reduced
                ? { opacity: 0 }
                : { y: "55%", opacity: 0, filter: "blur(8px)" }
            }
            animate={
              reduced
                ? { opacity: 1 }
                : { y: 0, opacity: 1, filter: "blur(0px)" }
            }
            exit={
              reduced
                ? { opacity: 0 }
                : { y: "-55%", opacity: 0, filter: "blur(8px)" }
            }
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 whitespace-nowrap leading-none"
          >
            {words[i]}
          </motion.span>
        </AnimatePresence>
      </span>
      <span className="sr-only" aria-live="polite">
        {words[i]}
      </span>
    </span>
  );
}
