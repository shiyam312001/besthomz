"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { addToCart as addToCartAction } from "@/app/actions/cart";
import { addToWishlist as addToWishlistAction, removeFromWishlist } from "@/app/actions/wishlist";
import { toggleGuestWishlistSlug, getGuestWishlistSlugs } from "@/lib/commerce/client-storage";
import { useToast } from "@/components/providers/ToastProvider";

const CommerceContext = createContext(null);

export function CommerceProvider({ children, initialCartCount = 0, initialWishlistCount = 0 }) {
  const { toast } = useToast();
  const [cartCount, setCartCount] = useState(initialCartCount);
  const [wishlistCount, setWishlistCount] = useState(initialWishlistCount);

  useEffect(() => {
    setWishlistCount(getGuestWishlistSlugs().length);
  }, []);

  const addToCart = useCallback(
    async ({ productId }) => {
      const result = await addToCartAction({ productId, quantity: 1 });
      if (!result.ok) {
        toast(result.error || "Could not add to cart");
        return result;
      }
      setCartCount((c) => c + 1);
      toast("Added to cart");
      return result;
    },
    [toast],
  );

  const toggleWishlist = useCallback(
    async ({ productId, slug, isSaved }) => {
      if (productId && /^[0-9a-f-]{36}$/i.test(productId)) {
        if (isSaved) {
          const res = await removeFromWishlist(productId);
          if (res.ok) {
            setWishlistCount((c) => Math.max(0, c - 1));
            toast("Removed from wishlist");
          }
          return res;
        }
        const res = await addToWishlistAction(productId);
        if (res.guest) {
          if (slug) {
            const list = toggleGuestWishlistSlug(slug);
            setWishlistCount(list.length);
            toast("Saved to wishlist on this device");
          }
          return res;
        }
        if (res.ok) {
          setWishlistCount((c) => c + 1);
          toast("Added to wishlist");
        } else toast(res.error || "Could not save");
        return res;
      }
      if (slug) {
        const list = toggleGuestWishlistSlug(slug);
        setWishlistCount(list.length);
        toast(list.includes(slug) ? "Added to wishlist" : "Removed from wishlist");
      }
      return { ok: true };
    },
    [toast],
  );

  const value = useMemo(
    () => ({ cartCount, wishlistCount, setCartCount, setWishlistCount, addToCart, toggleWishlist }),
    [cartCount, wishlistCount, addToCart, toggleWishlist],
  );

  return <CommerceContext.Provider value={value}>{children}</CommerceContext.Provider>;
}

export function useCommerce() {
  const ctx = useContext(CommerceContext);
  if (!ctx) throw new Error("useCommerce must be used within CommerceProvider");
  return ctx;
}
