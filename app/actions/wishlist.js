"use server";

import { revalidatePath } from "next/cache";
import { createClientOptional } from "@/lib/supabase/server";
import { getAuthUser } from "@/lib/auth/server";
import { ensureWishlist, addWishlistItem, removeWishlistItem, getWishlistForUser } from "@/lib/services/wishlist";

function isUuid(id) {
  return typeof id === "string" && /^[0-9a-f-]{36}$/i.test(id);
}

export async function fetchUserWishlist() {
  const user = await getAuthUser();
  const supabase = await createClientOptional();
  if (!user || !supabase) return { ok: true, wishlist: null };
  const { data, error } = await getWishlistForUser(supabase, user.id);
  return { ok: true, wishlist: data, error: error?.message };
}

export async function addToWishlist(productId) {
  if (!isUuid(productId)) {
    return { ok: false, error: "Save unavailable for this catalog item." };
  }
  const user = await getAuthUser();
  const supabase = await createClientOptional();
  if (!user || !supabase) {
    return { ok: false, guest: true };
  }
  const { data: wl, error: wlErr } = await ensureWishlist(supabase, user.id);
  if (wlErr || !wl?.id) return { ok: false, error: wlErr?.message || "Wishlist error" };
  const { error } = await addWishlistItem(supabase, wl.id, productId);
  if (error) return { ok: false, error: error.message };
  revalidatePath("/wishlist");
  return { ok: true };
}

export async function removeFromWishlist(productId) {
  const user = await getAuthUser();
  const supabase = await createClientOptional();
  if (!user || !supabase) return { ok: false, error: "Not signed in." };
  const { data: wl } = await getWishlistForUser(supabase, user.id);
  if (!wl?.id) return { ok: true };
  const { error } = await removeWishlistItem(supabase, wl.id, productId);
  if (error) return { ok: false, error: error.message };
  revalidatePath("/wishlist");
  return { ok: true };
}

export async function mergeGuestWishlist(slugs = []) {
  const user = await getAuthUser();
  const supabase = await createClientOptional();
  if (!user || !supabase || !slugs?.length) return { ok: true };

  const { data: wl, error: wlErr } = await ensureWishlist(supabase, user.id);
  if (wlErr || !wl?.id) return { ok: false, error: wlErr?.message };

  const { data: products } = await supabase.from("products").select("id, slug").in("slug", slugs);
  for (const p of products || []) {
    await addWishlistItem(supabase, wl.id, p.id);
  }
  revalidatePath("/wishlist");
  return { ok: true };
}
