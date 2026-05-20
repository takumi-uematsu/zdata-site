import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

interface MockChromeProps {
  title: string;
  subtitle?: string;
  ribbon?: string;
  children: ReactNode;
  className?: string;
  /** main mock background tone */
  tone?: "light" | "dark" | "tinted";
}

/**
 * Realistic browser-window chrome used by all product mockups so the visuals
 * read as actual screenshots rather than generic SaaS placeholders.
 */
export default function MockChrome({
  title,
  subtitle,
  ribbon,
  children,
  className,
  tone = "light",
}: MockChromeProps) {
  const toneCls = {
    light: "bg-[#F5F4EF] text-[#1a1a1a]",
    dark: "bg-[#0E1230] text-white",
    tinted: "bg-[#1A2752] text-white",
  }[tone];

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-md border border-white/14 shadow-card",
        className,
      )}
    >
      {/* title bar */}
      <div className="flex items-center gap-3 border-b border-black/8 bg-[#1a1a1a] px-3.5 py-2.5">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
        </div>
        <div className="flex flex-1 items-center justify-center gap-3">
          <p className="font-mono text-[10.5px] tracking-[0.14em] text-white/80">
            <span className="text-windowLight">z-data.app</span>
            <span className="ml-2 text-white/40">/</span>
            <span className="ml-2 text-white">{title}</span>
            {subtitle && (
              <span className="ml-2 text-white/45">— {subtitle}</span>
            )}
          </p>
        </div>
        {ribbon ? (
          <span className="rounded-sm border border-windowLight/40 bg-windowLight/12 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.18em] text-windowLight">
            {ribbon}
          </span>
        ) : (
          <span className="w-12" />
        )}
      </div>
      <div className={cn("relative aspect-[5/4]", toneCls)}>{children}</div>
    </div>
  );
}
