const WISHLIST_SELECT = `
  id,
  wishlist_items(
    created_at,
    product_id,
    products(
      id, slug, name, short_description,
      product_images(image_url, is_primary, sort_order),
      categories(name, slug)
    )
  )
`;

export async function getWishlistForUser(supabase, userId) {
  return supabase.from("wishlists").select(WISHLIST_SELECT).eq("user_id", userId).maybeSingle();
}

export async function ensureWishlist(supabase, userId) {
  const existing = await supabase.from("wishlists").select("id").eq("user_id", userId).maybeSingle();
  if (existing.data?.id) return { data: existing.data, error: null };

  return supabase.from("wishlists").insert({ user_id: userId }).select("id").single();
}

export async function addWishlistItem(supabase, wishlistId, productId) {
  return supabase
    .from("wishlist_items")
    .upsert({ wishlist_id: wishlistId, product_id: productId }, { onConflict: "wishlist_id,product_id" })
    .select("*");
}

export async function removeWishlistItem(supabase, wishlistId, productId) {
  return supabase
    .from("wishlist_items")
    .delete()
    .eq("wishlist_id", wishlistId)
    .eq("product_id", productId);
}
