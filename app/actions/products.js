"use server";

import { createClientOptional } from "@/lib/supabase/server";
import { importProductsToRecords } from "@/lib/catalog/load-import";
import { mapProductForCard } from "@/lib/utils/product-helpers";

export async function fetchProductsBySlugs(slugs = []) {
  const list = slugs.filter(Boolean);
  if (!list.length) return [];
  const order = new Map(list.map((slug, index) => [slug, index]));
  const importProducts = importProductsToRecords();
  const importedBySlug = new Map(importProducts.map((product) => [product.slug, product]));

  const supabase = await createClientOptional();
  if (supabase) {
    const { data } = await supabase
      .from("products")
      .select(
        `id, slug, name, short_description, price, price_uncertain, is_featured, is_new, is_bestseller, is_customizable, material_summary, dimensions, colours,
        product_images(image_url, is_primary, sort_order), categories(name, slug),
        product_features(feature, description), product_specifications(specification_name, specification_value)`,
      )
      .in("slug", list)
      .eq("status", "active");
    const productsBySlug = new Map((data || []).map((product) => [product.slug, product]));
    return list
      .map((slug) => {
        const product = productsBySlug.get(slug);
        const imported = importedBySlug.get(slug);
        if (!product && !imported) return null;
        if (!product) return mapProductForCard(imported);
        const dbImageCount = product.product_images?.length ?? 0;
        const importImageCount = imported?.product_images?.length ?? 0;
        const useImportImages =
          importImageCount >= 4 || importImageCount > dbImageCount;
        const merged = {
          ...product,
          name: imported?.name || product.name,
          short_description: imported?.short_description || product.short_description,
          price: imported?.price ?? product.price ?? null,
          price_uncertain: imported?.price_uncertain ?? product.price_uncertain ?? true,
          thumbnail_url: imported?.thumbnail_url || product.thumbnail_url || null,
          categories: imported?.categories || product.categories,
          material_summary: imported?.material_summary ?? product.material_summary,
          dimensions: imported?.dimensions ?? product.dimensions,
          colours: imported?.colours ?? product.colours ?? [],
          product_images: useImportImages
            ? imported.product_images
            : product.product_images,
        };
        return {
          ...mapProductForCard(merged),
          product_features: merged.product_features,
          product_specifications: merged.product_specifications,
          material_summary: merged.material_summary,
          is_customizable: merged.is_customizable,
          dimensions: merged.dimensions,
        };
      })
      .filter(Boolean)
      .sort((a, b) => (order.get(a.slug) ?? 999) - (order.get(b.slug) ?? 999));
  }

  return importProducts
    .filter((p) => list.includes(p.slug))
    .map(mapProductForCard)
    .sort((a, b) => (order.get(a.slug) ?? 999) - (order.get(b.slug) ?? 999));
}

export async function fetchSuggestedProducts({ excludeSlugs = [], limit = 5 } = {}) {
  const exclude = new Set(excludeSlugs.filter(Boolean));
  const supabase = await createClientOptional();

  if (supabase) {
    const thumbnailBySlug = new Map(
      importProductsToRecords().map((product) => [product.slug, product.thumbnail_url]),
    );
    const { data } = await supabase
      .from("products")
      .select(
        `id, slug, name, short_description, is_featured, is_new, is_bestseller, material_summary,
        product_images(image_url, is_primary), categories(name, slug)`,
      )
      .eq("status", "active")
      .order("is_featured", { ascending: false })
      .limit(Math.max(limit * 3, 12));
    const mapped = (data || [])
      .filter((p) => !exclude.has(p.slug))
      .slice(0, limit)
      .map((p) =>
        mapProductForCard({
          ...p,
          thumbnail_url: thumbnailBySlug.get(p.slug) || p.thumbnail_url,
        }),
      );
    if (mapped.length) return mapped;
  }

  const imported = importProductsToRecords();
  return imported
    .filter((p) => !exclude.has(p.slug))
    .slice(0, limit)
    .map(mapProductForCard);
}
