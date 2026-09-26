"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchCart } from "@/app/actions/cart";
import { CartView } from "@/components/cart/CartView";
import { PageContainer } from "@/components/layout/PageContainer";
import { LoadingSkeleton } from "@/components/ui/LoadingSkeleton";

export function CartPageClient() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetchCart();
    setCart(res.cart);
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

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
