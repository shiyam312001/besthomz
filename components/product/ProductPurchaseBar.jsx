"use client";

import { Heart, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useQuote } from "@/components/providers/QuoteProvider";
import { useCommerce } from "@/components/providers/CommerceProvider";
import { SHOW_PRICES, CHECKOUT_ENABLED } from "@/config/pricing";
import { useRouter } from "next/navigation";

export function ProductPurchaseBar({ product }) {
  const { openQuote } = useQuote();
  const { addToCart, toggleWishlist } = useCommerce();
  const router = useRouter();

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 pb-[env(safe-area-inset-bottom)] md:hidden">
      <div className="mx-3 mb-3 flex gap-2 rounded-2xl p-2 bh-glass-panel bh-shadow-soft">
        <button
          type="button"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/90 shadow-[0_4px_12px_rgba(27,61,47,0.08)] bh-focus-ring"
          aria-label="Add to wishlist"
          onClick={() => toggleWishlist({ productId: product.id, slug: product.slug })}
        >
          <Heart className="h-5 w-5" strokeWidth={1.75} />
        </button>
        <Button
          variant="outline"
          className="flex-1 !border-0 bg-white/90 shadow-[0_4px_12px_rgba(27,61,47,0.08)]"
          onClick={() => addToCart({ productId: product.id })}
          icon={<ShoppingBag className="h-4 w-4" />}
        >
          Add to Cart
        </Button>
        {SHOW_PRICES && CHECKOUT_ENABLED ? (
          <Button
            className="flex-1"
            onClick={async () => {
              await addToCart({ productId: product.id });
              router.push("/checkout");
            }}
          >
            Buy now
          </Button>
        ) : (
          <Button
            className="flex-1"
            onClick={() =>
              openQuote({
                productId: product.id,
                productName: product.name,
                quantity: 1,
              })
            }
          >
            Get Quote
          </Button>
        )}
      </div>
    </div>
  );
}
