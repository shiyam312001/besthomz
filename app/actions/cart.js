"use server";

import { revalidatePath } from "next/cache";
import { createClientOptional } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { getAuthUser } from "@/lib/auth/server";
import { getOrCreateCartSessionId, getCartSessionId, clearCartSessionCookie } from "@/lib/session/cart-session";
import {
  getActiveCartForUser,
  getActiveCartForSession,
  createUserCart,
  createSessionCart,
  upsertCartLine,
  updateCartLineQuantity,
  removeCartLine,
} from "@/lib/services/cart";

function isUuid(id) {
  return typeof id === "string" && /^[0-9a-f-]{36}$/i.test(id);
}

async function getUserClient() {
  return createClientOptional();
}

async function getGuestAdmin() {
  try {
    return createAdminClient();
  } catch {
    return null;
  }
}

async function ensureUserCart(supabase, userId) {
  const existing = await getActiveCartForUser(supabase, userId);
  if (existing.data?.id) return existing.data.id;
  const created = await createUserCart(supabase, userId);
  return created.data?.id;
}

async function ensureSessionCart(admin, sessionId) {
  const existing = await getActiveCartForSession(admin, sessionId);
  if (existing.data?.id) return existing.data.id;
  const created = await createSessionCart(admin, sessionId);
  return created.data?.id;
}

export async function fetchCart() {
  const user = await getAuthUser();
  const supabase = await getUserClient();

  if (user && supabase) {
    const { data, error } = await getActiveCartForUser(supabase, user.id);
    return { ok: true, cart: data, error: error?.message };
  }

  const admin = await getGuestAdmin();
  const sessionId = await getCartSessionId();
  if (!admin || !sessionId) {
    return { ok: true, cart: null };
  }
  const { data, error } = await getActiveCartForSession(admin, sessionId);
  return { ok: true, cart: data, error: error?.message };
}

export async function addToCart({ productId, variantId = null, quantity = 1 }) {
  if (!isUuid(productId)) {
    return { ok: false, error: "Sign in or import catalog to save this item." };
  }

  const user = await getAuthUser();
  const supabase = await getUserClient();

  if (user && supabase) {
    const cartId = await ensureUserCart(supabase, user.id);
    if (!cartId) return { ok: false, error: "Could not create cart." };
    const { error } = await upsertCartLine(supabase, cartId, {
      productId,
      variantId,
      quantity,
    });
    if (error) return { ok: false, error: error.message };
    revalidatePath("/cart");
    return { ok: true };
  }

  const admin = await getGuestAdmin();
  if (!admin) return { ok: false, error: "Cart unavailable. Please try again later." };
  const sessionId = await getOrCreateCartSessionId();
  const cartId = await ensureSessionCart(admin, sessionId);
  if (!cartId) return { ok: false, error: "Could not create cart." };
  const { error } = await upsertCartLine(admin, cartId, { productId, variantId, quantity });
  if (error) return { ok: false, error: error.message };
  revalidatePath("/cart");
  return { ok: true };
}

export async function setCartItemQuantity(itemId, quantity) {
  const user = await getAuthUser();
  const supabase = await getUserClient();
  const client = user && supabase ? supabase : await getGuestAdmin();
  if (!client) return { ok: false, error: "Cart unavailable." };

  const { error } = await updateCartLineQuantity(client, itemId, quantity);
  if (error) return { ok: false, error: error.message };
  revalidatePath("/cart");
  return { ok: true };
}

export async function removeFromCart(itemId) {
  const user = await getAuthUser();
  const supabase = await getUserClient();
  const client = user && supabase ? supabase : await getGuestAdmin();
  if (!client) return { ok: false, error: "Cart unavailable." };

  const { error } = await removeCartLine(client, itemId);
  if (error) return { ok: false, error: error.message };
  revalidatePath("/cart");
  return { ok: true };
}

export async function clearCart() {
  const res = await fetchCart();
  const items = res.cart?.cart_items || [];
  if (!items.length) return { ok: true };

  const user = await getAuthUser();
  const supabase = await getUserClient();
  const client = user && supabase ? supabase : await getGuestAdmin();
  if (!client) return { ok: false, error: "Cart unavailable." };

  for (const line of items) {
    const { error } = await removeCartLine(client, line.id);
    if (error) return { ok: false, error: error.message };
  }
  revalidatePath("/cart");
  return { ok: true };
}

export async function mergeGuestCartOnLogin() {
  const user = await getAuthUser();
  const supabase = await getUserClient();
  const admin = await getGuestAdmin();
  const sessionId = await getCartSessionId();
  if (!user || !supabase || !admin || !sessionId) return { ok: true };

  const guestCart = await getActiveCartForSession(admin, sessionId);
  if (!guestCart.data?.cart_items?.length) {
    await clearCartSessionCookie();
    return { ok: true };
  }

  const userCartId = await ensureUserCart(supabase, user.id);
  for (const line of guestCart.data.cart_items) {
    await upsertCartLine(supabase, userCartId, {
      productId: line.product_id,
      variantId: line.variant_id,
      quantity: line.quantity,
      customizationData: line.customization_data || {},
    });
  }

  await admin.from("carts").update({ status: "abandoned" }).eq("id", guestCart.data.id);
  await clearCartSessionCookie();
  revalidatePath("/cart");
  return { ok: true };
}
