# Z-Data Product Site

`z-data.io` — Genova株式会社のプロダクト「Z-Data」（Zero Party Data Platform）のLP。

Built with **Next.js 14 (App Router)** / **TypeScript** / **Tailwind CSS v3** / **Framer Motion** / **React Hook Form** + **Zod**.

> ⚠️ このリポジトリは **個人事業 / Genova株式会社** の資産です。
> ココナラ社の OneDrive / SharePoint / Microsoft 365 / 社内 Slack には**絶対に**接続しません。

---

## クイックスタート

```powershell
# 開発サーバ（ポート 3031）
npm install
npm run dev
# → http://localhost:3031

# 本番ビルド検証
npm run build
npm run start
```

> 既存の `genova-site`（コーポレートサイト）はポート 3030 を使用。
> 並列起動できるよう、本サイトは **3031** にしています。

---

## ディレクトリ構成

```
zdata-site/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # ルートレイアウト・メタ・JSON-LD
│   │   ├── globals.css             # Tailwind + ブランド CSS変数
│   │   ├── page.tsx                # LP（10セクションをマウント）
│   │   ├── sitemap.ts              # /sitemap.xml
│   │   ├── robots.ts               # /robots.txt
│   │   ├── api/whitepaper/route.ts # ホワイトペーパー送信ハンドラ
│   │   ├── thanks/page.tsx         # DL完了サンクスページ
│   │   └── privacy/page.tsx        # プライバシーポリシー
│   ├── components/
│   │   ├── layout/                 # Header / Footer
│   │   ├── sections/               # 10セクション（Hero ～ CTA）
│   │   └── ui/                     # Container / Eyebrow / Button / Card /
│   │                                 ZBarSymbol / Citylights / Reveal /
│   │                                 CountUp / WhitepaperForm
│   ├── lib/
│   │   ├── cn.ts                   # クラス名結合ユーティリティ
│   │   ├── fonts.ts                # next/font 設定（Syne / Noto JP / DM Sans / Space Grotesk）
│   │   ├── validators.ts           # Zod スキーマ（フォーム）
│   │   └── whitepaper.ts           # ⚠️ 送信ハンドラ — §0.3 によりメール送信 OFF
│   └── types/
│       └── whitepaper.ts
├── public/
│   ├── logos/z-data/               # ロゴ一式（horizontal / vertical / symbol / logotype）
│   └── whitepaper/                 # ホワイトペーパー本体（未配置 — README参照）
├── tailwind.config.ts              # ブランドカラー・タイポグラフィ
├── env.example                     # 環境変数テンプレ（実シークレットは入れない）
└── package.json
```

---

## セクション構成（10）

| 順 | ID | コンポーネント | 役割 |
|---|---|---|---|
| 1 | `#hero` | `Hero` | ファーストビュー（脈動コピー + Z-Bar波形） |
| 2 | – | `TrustBar` | 業種ラベル（**実顧客ロゴ未着のためプレースホルダー**） |
| 3 | `#problem` | `Problem` | 80% カウントアップ + 課題提起 |
| 4 | `#solution` | `Solution` | 3-Pillars（VOICE / RHYTHM / ASSET） |
| 5 | `#features` | `Features` | 5機能を縦2カラムで詳説 |
| 6 | `#how-it-works` | `HowItWorks` | 4ステップ（波形ライン装飾） |
| 7 | `#use-cases` | `UseCases` | 4業種タブ切替（Before / After） |
| 8 | `#pricing` | `Pricing` | 4プラン + 機能比較マトリクス |
| 9 | `#why-now` | `WhyNow` | 3つの市場タイミング |
| 10 | `#cta` | `CTA` | ホワイトペーパーDLフォーム |

---

## ⚠️ セキュリティ条項（厳守）

本リポジトリは **SPEC §0 Critical Security Requirements** に従って実装されています。

### 0.1 開発環境の隔離
- 個人 PC / 個人インターネット回線 / 個人メール / 個人 GitHub / 個人 Vercel
- ココナラ社の業務環境とは**一切**接続しない

### 0.3 自動連絡系の完全 OFF
**実装期間中は、システムからの自動連絡（メール送信・Webhook・Slack 通知）は一切発火しません。**

- `src/lib/whitepaper.ts` — フォーム送信を**サーバ標準出力にログするのみ**
- `ENABLE_EMAIL_SENDING=false`（既定）であれば、外部 API は一切呼ばない
- `RESEND_API_KEY` を入れても、トランスポート未実装のため No-op になる

