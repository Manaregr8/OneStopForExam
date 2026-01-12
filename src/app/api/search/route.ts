import { NextResponse } from "next/server";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = (searchParams.get("q") ?? "").trim();

  if (!q) {
    return NextResponse.json({ results: [] });
  }

  if (!isSupabaseConfigured()) {
    return NextResponse.json({ results: [] });
  }

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("exams")
    .select("id,name,slug,conducting_body")
    .ilike("name", `%${q}%`)
    .order("popularity_rank", { ascending: true, nullsFirst: false })
    .order("name")
    .limit(10);

  if (error) {
    return NextResponse.json(
      { error: "Search failed" },
      { status: 500 }
    );
  }

  return NextResponse.json({ results: data ?? [] });
}
