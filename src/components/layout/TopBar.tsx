import Container from "@/components/ui/Container";

/**
 * Editorial pre-header strip. Establishes "Vol. 01 / 2026 / by Genova" identity
 * in monospace before the main header begins. Verge-style thin top rule.
 */
export default function TopBar() {
  return (
    <div className="relative z-40 border-b border-white/12 bg-onyx text-white">
      <Container
        width="wide"
        className="flex h-9 items-center justify-between font-mono text-[10px] uppercase tracking-[0.24em]"
      >
        <span className="text-white/75">
          Vol. 01{" "}
          <span className="text-white/30">·</span> 2026{" "}
          <span className="text-white/30">·</span> by Genova
        </span>
        <span className="hidden items-center gap-2 text-windowLight/80 sm:inline-flex">
          <span
            aria-hidden
            className="inline-block h-1.5 w-1.5 animate-twinkle rounded-full bg-windowLight"
          />
          Recording 0PD signal
        </span>
      </Container>
    </div>
  );
}
