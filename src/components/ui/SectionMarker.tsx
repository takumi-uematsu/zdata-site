import { cn } from "@/lib/cn";

interface SectionMarkerProps {
  /** track number, 01–10 */
  track: string;
  /** total tracks (default 10 for the LP) */
  total?: number;
  /** editorial English title */
  title: string;
  /** optional Japanese gloss */
  subtitle?: string;
  className?: string;
  tone?: "dark" | "light";
}

/**
 * Editorial section marker — sets a stable rhythm at the top of every section.
 * Modelled after a recording engineer's slate ("Pulse 03 / 10 — The Silent Exit").
 */
export default function SectionMarker({
  track,
  total = 10,
  title,
  subtitle,
  className,
  tone = "dark",
}: SectionMarkerProps) {
  const dark = tone === "dark";
  return (
    <div
      className={cn(
        "border-t pt-5",
        dark ? "border-white/20" : "border-charcoal/20",
        className,
      )}
    >
      <p
        className={cn(
          "flex flex-wrap items-baseline gap-x-3 gap-y-1 font-mono text-[11px] uppercase tracking-[0.24em]",
          dark ? "text-white/75" : "text-charcoal/70",
        )}
      >
        <span className={dark ? "text-windowLight" : "text-niteflyte"}>
          Pulse {track}
        </span>
        <span className={dark ? "text-white/30" : "text-charcoal/30"}>
          / {total}
        </span>
        <span className={dark ? "text-white/30" : "text-charcoal/30"}>
          —
        </span>
        <span className={dark ? "text-white" : "text-charcoal"}>{title}</span>
        {subtitle && (
          <span
            className={cn(
              "ml-1 font-jp normal-case tracking-normal text-[12px]",
              dark ? "text-white/55" : "text-charcoal/60",
            )}
          >
            （{subtitle}）
          </span>
        )}
      </p>
    </div>
  );
}
