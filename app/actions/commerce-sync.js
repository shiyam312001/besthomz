"use server";

import { getAuthUser } from "@/lib/auth/server";
import { claimGuestQuotesForUser } from "@/app/actions/guest-quotes";
import { mergeGuestWishlist } from "@/app/actions/wishlist";
import { fetchUserWishlist } from "@/app/actions/wishlist";

/** Called from client on mount when user may be logged in — sync guest wishlist slugs + quote claims. */
export async function syncGuestCommerceState(guestWishlistSlugs = []) {
  const user = await getAuthUser();
  if (!user) return { ok: false, authenticated: false };

  if (guestWishlistSlugs?.length) {
    await mergeGuestWishlist(guestWishlistSlugs);
  }
  await claimGuestQuotesForUser();

  const wl = await fetchUserWishlist();
  const wishlistCount = wl.wishlist?.wishlist_items?.length ?? 0;

  return { ok: true, authenticated: true, clearLocalWishlist: true, wishlistCount };
}
