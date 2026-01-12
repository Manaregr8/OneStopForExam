import { createClient } from "@supabase/supabase-js";
import { requireSupabaseEnv } from "./env";

export function createSupabasePublicClient() {
  const { url, anonKey } = requireSupabaseEnv();
  return createClient(url, anonKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
