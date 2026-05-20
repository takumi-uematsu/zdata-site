import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Eyebrow from "@/components/ui/Eyebrow";

export const metadata: Metadata = {
  title: "プライバシーポリシー",
  description:
    "Genova株式会社が提供する Z-Data のプライバシーポリシー。個人情報の取り扱いについて説明します。",
  robots: { index: true, follow: true },
};

const SECTIONS: { heading: string; body: string }[] = [
  {
    heading: "第1条（個人情報）",
    body: "「個人情報」とは、個人情報保護法にいう「個人情報」を指すものとし、生存する個人に関する情報であって、当該情報に含まれる氏名、生年月日、住所、電話番号、連絡先その他の記述等により特定の個人を識別できる情報を指します。",
  },
  {
    heading: "第2条（取得方法）",
    body: "当社は、Z-Data のサイトに設置するフォームより、お客様の会社名、お名前、役職、メールアドレス、電話番号、お問い合わせ内容を取得することがあります。",
  },
  {
    heading: "第3条（利用目的）",
    body: "取得した個人情報は、サービス資料の送付、お問い合わせ対応、Genova株式会社が提供するサービスに関する情報のご案内、および統計データの作成（個人を識別できない形）に利用します。本目的の範囲外で利用する場合は、事前に同意を得るものとします。",
  },
  {
    heading: "第4条（第三者提供）",
    body: "当社は、法令で定める場合を除き、お客様の同意なく、取得した個人情報を第三者へ提供しません。クラウドサービス等の業務委託先には、利用目的の達成に必要な範囲内で個人情報を提供することがあり、委託先には適切な監督を行います。",
  },
  {
    heading: "第5条（開示・訂正・削除）",
    body: "お客様は、当社が保有する自己の個人情報について、開示、訂正、追加、削除、利用停止を請求することができます。本ページ末尾の連絡先までご連絡ください。",
  },
  {
    heading: "第6条（改定）",
    body: "本ポリシーの内容は、法令その他本ポリシーに別段の定めのある事項を除いて、お客様に通知することなく変更することができるものとします。改定後は当ページに掲示した時点から効力を生じるものとします。",
  },
];

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="bg-deepNight text-white">
        <section className="border-b border-white/8 pt-32 pb-12">
          <Container width="narrow">
            <Eyebrow tone="windowLight">Privacy Policy</Eyebrow>
            <h1 className="mt-5 font-jp text-h1 font-bold leading-tight text-white">
              プライバシーポリシー
            </h1>
            <p className="mt-5 text-bodysm text-white/55">
              Last Updated: 2026-05-14
            </p>
          </Container>
        </section>

        <section className="py-16 md:py-20">
          <Container width="narrow">
            <p className="text-body leading-relaxed text-white/75">
              Genova株式会社（以下「当社」）は、当社が運営する Z-Data のウェブサイト上で提供するサービスにおける、お客様の個人情報の取扱いについて、以下のとおりプライバシーポリシーを定めます。
            </p>

            <div className="mt-12 space-y-10">
              {SECTIONS.map((s) => (
                <div key={s.heading}>
                  <h2 className="font-jp text-h2 font-bold leading-tight text-white">
                    {s.heading}
                  </h2>
                  <p className="mt-4 text-body leading-relaxed text-white/75">
                    {s.body}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-16 rounded-lg border border-white/12 bg-white/[0.03] p-6">
              <p className="font-mono text-eyebrow uppercase text-windowLight">
                Contact
              </p>
              <p className="mt-3 text-body text-white/85">Genova株式会社</p>
              <p className="mt-1 text-bodysm text-white/65">
                〒107-0062 東京都港区南青山3-5-2 南青山第一韮澤ビル3F
              </p>
              <p className="mt-3 text-bodysm">
                <Link
                  href="/#cta"
                  className="link-slide text-windowBlue hover:text-windowLight"
                >
                  お問い合わせフォームから連絡する →
                </Link>
              </p>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
