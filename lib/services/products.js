const PRODUCT_LIST_FIELDS =
  "id, slug, name, short_description, category_id, is_featured, is_new, is_bestseller, is_customizable, is_quote_enabled, material_summary";

export async function getActiveProducts(supabase, { limit = 24, offset = 0 } = {}) {
  return supabase
    .from("products")
    .select(`${PRODUCT_LIST_FIELDS}, product_images(image_url, alt_text, is_primary, sort_order)`)
    .eq("status", "active")
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);
}

export async function getProductBySlug(supabase, slug) {
  return supabase
    .from("products")
    .select(
      `*,
      product_images(*),
      product_variants(*),
      product_features(*),
      product_specifications(*),
      categories(id, name, slug),
      subcategories(id, name, slug)`,
    )
    .eq("slug", slug)
    .eq("status", "active")
    .maybeSingle();
}

export async function getProductsByCategorySlug(supabase, categorySlug, { limit = 24, offset = 0 } = {}) {
  const { data: category } = await supabase
    .from("categories")
    .select("id")
    .eq("slug", categorySlug)
    .eq("is_active", true)
    .maybeSingle();

  if (!category) {
    return { data: [], error: null };
  }

  return supabase
    .from("products")
    .select(`${PRODUCT_LIST_FIELDS}, product_images(image_url, alt_text, is_primary, sort_order)`)
    .eq("status", "active")
    .eq("category_id", category.id)
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);
}
