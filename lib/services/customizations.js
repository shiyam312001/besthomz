export async function createCustomization(supabase, payload) {
  return supabase.from("customizations").insert(payload).select("*").single();
}

export async function getCustomizationsForUser(supabase, userId) {
  return supabase
    .from("customizations")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });
}

export async function addCustomizationItems(supabase, customizationId, items) {
  const rows = items.map((item) => ({ ...item, customization_id: customizationId }));
  return supabase.from("customization_items").insert(rows).select("*");
}
