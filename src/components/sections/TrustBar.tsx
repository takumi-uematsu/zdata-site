import Container from "@/components/ui/Container";

const TARGETS = [
  "Consulting",
  "Vertical SaaS",
  "Manufacturing",
  "Professional Services",
  "Financial",
  "Media",
];

/**
 * Industry strip — ORYZO-style minimal label band.
 * Replaces real customer logos until beta clients sign on.
 */
export default function TrustBar() {
  return (
    <section
      aria-label="想定する業種"
      className="relative isolate border-y border-white/8 bg-onyx"
    >
      <Container
        width="wide"
        className="flex flex-col items-center gap-3 py-6 md:flex-row md:justify-between md:gap-10 md:py-5"
      >
        <p className="shrink-0 font-mono text-[10px] uppercase tracking-[0.28em] text-windowLight/85">
          Built for
        </p>
        <ul
          className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-sans text-[13px] font-medium tracking-tight text-white/65 md:gap-x-8"
          role="list"
        >
          {TARGETS.map((label, i) => (
            <li key={label} className="flex items-center gap-6 whitespace-nowrap">
              {label}
              {i < TARGETS.length - 1 && (
                <span
                  aria-hidden
                  className="hidden h-1 w-1 rounded-full bg-white/15 md:inline-block"
                />
              )}
            </li>
          ))}
        </ul>
        <p className="shrink-0 font-mono text-[10px] uppercase tracking-[0.24em] text-white/35">
          Beta · H1 2026
        </p>
      </Container>
    </section>
  );
}
