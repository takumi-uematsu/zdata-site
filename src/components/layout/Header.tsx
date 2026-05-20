"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import Container from "@/components/ui/Container";

const NAV = [
  { href: "/#about", label: "About", jp: "Z-Dataとは", track: "01" },
  { href: "/#features", label: "Features", jp: "機能", track: "02" },
  { href: "/#pricing", label: "Pricing", jp: "料金プラン", track: "03" },
  { href: "/#cta", label: "Get the deck", jp: "資料DL", track: "04" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 transition-all duration-300",
        scrolled || open
          ? "bg-deepNight/85 backdrop-blur-md border-b border-white/10"
          : "bg-transparent border-b border-transparent",
      )}
    >
      <Container
        width="wide"
        className="flex h-[84px] items-center justify-between"
      >
        <Link
          href="/"
          className="flex items-center gap-3"
          aria-label="Z-Data — Top"
          onClick={() => setOpen(false)}
        >
          <Image
            src="/logos/z-data/svg/zdata_symbol_color.svg"
            alt=""
            width={40}
            height={40}
            priority
            aria-hidden
            className="h-8 w-auto"
          />
          <span className="flex flex-col leading-tight">
            <span className="font-syne italic text-[18px] font-bold tracking-tight text-white">
              Z-Data
            </span>
            <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-white/55">
              by Genova
            </span>
          </span>
        </Link>

        <nav
          aria-label="Primary"
          className="hidden items-center gap-6 md:flex lg:gap-7"
        >
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group inline-flex flex-col items-start leading-tight"
            >
              <span className="flex items-baseline gap-1.5">
                <span className="font-mono text-[9.5px] tracking-[0.18em] text-white/35 group-hover:text-windowLight transition-colors">
                  {item.track}
                </span>
                <span className="link-slide text-[13.5px] font-medium text-white/85 group-hover:text-white transition-colors">
                  {item.label}
                </span>
              </span>
              <span className="ml-[22px] mt-0.5 font-jp text-[10.5px] text-white/45 group-hover:text-white/75 transition-colors">
                {item.jp}
              </span>
            </Link>
          ))}
          <Link
            href="/#cta"
            className="ml-1 inline-flex items-center gap-2.5 rounded-sm bg-sunsetPink px-4 py-2.5 font-medium text-[13.5px] text-deepNight shadow-glow-pink hover:brightness-110 transition-all"
          >
            <span
              aria-hidden
              className="font-mono text-[9px] uppercase tracking-[0.22em] text-deepNight/55"
            >
              P10
            </span>
            <span className="flex flex-col leading-tight">
              <span>資料DL</span>
              <span className="font-mono text-[8.5px] uppercase tracking-[0.18em] text-deepNight/60">
                Get the deck
              </span>
            </span>
          </Link>
        </nav>

        <button
          type="button"
          aria-label={open ? "メニューを閉じる" : "メニューを開く"}
          aria-expanded={open}
          aria-controls="mobile-nav"
          className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-sm text-white hover:bg-white/10 transition-colors"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? (
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="M6 6l12 12M6 18L18 6" strokeLinecap="round" />
            </svg>
          ) : (
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </Container>

      <div
        id="mobile-nav"
        className={cn(
          "md:hidden overflow-hidden transition-[max-height,opacity] duration-300 ease-out",
          open ? "max-h-[460px] opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <Container width="wide" className="pb-6 pt-2">
          <ul className="space-y-1 border-t border-white/10 pt-4">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-baseline gap-3 rounded-sm px-3 py-3 transition-colors hover:bg-white/8"
                >
                  <span className="w-7 font-mono text-[10px] tracking-[0.18em] text-windowLight">
                    {item.track}
                  </span>
                  <span className="text-body font-medium text-white/85">
                    {item.label}
                  </span>
                  <span className="font-mono text-white/25">／</span>
                  <span className="font-jp text-[13px] text-white/55">
                    {item.jp}
                  </span>
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/#cta"
                onClick={() => setOpen(false)}
                className="mt-3 flex items-center justify-center gap-2 rounded-sm bg-sunsetPink px-4 py-3 font-medium text-deepNight"
              >
                <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-deepNight/55">
                  P10
                </span>
                <span>資料をダウンロード</span>
              </Link>
            </li>
          </ul>
        </Container>
      </div>
    </header>
  );
}
