import Link from "next/link";
import Image from "next/image";
import Container from "@/components/ui/Container";

const TRACKS = [
  { n: "01", href: "/#hero", label: "Overture", jp: "ヒーロー" },
  { n: "02", href: "/#about", label: "What is Z-Data", jp: "Z-Dataとは" },
  { n: "03", href: "/#features", label: "Inside the Studio", jp: "機能" },
  { n: "04", href: "/#pricing", label: "Editions", jp: "料金プラン" },
  { n: "05", href: "/#cta", label: "Get the Pressing", jp: "資料DL" },
];

const META = [
  { href: "/privacy", label: "Privacy Policy", jp: "プライバシーポリシー" },
  {
    href: "https://genova.inc",
    label: "Genova Inc.",
    jp: "運営会社",
    external: true,
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-onyx text-white">
      <Container width="wide" className="py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div
              className="flex items-center gap-4"
              aria-label="Z-Data — Zero Party Data Platform"
            >
              <Image
                src="/logos/z-data/svg/zdata_symbol_color.svg"
                alt=""
                width={56}
                height={56}
                aria-hidden
                className="h-12 w-auto md:h-14"
              />
              <span className="font-syne italic font-bold leading-none tracking-tight text-white text-[38px] md:text-[44px]">
                Z-Data
              </span>
            </div>
            <p className="mt-6 max-w-md text-pretty text-bodysm leading-relaxed text-white/65 [word-break:keep-all]">
              Zero Party Data Platform —{" "}
              顧客一人ひとりの声を、波形として捉え、構造化データ＆AI生成アセットへ。
            </p>
            <p className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[10px] uppercase tracking-[0.22em] text-windowLight/80">
              <span>Vol. 01</span>
              <span className="text-white/30">·</span>
              <span>2026</span>
              <span className="text-white/30">·</span>
              <span>by Genova Inc.</span>
            </p>
          </div>

          <div className="lg:col-span-7">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-windowLight/85">
              Track listing
              <span className="ml-2 text-white/30">／</span>
              <span className="ml-2 font-jp text-[12px] tracking-normal text-white/55 normal-case">
                セクション一覧
              </span>
            </p>
            <ul className="mt-5 grid gap-2 sm:grid-cols-2">
              {TRACKS.map((t) => (
                <li key={t.n}>
                  <Link
                    href={t.href}
                    className="group flex items-baseline gap-3 rounded-sm py-1 text-bodysm transition-colors hover:bg-white/[0.04]"
                  >
                    <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/35 group-hover:text-windowLight">
                      P{t.n}
                    </span>
                    <span className="flex flex-1 items-baseline gap-2">
                      <span className="text-white/80 group-hover:text-white">
                        {t.label}
                      </span>
                      <span className="font-mono text-white/20">／</span>
                      <span className="font-jp text-[12px] text-white/45 group-hover:text-white/70">
                        {t.jp}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 grid gap-6 border-t border-white/10 pt-6 md:grid-cols-3">
          <p className="text-[12px] text-white/55">
            © {year} Genova Inc. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-[12px] text-white/65 md:justify-center">
            {META.map((m) => (
              <li key={m.href}>
                {m.external ? (
                  <a
                    href={m.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-slide hover:text-white"
                  >
                    {m.label}
                    <span className="ml-2 font-jp text-white/40">／ {m.jp}</span>{" "}
                    ↗
                  </a>
                ) : (
                  <Link href={m.href} className="link-slide hover:text-white">
                    {m.label}
                    <span className="ml-2 font-jp text-white/40">／ {m.jp}</span>
                  </Link>
                )}
              </li>
            ))}
          </ul>
          <p className="text-[12px] text-white/40 md:text-right">
            〒107-0062 東京都港区南青山3-5-2 南青山第一韮澤ビル3F
          </p>
        </div>
      </Container>
    </footer>
  );
}
