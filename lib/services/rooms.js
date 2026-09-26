export async function getActiveRooms(supabase) {
  return supabase
    .from("rooms")
    .select("*")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });
}

export async function getRoomBySlug(supabase, slug) {
  return supabase
    .from("rooms")
    .select("*")
    .eq("slug", slug)
    .eq("is_active", true)
    .maybeSingle();
}
