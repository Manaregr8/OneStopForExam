export const SITE_NAME = "ExamStop";
export const SITE_TAGLINE = "One-stop solution for every exam in India.";

export function getSiteUrl(): URL {
  const raw = process.env.NEXT_PUBLIC_SITE_URL;
  if (raw) return new URL(raw);
  return new URL("http://localhost:3000");
}

export function absoluteUrl(pathname: string): string {
  const url = getSiteUrl();
  url.pathname = pathname.startsWith("/") ? pathname : `/${pathname}`;
  url.search = "";
  url.hash = "";
  return url.toString();
}
