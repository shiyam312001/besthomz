import { createClientOptional } from "@/lib/supabase/server";
import { absoluteUrl } from "@/lib/seo/site-url";
import { loadProductsImport } from "@/lib/catalog/load-import";
import { FALLBACK_ROOMS } from "@/lib/catalog/rooms";
import { FALLBACK_COLLECTIONS } from "@/lib/catalog/collections";

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
  const seenUrls = new Set(entries.map((entry) => entry.url));
  const addEntry = (entry) => {
    if (!entry?.url || seenUrls.has(entry.url)) return;
    seenUrls.add(entry.url);
    entries.push(entry);
  };

  const supabase = await createClientOptional();
  const imported = loadProductsImport();
  const catalogCategories = new Map();
  for (const product of imported) {
    if (product.category_slug && product.category) {
      if (!catalogCategories.has(product.category_slug)) {
        catalogCategories.set(product.category_slug, product.category);
      }
    }
  }

  if (supabase) {
    const [products, categories, rooms, collections] = await Promise.all([
      supabase.from("products").select("slug, updated_at").eq("status", "active"),
      supabase.from("categories").select("slug, updated_at").eq("is_active", true),
      supabase.from("rooms").select("slug, updated_at").eq("is_active", true),
      supabase.from("collections").select("slug, updated_at").eq("is_active", true),
    ]);
    for (const p of products.data || []) {
      if (p.slug) addEntry({ url: absoluteUrl(`/product/${p.slug}`), lastModified: p.updated_at, changeFrequency: "weekly", priority: 0.8 });
    }
    for (const c of categories.data || []) {
      if (c.slug) addEntry({ url: absoluteUrl(`/furniture/${c.slug}`), lastModified: c.updated_at, changeFrequency: "weekly", priority: 0.75 });
    }
    for (const r of rooms.data || []) {
      if (r.slug) addEntry({ url: absoluteUrl(`/rooms/${r.slug}`), lastModified: r.updated_at, changeFrequency: "monthly", priority: 0.65 });
    }
    for (const c of collections.data || []) {
      if (c.slug) addEntry({ url: absoluteUrl(`/collections/${c.slug}`), lastModified: c.updated_at, changeFrequency: "monthly", priority: 0.65 });
    }
  }

  for (const product of imported) {
    if (product.slug) addEntry({ url: absoluteUrl(`/product/${product.slug}`), changeFrequency: "weekly", priority: 0.8 });
  }

  for (const [slug] of catalogCategories) {
    if (slug) addEntry({ url: absoluteUrl(`/furniture/${slug}`), changeFrequency: "weekly", priority: 0.75 });
  }
  for (const room of FALLBACK_ROOMS) {
    if (room.slug) addEntry({ url: absoluteUrl(`/rooms/${room.slug}`), changeFrequency: "monthly", priority: 0.65 });
  }
  for (const collection of FALLBACK_COLLECTIONS) {
    if (collection.slug) addEntry({ url: absoluteUrl(`/collections/${collection.slug}`), changeFrequency: "monthly", priority: 0.65 });
  }

  return entries;
}
