"use client";
import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import Button from "@/components/ui/Button";

const DOWNLOAD_PATH = "/whitepaper/Z-Data_Service_Overview.pdf";

export default function ThanksPage() {
  // Automatically trigger the PDF download once the page is shown.
  // Falls back gracefully if the file isn't present yet (placeholder build).
  useEffect(() => {
    const timer = window.setTimeout(() => {
      const a = document.createElement("a");
      a.href = DOWNLOAD_PATH;
      a.rel = "noopener";
      a.download = "Z-Data_Service_Overview.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
    }, 400);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-niteflyte-breathe text-white">
      <div className="pointer-events-none absolute inset-0 bg-hero-glow" />
      <Container width="narrow" className="relative z-10 flex min-h-screen flex-col items-center justify-center py-24 text-center">
        <Image
          src="/logos/z-data/svg/zdata_symbol_color.svg"
          alt=""
          width={100}
          height={100}
          aria-hidden
          className="h-[72px] w-auto"
        />
        <Eyebrow tone="windowLight" className="mt-10 justify-center">
          Thank you ／ ご請求ありがとうございます
        </Eyebrow>
        <h1 className="mt-6 font-jp text-h1 font-bold leading-tight text-white">
          資料のダウンロードを開始しました。
        </h1>
        <p className="mt-6 max-w-xl text-bodylg text-white/75">
          自動的にダウンロードが始まらない場合は、下のボタンから取得してください。
          <br />
          ご記入内容を確認の上、3営業日以内に担当よりご連絡します。
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <Button href={DOWNLOAD_PATH} external variant="primary" size="lg">
            手動でダウンロード <span aria-hidden>↓</span>
          </Button>
          <Link
            href="/"
            className="link-slide text-bodysm text-white/75 hover:text-white"
          >
            トップに戻る
          </Link>
        </div>

        <p className="mt-12 text-[12px] text-white/45">
          ※ ご記入情報は資料送付および関連情報のご案内のみに使用します。第三者には提供しません。
        </p>
      </Container>
    </main>
  );
}
