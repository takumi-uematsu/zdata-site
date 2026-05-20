export type ReasonCategory =
  | "new-leads"
  | "customer-understanding"
  | "sales-efficiency"
  | "other";

export const REASON_LABEL: Record<ReasonCategory, string> = {
  "new-leads": "新規リード獲得",
  "customer-understanding": "顧客理解の深化",
  "sales-efficiency": "営業効率化",
  other: "その他",
};

export interface WhitepaperPayload {
  company: string;
  name: string;
  position?: string;
  email: string;
  phone?: string;
  reason?: ReasonCategory;
  message?: string;
  consent: boolean;
}

export interface WhitepaperSuccessResponse {
  success: true;
  message: string;
  downloadPath: string;
}

export interface WhitepaperErrorResponse {
  success: false;
  message?: string;
  errors?: Partial<Record<keyof WhitepaperPayload, string>>;
}

export type WhitepaperResponse =
  | WhitepaperSuccessResponse
  | WhitepaperErrorResponse;
