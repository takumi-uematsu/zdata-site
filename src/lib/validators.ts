import { z } from "zod";
import type { ReasonCategory } from "@/types/whitepaper";

const REASON_VALUES: readonly [ReasonCategory, ...ReasonCategory[]] = [
  "new-leads",
  "customer-understanding",
  "sales-efficiency",
  "other",
];

export const whitepaperSchema = z.object({
  company: z
    .string({ required_error: "会社名を入力してください。" })
    .trim()
    .min(1, "会社名を入力してください。")
    .max(120, "120文字以内で入力してください。"),
  name: z
    .string({ required_error: "お名前を入力してください。" })
    .trim()
    .min(1, "お名前を入力してください。")
    .max(80, "80文字以内で入力してください。"),
  position: z.string().trim().max(80).optional().or(z.literal("")),
  email: z
    .string({ required_error: "メールアドレスを入力してください。" })
    .trim()
    .min(1, "メールアドレスを入力してください。")
    .max(200)
    .email("正しい形式のメールアドレスを入力してください。"),
  phone: z
    .string()
    .trim()
    .max(40)
    .regex(/^[\d\-+() ]*$/, "電話番号の形式が正しくありません。")
    .optional()
    .or(z.literal("")),
  reason: z.enum(REASON_VALUES).optional(),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
  consent: z.literal(true, {
    errorMap: () => ({
      message: "プライバシーポリシーへの同意が必要です。",
    }),
  }),
});

export type WhitepaperInput = z.infer<typeof whitepaperSchema>;
