"use client";

import { useEffect } from "react";
import { syncGuestCommerceState } from "@/app/actions/commerce-sync";
import { clearGuestWishlist, getGuestWishlistSlugs } from "@/lib/commerce/client-storage";
import { useCommerce } from "@/components/providers/CommerceProvider";

/** Sync guest wishlist slugs + quote claims after login without full page dependency on login form. */
export function GuestCommerceSync() {
  const { setWishlistCount } = useCommerce();

  useEffect(() => {
    const slugs = getGuestWishlistSlugs();
    if (!slugs.length) {
      syncGuestCommerceState([]).then((r) => {
        if (r.authenticated && r.wishlistCount != null) setWishlistCount(r.wishlistCount);
      });
      return;
    }
    syncGuestCommerceState(slugs).then((r) => {
      if (r.clearLocalWishlist) clearGuestWishlist();
      if (r.wishlistCount != null) setWishlistCount(r.wishlistCount);
    });
  }, [setWishlistCount]);

  return null;
}
