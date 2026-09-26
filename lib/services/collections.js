export async function getActiveCollections(supabase) {
  return supabase
    .from("collections")
    .select("*")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });
}

export async function getCollectionBySlug(supabase, slug) {
  return supabase
    .from("collections")
    .select(
      `*,
      collection_products(
        sort_order,
        products(id, slug, name, short_description, product_images(image_url, is_primary))
      )`,
    )
    .eq("slug", slug)
    .eq("is_active", true)
    .maybeSingle();
}
