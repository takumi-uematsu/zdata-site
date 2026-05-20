/**
 * Whitepaper submission handler — DEVELOPMENT MODE.
 *
 * Per SPEC §0.3 (Critical Security Requirements):
 *   During development, automatic outbound communication (email send,
 *   Slack/Discord webhook, third-party API notification) MUST NOT fire.
 *
 * This module therefore only:
 *   1. Logs the (validated) submission to server stdout for inspection.
 *   2. Returns success so the client can advance to /thanks and trigger DL.
 *
 * The production wiring (Resend or other transactional email) is intentionally
 * left to a future ticket. The destination address and API key are read from
 * env vars (WHITEPAPER_NOTIFY_EMAIL, RESEND_API_KEY). Sending is gated by
 * ENABLE_EMAIL_SENDING=true — by default it is OFF, even if a key is present.
 */

import type { WhitepaperPayload } from "@/types/whitepaper";
import { REASON_LABEL } from "@/types/whitepaper";

const ENABLE_EMAIL = process.env.ENABLE_EMAIL_SENDING === "true";

interface SubmitResult {
  notified: boolean;
}

const ts = () =>
  new Intl.DateTimeFormat("ja-JP", {
    timeZone: "Asia/Tokyo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(new Date());

export async function recordWhitepaperSubmission(
  payload: WhitepaperPayload,
): Promise<SubmitResult> {
  const reasonLabel = payload.reason
    ? REASON_LABEL[payload.reason]
    : "（未選択）";

  // Always log (server stdout only — no external transport).
  // eslint-disable-next-line no-console
  console.log(
    [
      "────────── [Z-Data Whitepaper Submission] ──────────",
      `Time     : ${ts()} JST`,
      `Company  : ${payload.company}`,
      `Name     : ${payload.name}`,
      `Position : ${payload.position ?? "-"}`,
      `Email    : ${payload.email}`,
      `Phone    : ${payload.phone ?? "-"}`,
      `Reason   : ${reasonLabel}`,
      `Message  : ${payload.message ?? "-"}`,
      `Consent  : ${payload.consent ? "yes" : "no"}`,
      `EMAIL_FLAG: ENABLE_EMAIL_SENDING=${ENABLE_EMAIL ? "true" : "false"}`,
      "─────────────────────────────────────────────────────",
    ].join("\n"),
  );

  if (!ENABLE_EMAIL) {
    // Development mode (default). Do NOT call any external service.
    return { notified: false };
  }

  // Production path is intentionally not implemented in this build.
  // When the user is ready to enable outbound mail, wire Resend here:
  //
  //   const resend = new Resend(process.env.RESEND_API_KEY);
  //   await resend.emails.send({ from, to: process.env.WHITEPAPER_NOTIFY_EMAIL!, ... });
  //
  // Until then, treat the flag as a no-op and return notified=false.
  // eslint-disable-next-line no-console
  console.warn(
    "[whitepaper] ENABLE_EMAIL_SENDING=true is set but no transport is wired in this build.",
  );
  return { notified: false };
}