### 0.4 開発中の禁止
- 環境変数に本物の API キーを入れない（`env.example` はダミー固定）
- 自動デプロイは GitHub `main` push のみ。ローカルから `vercel deploy` などは実行しない
- `.env.local` は `.gitignore` 済み

### 本番運用に切り替えるとき（チェックリスト）
1. `WHITEPAPER_NOTIFY_EMAIL` を実アドレスに（個人運用 or `@z-data.io`）
2. `RESEND_API_KEY` を Genova 専用アカウントで取得 → Vercel に登録
3. `src/lib/whitepaper.ts` に Resend 送信ロジックを追加（コメント参照）
4. `ENABLE_EMAIL_SENDING=true` に
5. ローカルではなく **Vercel Preview** で動作確認してから main に merge

---

## ブランドカラー（NITEFLYTE）

| Token | HEX | 用途 |
|---|---|---|
| `deepNight` | `#0A1547` | ベース背景（最暗部） |
| `niteflyte` | `#1B3A7A` | セカンダリ背景 |
| `twilight` | `#4A7BC7` | リンク・アクセント |
| `windowBlue` | `#8FB8E8` | 強調コピー（クール系） |
| `windowLight` | `#FFD89E` | Eyebrow・装飾光 |
| `sunsetPink` | `#FF8AB4` | プライマリ CTA・主役アクセント |
| `paper` | `#FAFAF7` | 反転背景 |
| `charcoal` / `onyx` | `#1A1A1A` / `#0A0A0A` | フッター背景 |

---

## アニメーション一覧（実装済み）

- **NITEFLYTE グラデーション呼吸**（30s ループ） — `.bg-niteflyte-breathe`
- **Z-Bar 波形 8 本パルス**（4.5s × 各バー固有位相） — `ui/ZBarSymbol.tsx`
- **街明かりドット点滅**（90ドット・3.2〜6.8s）— `ui/Citylights.tsx`
- **スクロール起点フェード+stagger** — `ui/Reveal.tsx`
- **数値カウントアップ**（80% など）— `ui/CountUp.tsx`
- **CTA ピンクリップル** — `ui/Button.tsx`
- **カードホバー浮き上がり** — `.card-lift` (globals.css)
- **リンク下線スライド** — `.link-slide`

`prefers-reduced-motion: reduce` を設定しているユーザーには `globals.css` で全アニメ強制無効化。

---

## 既知の未着アセット / プレースホルダー

| 項目 | 現状 | 差し替え方法 |
|---|---|---|
| ホワイトペーパー PDF | `public/whitepaper/Z-Data_Service_Overview.pdf` 未配置 | 同パスに PDF を置く（DL自動トリガーは既に実装済み） |
| Trust Bar ベータ顧客ロゴ | 業種ラベル6つで代替表示 | `src/components/sections/TrustBar.tsx` を実ロゴ並べに差替 |
| OG 画像 | `/assets/og-image.png` 参照は宣言済みだがファイル未配置 | `public/assets/og-image.png` に 1200×630px の画像を配置 |
| ファビコン | Next.jsデフォルト | `public/favicon.ico` または `app/icon.tsx` を追加 |

---

## デプロイ

### GitHub
1. **個人アカウント**で private リポジトリ作成（例: `username/zdata-site`）
2. `git init && git add . && git commit -m "init"`
3. `git push -u origin main`

### Vercel
1. Vercel ダッシュボード → New Project → GitHub から `zdata-site` を Import
2. Framework Preset: **Next.js**（自動検出）
3. Environment Variables（ダッシュボードで設定、本番運用前は §0.3 に従って）
   - `NEXT_PUBLIC_SITE_URL=https://z-data.io`
   - `WHITEPAPER_NOTIFY_EMAIL=dev@example.test`（最初はダミーのまま）
   - `ENABLE_EMAIL_SENDING=false`（**運用開始日まで false 固定**）
4. Deploy

### ドメイン
- `z-data.io`（取得済み）の DNS で CNAME を Vercel に向ける
- Vercel ダッシュボードの Domains から追加

---

## トラブルシュート

- **`npm run dev` がポート競合**: `package.json` の `dev` スクリプトの `-p 3031` を変更
- **フォントが表示されない**: 初回起動は `next/font` のダウンロードに数十秒かかる
- **ビルドで Syne italic エラー**: `lib/fonts.ts` は `style: ["italic"]` を指定しない（CSS `font-style: italic` で代替）

---

## ライセンス・著作権

© 2026 Genova Inc. All rights reserved.
