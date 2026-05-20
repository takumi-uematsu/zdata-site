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

import { Resend } from "resend";
import type { WhitepaperPayload } from "@/types/whitepaper";
import { REASON_LABEL } from "@/types/whitepaper";
import { getSupabaseAdmin } from "@/lib/supabase";

const ENABLE_EMAIL = process.env.ENABLE_EMAIL_SENDING === "true";
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const RESEND_FROM = process.env.RESEND_FROM ?? "Z-Data <onboarding@resend.dev>";
const NOTIFY_TO = process.env.WHITEPAPER_NOTIFY_EMAIL;

interface SubmitResult {
  notified: boolean;
  persisted: boolean;
}

export interface SubmissionContext {
  userAgent?: string | null;
  referer?: string | null;
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
  ctx: SubmissionContext = {},
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

  // === Persist to Supabase if configured (gated by ENABLE_SUPABASE_PERSIST) ===
  let persisted = false;
  const supabase = getSupabaseAdmin();
  if (supabase) {
    try {
      const { error } = await supabase.from("whitepaper_leads").insert({
        company: payload.company,
        name: payload.name,
        email: payload.email,
        position: payload.position ?? null,
        phone: payload.phone ?? null,
        reason: payload.reason ?? null,
        message: payload.message ?? null,
        consent: payload.consent,
        source: "whitepaper",
        user_agent: ctx.userAgent ?? null,
        referer: ctx.referer ?? null,
      });
      if (error) {
        // eslint-disable-next-line no-console
        console.error("[whitepaper] Supabase insert error:", error.message);
      } else {
        persisted = true;
        // eslint-disable-next-line no-console
        console.log("[whitepaper] Persisted to Supabase ✓");
      }
    } catch (e) {
      // Never let DB failure block the user response.
      // eslint-disable-next-line no-console
      console.error("[whitepaper] Supabase insert threw:", e);
    }
  }

  // === Email notification via Resend (gated by ENABLE_EMAIL_SENDING) ===
  let notified = false;
  if (ENABLE_EMAIL && RESEND_API_KEY && NOTIFY_TO) {
    try {
      const resend = new Resend(RESEND_API_KEY);
      const subject = `[Z-Data] 新規リード: ${payload.company} / ${payload.name}`;
      const lines = [
        `新しいWhitepaperリードが届きました。`,
        ``,
        `■ 会社名: ${payload.company}`,
        `■ お名前: ${payload.name}`,
        `■ 役職  : ${payload.position ?? "-"}`,
        `■ メール: ${payload.email}`,
        `■ 電話  : ${payload.phone ?? "-"}`,
        `■ 理由  : ${reasonLabel}`,
        `■ メッセージ:`,
        payload.message ?? "(なし)",
        ``,
        `送信日時: ${ts()} JST`,
        `同意   : ${payload.consent ? "あり" : "なし"}`,
        ``,
        `Supabase記録: ${persisted ? "保存済み ✓" : "保存失敗 or 未設定"}`,
      ];
      const html = `
        <div style="font-family:-apple-system,BlinkMacSystemFont,'Hiragino Kaku Gothic ProN','Yu Gothic',sans-serif;color:#1a1a1a;line-height:1.7;max-width:560px;margin:0 auto;padding:24px;">
          <h2 style="font-size:18px;font-weight:700;margin:0 0 16px;border-bottom:2px solid #FF8AB4;padding-bottom:8px;">新規Whitepaperリード</h2>
          <table style="width:100%;border-collapse:collapse;font-size:14px;">
            <tr><td style="padding:8px 0;color:#737373;width:90px;">会社名</td><td style="padding:8px 0;font-weight:600;">${escapeHtml(payload.company)}</td></tr>
            <tr><td style="padding:8px 0;color:#737373;">お名前</td><td style="padding:8px 0;font-weight:600;">${escapeHtml(payload.name)}</td></tr>
            <tr><td style="padding:8px 0;color:#737373;">役職</td><td style="padding:8px 0;">${escapeHtml(payload.position ?? "-")}</td></tr>
            <tr><td style="padding:8px 0;color:#737373;">メール</td><td style="padding:8px 0;"><a href="mailto:${escapeHtml(payload.email)}" style="color:#4A7BC7;">${escapeHtml(payload.email)}</a></td></tr>
            <tr><td style="padding:8px 0;color:#737373;">電話</td><td style="padding:8px 0;">${escapeHtml(payload.phone ?? "-")}</td></tr>
            <tr><td style="padding:8px 0;color:#737373;">理由</td><td style="padding:8px 0;">${escapeHtml(reasonLabel)}</td></tr>
          </table>
          <div style="margin-top:16px;padding:12px;background:#FAFAF7;border-left:3px solid #8FB8E8;font-size:14px;white-space:pre-wrap;">${escapeHtml(payload.message ?? "(メッセージなし)")}</div>
          <p style="margin-top:24px;font-size:12px;color:#737373;">送信日時: ${ts()} JST · 同意: ${payload.consent ? "あり" : "なし"} · DB保存: ${persisted ? "✓" : "—"}</p>
        </div>
      `;
      const { error } = await resend.emails.send({
        from: RESEND_FROM,
        to: NOTIFY_TO,
        replyTo: payload.email,
        subject,
        text: lines.join("\n"),
        html,
      });
      if (error) {
        // eslint-disable-next-line no-console
        console.error("[whitepaper] Resend send error:", error.message);
      } else {
        notified = true;
        // eslint-disable-next-line no-console
        console.log("[whitepaper] Email sent via Resend ✓");
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error("[whitepaper] Resend send threw:", e);
    }
  }

  return { notified, persisted };
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
