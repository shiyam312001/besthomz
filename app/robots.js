import { absoluteUrl } from "@/lib/seo/site-url";

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/admin/",
        "/account/",
        "/cart",
        "/wishlist",
        "/compare",
        "/login",
        "/signup",
        "/forgot-password",
        "/reset-password",
        "/search",
      ],
    },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
