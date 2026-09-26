import { createClientOptional } from "@/lib/supabase/server";
import { absoluteUrl } from "@/lib/seo/site-url";
import { loadProductsImport } from "@/lib/catalog/load-import";

const STATIC = [
  "",
  "/furniture",
  "/rooms",
  "/collections",
  "/customize",
  "/offers",
  "/about",
  "/contact",
];

export default async function sitemap() {
  const base = absoluteUrl("");
  const entries = STATIC.map((path) => ({
    url: `${base}${path}`,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));

  const supabase = await createClientOptional();
  if (supabase) {
    const [products, categories, rooms, collections] = await Promise.all([
      supabase.from("products").select("slug, updated_at").eq("status", "active"),
      supabase.from("categories").select("slug, updated_at").eq("is_active", true),
      supabase.from("rooms").select("slug, updated_at").eq("is_active", true),
      supabase.from("collections").select("slug, updated_at").eq("is_active", true),
    ]);
    for (const p of products.data || []) {
      entries.push({ url: absoluteUrl(`/product/${p.slug}`), lastModified: p.updated_at, changeFrequency: "weekly", priority: 0.8 });
    }
    for (const c of categories.data || []) {
      entries.push({ url: absoluteUrl(`/furniture/${c.slug}`), lastModified: c.updated_at, changeFrequency: "weekly", priority: 0.75 });
    }
    for (const r of rooms.data || []) {
      entries.push({ url: absoluteUrl(`/rooms/${r.slug}`), lastModified: r.updated_at, changeFrequency: "monthly", priority: 0.65 });
    }
    for (const c of collections.data || []) {
      entries.push({ url: absoluteUrl(`/collections/${c.slug}`), lastModified: c.updated_at, changeFrequency: "monthly", priority: 0.65 });
    }
  } else {
    const imported = loadProductsImport();
    for (const p of imported) {
      entries.push({ url: absoluteUrl(`/product/${p.slug}`), changeFrequency: "weekly", priority: 0.8 });
    }
  }

  return entries;
}
