export type SupabaseEnv = { url: string; anonKey: string };

function looksLikePlaceholder(value: string): boolean {
  return (
    value.includes("<") ||
    value.includes(">") ||
    value.includes("your-project") ||
    value.includes("your-anon")
  );
}

function isValidSupabaseHttpUrl(value: string): boolean {
  if (looksLikePlaceholder(value)) return false;
  try {
    const parsed = new URL(value);
    return parsed.protocol === "https:" || parsed.protocol === "http:";
  } catch {
    return false;
  }
}

export function getSupabaseEnvOptional(): SupabaseEnv | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) return null;
  if (!isValidSupabaseHttpUrl(url)) return null;
  if (looksLikePlaceholder(anonKey)) return null;
  return { url, anonKey };
}

export function isSupabaseConfigured(): boolean {
  return getSupabaseEnvOptional() !== null;
}

export function requireSupabaseEnv(): SupabaseEnv {
  const env = getSupabaseEnvOptional();
  if (!env) {
    throw new Error(
      "Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL to your Supabase Project URL (https://<project-ref>.supabase.co) and NEXT_PUBLIC_SUPABASE_ANON_KEY to your anon public key. Do not use the Postgres connection string here."
    );
  }
  return env;
}
