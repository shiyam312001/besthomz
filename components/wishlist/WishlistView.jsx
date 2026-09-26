"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Heart } from "lucide-react";
import { ProductGrid } from "@/components/product/ProductGrid";
import { EmptyState } from "@/components/ui/EmptyState";
import { PageContainer } from "@/components/layout/PageContainer";
import { CartRecommendations } from "@/components/cart/CartRecommendations";
import { CommerceBottomCta } from "@/components/commerce/CommerceBottomCta";
import { useQuote } from "@/components/providers/QuoteProvider";
import { getGuestWishlistSlugs } from "@/lib/commerce/client-storage";
import { mapProductForCard } from "@/lib/utils/product-helpers";
import { fetchProductsBySlugs } from "@/app/actions/products";

export function WishlistView({ serverProducts = [], isLoggedIn }) {
  const [guestProducts, setGuestProducts] = useState([]);
  const { openQuote } = useQuote();

  useEffect(() => {
    if (isLoggedIn) return;
    const slugs = getGuestWishlistSlugs();
    if (!slugs.length) return;
    fetchProductsBySlugs(slugs).then(setGuestProducts);
  }, [isLoggedIn]);

  const fromServer = serverProducts.map((item) => mapProductForCard(item.products || item));
  const products = isLoggedIn ? fromServer : guestProducts;
  const excludeSlugs = products.map((p) => p.slug).filter(Boolean);

  if (!products.length) {
    return (
      <>
        <PageContainer>
        <div className="rounded-3xl px-6 py-12 bh-glass-panel md:px-10 md:py-14">
          <EmptyState
            className="border-0 bg-transparent py-8"
            title="Your wishlist is empty"
            description="Save pieces you love and request a quote anytime."
            actionHref="/furniture"
            actionLabel="Explore furniture"
            icon={<Heart className="h-7 w-7" strokeWidth={1.5} aria-hidden />}
          />
        </div>
        </PageContainer>
        <CartRecommendations />
        <CommerceBottomCta />
      </>
    );
  }

  const quoteItems = products
    .filter((p) => p.id && /^[0-9a-f-]{36}$/i.test(String(p.id)))
    .map((p) => ({
      product_id: p.id,
      product_name: p.name,
      quantity: 1,
    }));

  return (
    <>
      <PageContainer>
      {!isLoggedIn && (
        <p className="mb-6 rounded-2xl px-4 py-3 text-sm text-bh-charcoal bh-glass-subtle md:rounded-3xl md:px-5">
          Saved on this device.{" "}
          <Link href="/login" className="font-semibold text-bh-green underline-offset-2 hover:underline">
            Sign in
          </Link>{" "}
          to sync across devices.
        </p>
      )}

      <div className="mb-6 flex flex-wrap items-end justify-between gap-4 md:mb-8">
        <div>
          <h2 className="font-display text-lg font-semibold text-bh-charcoal md:text-xl">
            Saved Items ({products.length})
          </h2>
          <p className="mt-1 text-sm text-bh-muted">
            Use Get Quote or Add to Cart on each card — pricing is shared after review.
          </p>
        </div>
        {quoteItems.length > 0 && (
          <button
            type="button"
            onClick={() =>
              openQuote({
                cartItems: quoteItems,
                furnitureRequirement: "Wishlist quote request",
              })
            }
            className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-bh-green px-5 text-sm font-semibold text-white shadow-[0_10px_28px_rgba(27,61,47,0.22)] bh-focus-ring"
          >
            Quote Saved Items
            <ArrowRight className="h-4 w-4" aria-hidden />
          </button>
        )}
      </div>

      <div className="rounded-2xl p-4 bh-glass-panel md:rounded-3xl md:p-6">
        <ProductGrid products={products} cardVariant="category" />
      </div>
      </PageContainer>

      <CartRecommendations excludeSlugs={excludeSlugs} />
      <CommerceBottomCta />
    </>
  );
}
