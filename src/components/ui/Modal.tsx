"use client";
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  /** Accessible title shown in the corner of the modal */
  title?: string;
  /** Optional eyebrow above the title */
  eyebrow?: string;
  children: ReactNode;
  className?: string;
}

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Modal({
  open,
  onClose,
  title,
  eyebrow,
  children,
  className,
}: ModalProps) {
  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={title}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: EASE }}
        >
          {/* Backdrop */}
          <button
            type="button"
            aria-label="Close modal"
            onClick={onClose}
            className="absolute inset-0 bg-deepNight/80 backdrop-blur-md"
          />

          {/* Panel */}
          <motion.div
            className={cn(
              "relative z-10 w-full max-w-xl overflow-hidden rounded-md border border-white/14 bg-deepNight shadow-2xl",
              className,
            )}
            initial={{ scale: 0.96, y: 16, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.96, y: 16, opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
          >
            {/* corner glows for ORYZO continuity */}
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-[10vh] -left-[10vh] h-[40vh] w-[40vh] rounded-full bg-sunsetPink/15 blur-3xl"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -top-[6vh] -right-[6vh] h-[30vh] w-[30vh] rounded-full bg-windowLight/10 blur-3xl"
            />

            {/* Header bar */}
            <div className="relative z-10 flex items-start justify-between gap-4 border-b border-white/10 px-6 py-4 sm:px-8 sm:py-5">
              <div className="flex flex-col gap-1">
                {eyebrow && (
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-sunsetPink">
                    {eyebrow}
                  </span>
                )}
                {title && (
                  <h2 className="font-jp text-h3 font-bold leading-tight text-white">
                    {title}
                  </h2>
                )}
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="閉じる"
                className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-sm text-white/65 transition-colors hover:bg-white/10 hover:text-white"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden
                >
                  <path d="M6 6l12 12M6 18L18 6" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {/* Body (internal scroll if content is long) */}
            <div className="relative z-10 max-h-[calc(85svh-72px)] overflow-y-auto px-6 py-6 sm:px-8 sm:py-7">
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
