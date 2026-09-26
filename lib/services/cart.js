const CART_SELECT = `
  *,
  cart_items(
    id, quantity, customization_data, product_id, variant_id,
    products(
      id, slug, name, short_description,
      product_images(image_url, is_primary, sort_order),
      categories(name, slug)
    ),
    product_variants(id, name)
  )
`;

export async function getActiveCartForUser(supabase, userId) {
  return supabase
    .from("carts")
    .select(CART_SELECT)
    .eq("user_id", userId)
    .eq("status", "active")
    .maybeSingle();
}

export async function getActiveCartForSession(supabase, sessionId) {
  return supabase
    .from("carts")
    .select(CART_SELECT)
    .eq("session_id", sessionId)
    .eq("status", "active")
    .is("user_id", null)
    .maybeSingle();
}

export async function createUserCart(supabase, userId) {
  return supabase.from("carts").insert({ user_id: userId, status: "active" }).select("id").single();
}

export async function createSessionCart(supabase, sessionId) {
  return supabase
    .from("carts")
    .insert({ session_id: sessionId, status: "active" })
    .select("id")
    .single();
}

export async function getCartById(supabase, cartId) {
  return supabase.from("carts").select(CART_SELECT).eq("id", cartId).maybeSingle();
}

export async function upsertCartLine(supabase, cartId, { productId, variantId = null, quantity = 1, customizationData = {} }) {
  let query = supabase
    .from("cart_items")
    .select("id, quantity")
    .eq("cart_id", cartId)
    .eq("product_id", productId);
  if (variantId) query = query.eq("variant_id", variantId);
  else query = query.is("variant_id", null);

  const found = await query.maybeSingle();
  if (found.data?.id) {
    const newQty = found.data.quantity + quantity;
    return supabase.from("cart_items").update({ quantity: newQty }).eq("id", found.data.id).select("*").single();
  }

  return supabase
    .from("cart_items")
    .insert({
      cart_id: cartId,
      product_id: productId,
      variant_id: variantId,
      quantity,
      customization_data: customizationData,
    })
    .select("*")
    .single();
}

export async function updateCartLineQuantity(supabase, itemId, quantity) {
  if (quantity <= 0) {
    return supabase.from("cart_items").delete().eq("id", itemId);
  }
  return supabase.from("cart_items").update({ quantity }).eq("id", itemId).select("*").single();
}

export async function removeCartLine(supabase, itemId) {
  return supabase.from("cart_items").delete().eq("id", itemId);
}

export async function markCartConverted(supabase, cartId) {
  return supabase.from("carts").update({ status: "converted" }).eq("id", cartId);
}
