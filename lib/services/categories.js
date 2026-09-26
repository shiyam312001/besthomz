export async function getActiveCategories(supabase) {
  return supabase
    .from("categories")
    .select("*")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });
}

export async function getCategoryBySlug(supabase, slug) {
  return supabase
    .from("categories")
    .select("*")
    .eq("slug", slug)
    .eq("is_active", true)
    .maybeSingle();
}

export async function getSubcategoriesByCategoryId(supabase, categoryId) {
  return supabase
    .from("subcategories")
    .select("*")
    .eq("category_id", categoryId)
    .eq("is_active", true)
    .order("sort_order", { ascending: true });
}
