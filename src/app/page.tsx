import TopBar from "@/components/layout/TopBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Features from "@/components/sections/Features";
import Pricing from "@/components/sections/Pricing";
import CTA from "@/components/sections/CTA";

/**
 * Z-Data home page — ORYZO-inspired layout.
 *
 *   • Hero: BIG scroll-pinned scene (~500vh) that walks the visitor through
 *     5 scenes inside a single sticky tableau (brand intro → tagline → 80%
 *     impact → 3-pillar method → CTA). The Z-Bar centerpiece persists across
 *     scenes; only the surrounding text changes via scroll progress.
 *
 *   • Features: 5 product mockups with construction-accent treatment.
 *
 *   • Pricing: 4 plans + spec sheet.
 *
 *   • CTA: form section (the actual whitepaper download form lives here).
 *
 *   Sections that previously stood alone — TrustBar, Problem, Solution,
 *   HowItWorks, UseCases, WhyNow — have been folded into the Hero scenes.
 */
export default function HomePage() {
  return (
    <>
      <TopBar />
      <Header />
      <main id="main" className="bg-deepNight text-white">
        <Hero />
        <About />
        <Features />
        <Pricing />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
