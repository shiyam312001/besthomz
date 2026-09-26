"use server";

import { createClientOptional } from "@/lib/supabase/server";
import { loadProductsImport } from "@/lib/catalog/load-import";
import { mapProductForCard } from "@/lib/utils/product-helpers";

export async function fetchProductsBySlugs(slugs = []) {
  const list = slugs.filter(Boolean);
  if (!list.length) return [];

  const supabase = await createClientOptional();
  if (supabase) {
    const { data } = await supabase
      .from("products")
      .select(
        `id, slug, name, short_description, is_featured, is_new, is_bestseller, is_customizable, material_summary, dimensions,
        product_images(image_url, is_primary), categories(name, slug),
        product_features(feature, description), product_specifications(specification_name, specification_value)`,
      )
      .in("slug", list)
      .eq("status", "active");
    return (data || []).map((p) => ({
      ...mapProductForCard(p),
      product_features: p.product_features,
      product_specifications: p.product_specifications,
      material_summary: p.material_summary,
      is_customizable: p.is_customizable,
      dimensions: p.dimensions,
    }));
  }

  const imported = loadProductsImport();
  return imported
    .filter((p) => list.includes(p.slug))
    .map((p) =>
      mapProductForCard({
        id: p.id,
        slug: p.slug,
        name: p.name,
        short_description: p.short_description,
        product_images: [{ image_url: p.image_url, is_primary: true }],
        categories: { name: p.category_name, slug: p.category_slug },
      }),
    );
}

export async function fetchSuggestedProducts({ excludeSlugs = [], limit = 5 } = {}) {
  const exclude = new Set(excludeSlugs.filter(Boolean));
  const supabase = await createClientOptional();

  if (supabase) {
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
      .map((p) => mapProductForCard(p));
    if (mapped.length) return mapped;
  }

  const imported = loadProductsImport();
  return imported
    .filter((p) => !exclude.has(p.slug))
    .slice(0, limit)
    .map((p) =>
      mapProductForCard({
        id: p.id,
        slug: p.slug,
        name: p.name,
        short_description: p.short_description,
        material_summary: p.material_summary,
        product_images: [{ image_url: p.image_url, is_primary: true }],
        categories: { name: p.category_name, slug: p.category_slug },
      }),
    );
}
