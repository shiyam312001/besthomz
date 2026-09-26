import { site } from "@/config/site";

export function getSiteUrl() {
  const env = process.env.NEXT_PUBLIC_SITE_URL;
  if (env) return env.replace(/\/$/, "");
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}

export function absoluteUrl(path = "/") {
  const base = getSiteUrl();
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p}`;
}

export function defaultOg() {
  return {
    siteName: site.name,
    locale: "en_IN",
    images: [{ url: absoluteUrl("/BestHomz/Homepage/hero/01-hero-sofa.png"), width: 1200, height: 630, alt: site.name }],
  };
}
