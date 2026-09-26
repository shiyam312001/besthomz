export async function getApprovedReviewsForProduct(supabase, productId) {
  return supabase
    .from("reviews")
    .select("id, rating, title, review, created_at, profiles(full_name, avatar_url)")
    .eq("product_id", productId)
    .eq("status", "approved")
    .order("created_at", { ascending: false });
}

export async function createReview(supabase, payload) {
  return supabase.from("reviews").insert(payload).select("*").single();
}
