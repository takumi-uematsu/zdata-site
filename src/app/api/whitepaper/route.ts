/**
 * POST /api/whitepaper
 *
 * Receives the lead form payload. Per SPEC §0.3 (Critical Security
 * Requirements), this endpoint MUST NOT trigger outbound mail or webhook
 * during development. The handler logs the submission via
 * `recordWhitepaperSubmission` (server stdout only) and returns success
 * with the download path.
 */
import { NextResponse } from "next/server";
import { whitepaperSchema } from "@/lib/validators";
import { recordWhitepaperSubmission } from "@/lib/whitepaper";
import type { WhitepaperResponse } from "@/types/whitepaper";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const DOWNLOAD_PATH = "/whitepaper/Z-Data_Service_Overview.pdf";

export async function POST(request: Request): Promise<Response> {
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return reply(
      { success: false, message: "リクエスト形式が不正です。" },
      400,
    );
  }

  const parsed = whitepaperSchema.safeParse(json);
  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (typeof key === "string" && !(key in errors)) {
        errors[key] = issue.message;
      }
    }
    return reply(
      {
        success: false,
        message: "入力内容を確認してください。",
        errors: errors as WhitepaperResponse extends infer T
          ? T extends { errors?: infer E }
            ? E
            : never
          : never,
      },
      400,
    );
  }

  try {
    await recordWhitepaperSubmission(parsed.data);

    return reply(
      {
        success: true,
        message:
          "資料ダウンロードページへ移動します。担当からのご連絡もお待ちください。",
        downloadPath: DOWNLOAD_PATH,
      },
      200,
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "unknown error";
    // eslint-disable-next-line no-console
    console.error("[whitepaper] handler failed:", message);
    return reply(
      {
        success: false,
        message: "送信に失敗しました。しばらくしてから再度お試しください。",
      },
      500,
    );
  }
}

function reply(payload: WhitepaperResponse, status: number): Response {
  return NextResponse.json(payload, { status });
}
