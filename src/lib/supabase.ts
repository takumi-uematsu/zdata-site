/**
 * Supabase server-side admin client.
 *
 * Uses the SERVICE_ROLE key so it can bypass RLS and write to any table.
 * NEVER import this from client components — the service_role key must
 * never reach the browser.
 *
 * The factory returns `null` when Supabase is not configured. Callers should
 * gracefully handle that case (e.g. fall back to log-only persistence) so the
 * site keeps working before env vars are set in Vercel.
 */
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const enabled = process.env.ENABLE_SUPABASE_PERSIST === "true";

let cached: SupabaseClient | null = null;

export function getSupabaseAdmin(): SupabaseClient | null {
  if (!enabled || !url || !serviceKey) return null;
  if (cached) return cached;
  cached = createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: { headers: { "X-Client-Info": "zdata-site/whitepaper" } },
  });
  return cached;
}

export function isSupabaseConfigured(): boolean {
  return enabled && !!url && !!serviceKey;
}
