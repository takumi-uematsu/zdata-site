# Whitepaper directory

This directory hosts the public-download PDF served at:

`/whitepaper/Z-Data_Service_Overview.pdf`

## Status — 2026-05-14 (placeholder)

The actual PDF is **not yet** in this directory. Per the implementation SPEC
(§15), the whitepaper content was flagged as not-yet-provided. The CTA form
will still let visitors submit the lead — they will be redirected to
`/thanks` which will attempt to download the file (and gracefully fail if
absent).

## To replace the placeholder

1. Author the deck (10 pages, NITEFLYTE colour palette, Syne / Noto Sans JP).
2. Export as `Z-Data_Service_Overview.pdf` (max recommended size: 4 MB).
3. Drop it next to this README:

   `public/whitepaper/Z-Data_Service_Overview.pdf`

4. Commit and redeploy. No code changes needed — the path is referenced from
   `src/app/api/whitepaper/route.ts` and `src/app/thanks/page.tsx`.
