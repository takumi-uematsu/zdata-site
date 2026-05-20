"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/cn";
import { whitepaperSchema, type WhitepaperInput } from "@/lib/validators";
import { REASON_LABEL, type ReasonCategory } from "@/types/whitepaper";

const REASON_ORDER: ReasonCategory[] = [
  "new-leads",
  "customer-understanding",
  "sales-efficiency",
  "other",
];

const labelCls = "block text-bodysm font-medium text-white/85";
const inputCls =
  "mt-2 w-full rounded-sm border border-white/15 bg-white/[0.04] px-4 py-3 text-body text-white placeholder:text-white/35 focus:border-windowBlue focus:outline-none focus:ring-2 focus:ring-windowBlue/40 transition-colors";
const helpCls = "mt-1.5 text-[12px] text-white/45";
const errorCls = "mt-1.5 text-[12px] text-sunsetPink";

export default function WhitepaperForm() {
  const router = useRouter();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<WhitepaperInput>({
    resolver: zodResolver(whitepaperSchema),
    defaultValues: {
      company: "",
      name: "",
      position: "",
      email: "",
      phone: "",
      reason: undefined,
      message: "",
      consent: undefined as unknown as true,
    },
    mode: "onTouched",
  });

  const onSubmit = handleSubmit(async (values) => {
    setSubmitError(null);
    try {
      const res = await fetch("/api/whitepaper", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const json = (await res.json().catch(() => ({}))) as {
        success?: boolean;
        message?: string;
      };
      if (!res.ok || !json.success) {
        setSubmitError(
          json.message ??
            "送信に失敗しました。時間を置いて再度お試しください。",
        );
        return;
      }
      router.push("/thanks");
    } catch {
      setSubmitError("通信エラーが発生しました。再度お試しください。");
    }
  });

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="space-y-6"
      aria-busy={isSubmitting}
    >
      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label htmlFor="wf-company" className={labelCls}>
            会社名 <span className="text-sunsetPink">*</span>
          </label>
          <input
            id="wf-company"
            type="text"
            autoComplete="organization"
            className={cn(inputCls, errors.company && "border-sunsetPink")}
            {...register("company")}
          />
          {errors.company && (
            <p className={errorCls}>{errors.company.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="wf-name" className={labelCls}>
            お名前 <span className="text-sunsetPink">*</span>
          </label>
          <input
            id="wf-name"
            type="text"
            autoComplete="name"
            className={cn(inputCls, errors.name && "border-sunsetPink")}
            {...register("name")}
          />
          {errors.name && <p className={errorCls}>{errors.name.message}</p>}
        </div>
        <div>
          <label htmlFor="wf-position" className={labelCls}>
            役職
          </label>
          <input
            id="wf-position"
            type="text"
            autoComplete="organization-title"
            className={inputCls}
            {...register("position")}
          />
        </div>
        <div>
          <label htmlFor="wf-email" className={labelCls}>
            メールアドレス <span className="text-sunsetPink">*</span>
          </label>
          <input
            id="wf-email"
            type="email"
            autoComplete="email"
            inputMode="email"
            className={cn(inputCls, errors.email && "border-sunsetPink")}
            {...register("email")}
          />
          {errors.email && <p className={errorCls}>{errors.email.message}</p>}
        </div>
        <div>
          <label htmlFor="wf-phone" className={labelCls}>
            電話番号
          </label>
          <input
            id="wf-phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            className={cn(inputCls, errors.phone && "border-sunsetPink")}
            {...register("phone")}
          />
          {errors.phone && <p className={errorCls}>{errors.phone.message}</p>}
        </div>
        <div>
          <label htmlFor="wf-reason" className={labelCls}>
            主な検討理由
          </label>
          <select
            id="wf-reason"
            className={cn(inputCls, "appearance-none pr-10")}
            {...register("reason")}
            defaultValue=""
          >
            <option value="" disabled>
              選択してください
            </option>
            {REASON_ORDER.map((r) => (
              <option key={r} value={r}>
                {REASON_LABEL[r]}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="wf-message" className={labelCls}>
          お問い合わせ内容
        </label>
        <textarea
          id="wf-message"
          rows={4}
          className={cn(inputCls, "resize-y")}
          placeholder="任意：気になる機能、想定する活用シーンなど"
          {...register("message")}
        />
      </div>

      <div className="rounded-md border border-white/10 bg-white/[0.02] p-4">
        <label className="flex items-start gap-3 text-bodysm text-white/85">
          <input
            type="checkbox"
            className="mt-1 h-4 w-4 cursor-pointer accent-sunsetPink"
            {...register("consent")}
          />
          <span>
            <a
              href="/privacy"
              className="text-windowBlue underline decoration-windowBlue/40 underline-offset-4 hover:text-windowLight"
            >
              プライバシーポリシー
            </a>
            に同意します。 <span className="text-sunsetPink">*</span>
          </span>
        </label>
        {errors.consent && (
          <p className={cn(errorCls, "ml-7")}>
            {errors.consent.message?.toString()}
          </p>
        )}
      </div>

      {submitError && (
        <div
          role="alert"
          className="rounded-md border border-sunsetPink/40 bg-sunsetPink/10 px-4 py-3 text-bodysm text-sunsetPink"
        >
          {submitError}
        </div>
      )}

      <div className="flex flex-col items-stretch gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
        <p className={helpCls}>
          ※ ご記入情報は資料送付および関連情報のご案内のみに使用します。第三者には提供しません。
        </p>
        <button
          type="submit"
          disabled={isSubmitting || isSubmitSuccessful}
          className={cn(
            "relative inline-flex items-center justify-center gap-2 rounded-sm bg-sunsetPink px-8 py-4 text-[16px] font-medium text-deepNight shadow-glow-pink transition-all duration-200 hover:brightness-110 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60",
          )}
        >
          {isSubmitting ? (
            <>
              <svg
                aria-hidden
                width="18"
                height="18"
                viewBox="0 0 24 24"
                className="animate-spin"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="9"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeDasharray="44"
                  strokeDashoffset="20"
                  strokeLinecap="round"
                />
              </svg>
              送信中…
            </>
          ) : (
            <>
              資料をダウンロード <span aria-hidden>→</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
