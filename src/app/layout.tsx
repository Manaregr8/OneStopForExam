import type { Metadata } from "next";
import { GeistSans, GeistMono } from "geist/font";

import "./globals.scss";

import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { ThemeBootScript } from "@/components/ThemeBootScript";
import { SITE_NAME, getSiteUrl } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: getSiteUrl(),
  title: {
    default: `${SITE_NAME} – One-stop solution for every exam in India`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Exam-focused, exam-first knowledge platform for Indian competitive exams: eligibility, syllabus, exam pattern, preparation strategy, and previous year question papers.",
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${GeistSans.variable} ${GeistMono.variable}`}
    >
      <head>
        <ThemeBootScript />
      </head>
      <body>
        <SiteHeader />
        <main className="appMain">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
