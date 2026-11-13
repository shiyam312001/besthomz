"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchCart, fetchImportedCartProducts } from "@/app/actions/cart";
import { CartView } from "@/components/cart/CartView";
import { useCommerce } from "@/components/providers/CommerceProvider";
import { PageContainer } from "@/components/layout/PageContainer";
import { LoadingSkeleton } from "@/components/ui/LoadingSkeleton";
import { getGuestCartItems } from "@/lib/commerce/client-storage";

async function fetchCombinedCart() {
  const res = await fetchCart();
  const guestItems = getGuestCartItems();
  const guestProducts = await fetchImportedCartProducts(guestItems.map((item) => item.slug));
  const productsBySlug = new Map(guestProducts.map((product) => [product.slug, product]));
  const guestCartItems = guestItems.flatMap((item) => {
    const product = productsBySlug.get(item.slug);
    return product
      ? [
          {
            id: `guest-${item.slug}`,
            product_id: product.id,
            variant_id: null,
            quantity: item.quantity,
            products: product,
            is_guest_import: true,
          },
        ]
      : [];
  });
  return {
    cart: { ...(res.cart || {}), cart_items: [...(res.cart?.cart_items || []), ...guestCartItems] },
  };
}

export function CartPageClient() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { setCartCount } = useCommerce();

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetchCombinedCart();
    const cartItems = res.cart.cart_items;
    setCart(res.cart);
    setCartCount(cartItems.reduce((count, item) => count + (item.quantity || 0), 0));
    setLoading(false);
  }, [setCartCount]);

  useEffect(() => {
    let active = true;
    const run = async () => {
      const res = await fetchCombinedCart();
      if (!active) return;
      const cartItems = res.cart.cart_items;
      setCart(res.cart);
      setCartCount(cartItems.reduce((count, item) => count + (item.quantity || 0), 0));
      setLoading(false);
    };
    run();
    return () => {
      active = false;
    };
  }, [setCartCount]);

  const onChanged = () => {
    load();
    router.refresh();
  };

  if (loading) {
    return (
      <PageContainer>
        <LoadingSkeleton className="h-56 w-full rounded-3xl bh-glass-subtle md:h-64" />
      </PageContainer>
    );
  }
  return <CartView cart={cart} onChanged={onChanged} />;
}
