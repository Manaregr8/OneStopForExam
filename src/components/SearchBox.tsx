"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import styles from "./SearchBox.module.scss";

type SearchResult = {
  id: string;
  name: string;
  slug: string;
  conducting_body: string | null;
};

export function SearchBox({ placeholder }: { placeholder?: string }) {
  const [q, setQ] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  const debouncedQ = useMemo(() => q.trim(), [q]);

  useEffect(() => {
    if (!debouncedQ) {
      setResults([]);
      return;
    }

    const handle = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(debouncedQ)}`);
        const json = (await res.json()) as { results: SearchResult[] };
        setResults(json.results ?? []);
      } finally {
        setLoading(false);
      }
    }, 200);

    return () => clearTimeout(handle);
  }, [debouncedQ]);

  return (
    <div className={styles.wrap}>
      <div className={styles.inputRow}>
        <input
          className={styles.input}
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={placeholder ?? "Search an exam (e.g., JEE Main, NEET, UPSC)"}
          aria-label="Search exams"
        />
        <span className="visuallyHidden" aria-live="polite">
          {loading ? "Searching" : ""}
        </span>
      </div>

      {results.length ? (
        <div className={styles.results} role="listbox" aria-label="Search results">
          {results.map((r) => (
            <Link key={r.id} href={`/exams/${r.slug}`} className={styles.result}>
              {r.name}
              {r.conducting_body ? (
                <span className={styles.small}>{r.conducting_body}</span>
              ) : null}
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  );
}
