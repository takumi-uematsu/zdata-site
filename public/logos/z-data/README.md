# Genova / Z-Data Logo Assets v3 — FINAL

## ⚠️ Critical Notes for Implementers

This is the **canonical, final version** of all logo assets for Genova Inc. and Z-Data product.
Any previously distributed versions (including cassette tape symbol, horizontal gradient) are **OBSOLETE** and must NOT be used.

The Z-Data symbol is **Z-Bar with β vertical gradient** (top: Sunset Pink → mid: Niteflyte → bottom: Twilight Blue). 8 sound bars.

## Brand Story (use this exact wording)

> ビジネスの脈動は、顧客の声から始まる。
> 顧客一人ひとりの声には、それぞれ独自のリズムと強度がある。
> Z-Data は、その「波形」を捉え、一過性のノイズではなく構造化データ＆アセットとして可視化する。

3 Pillars: **VOICE / RHYTHM / ASSET**

## Directory Structure

```
Genova/
├── svg/
│   ├── genova_symbol_color.svg
│   ├── genova_symbol_black.svg
│   ├── genova_symbol_white.svg
│   ├── genova_h_color.svg          (horizontal combo: symbol + "Genova Inc.")
│   ├── genova_h_black.svg
│   ├── genova_h_white.svg
│   ├── genova_v_*.svg              (vertical combo)
│   └── genova_logotype_*.svg       (text only)
└── png/
    ├── symbol/    (64/128/256/512/1024 × 3 colors = 15)
    └── horizontal/ (256/512/1024/2048 × 3 colors = 12)

Z-Data/
├── svg/
│   ├── zdata_symbol_color.svg      ← Z-Bar β vertical gradient (8 bars)
│   ├── zdata_symbol_black.svg
│   ├── zdata_symbol_white.svg
│   ├── zdata_h_*.svg               (Z-Bar + "Z-Data" Syne Italic Bold)
│   ├── zdata_v_*.svg
│   └── zdata_logotype_*.svg
└── png/
    ├── symbol/    (64/128/256/512/1024 × 3 colors = 15)
    ├── horizontal/ (256/512/1024/2048 × 3 colors = 12)
    ├── vertical/   (500/1000/2000 × 3 colors = 9)
    └── logotype/   (256/512/1024 × 3 colors = 9)
```

## Color Variants

- `color` — Brand color (β vertical gradient for Z-Bar / brand blue for Genova)
- `black` — Pure black (#000000) for monochrome printing
- `white` — Pure white (#FFFFFF) for dark backgrounds

## Recommended Usage (for z-data.io site)

For Next.js implementation, place these in `public/assets/`:

```
public/
└── assets/
    ├── genova/
    │   ├── logo-horizontal-white.png       ← use horizontal/genova_h_white_1024x*.png
    │   └── logo-symbol-color.svg
    └── zdata/
        ├── logo-horizontal-white.png       ← use horizontal/zdata_h_white_1024x281.png
        ├── logo-horizontal-color.png       ← use horizontal/zdata_h_color_1024x281.png
        ├── logo-symbol-color.svg           ← Z-Bar β vertical gradient
        ├── logo-symbol-white.svg
        ├── logo-vertical-white.png
        └── logo-logotype-white.png
```

## Fonts

- **Logotype font**: Syne Italic Bold 700 (Google Fonts)
- SVG `<text>` elements use `@import` for Syne, but for production reliability, **prefer PNG assets** for any logo with text.

## Color Tokens (CSS Variables)

```css
--color-deep-night: #0A1547;
--color-niteflyte: #1B3A7A;
--color-twilight: #4A7BC7;
--color-window-blue: #8FB8E8;
--color-window-light: #FFD89E;
--color-sunset-pink: #FF8AB4;
```

## ❌ Do NOT Use

- Old cassette tape symbol (deprecated 2026/05)
- Old horizontal gradient (left→right) — replaced by β vertical gradient (top→bottom)
- Old "Cassette Z" symbol from v3 brand proposal
- Any PNG outside this package (especially `/logos_png/Z-Data/` from earlier sessions)

