export async function getActiveOffers(supabase) {
  const now = new Date().toISOString();
  return supabase
    .from("offers")
    .select("*")
    .eq("is_active", true)
    .or(`starts_at.is.null,starts_at.lte.${now}`)
    .or(`ends_at.is.null,ends_at.gte.${now}`)
    .order("sort_order", { ascending: true });
}

export async function getOfferBySlug(supabase, slug) {
  return supabase.from("offers").select("*").eq("slug", slug).eq("is_active", true).maybeSingle();
}
