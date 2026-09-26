"use client";

import { ArrowRight, Heart, ShoppingBag } from "lucide-react";
import { useQuote } from "@/components/providers/QuoteProvider";
import { useCommerce } from "@/components/providers/CommerceProvider";
import { SHOW_PRICES, CHECKOUT_ENABLED } from "@/config/pricing";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/cn";

export function ProductPurchaseBar({ product }) {
  const { openQuote } = useQuote();
  const { addToCart, toggleWishlist } = useCommerce();
  const router = useRouter();

  const openProductQuote = () =>
    openQuote({
      productId: product.id,
      productName: product.name,
      quantity: 1,
    });

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 md:hidden">
      <div
        className={cn(
          "border-0 bg-white/95 px-3 pt-2.5 shadow-[0_-12px_40px_rgba(27,61,47,0.12)] backdrop-blur-xl",
          "pb-[max(0.5rem,env(safe-area-inset-bottom,0px))]",
        )}
      >
        <div className="mx-auto flex max-w-lg items-stretch gap-2.5">
          <button
            type="button"
            className="flex h-12 w-12 shrink-0 items-center justify-center self-center rounded-full bg-bh-cream/90 text-bh-charcoal shadow-[0_4px_14px_rgba(27,61,47,0.08)] bh-focus-ring"
            aria-label="Add to wishlist"
            onClick={() => toggleWishlist({ productId: product.id, slug: product.slug })}
          >
            <Heart className="h-5 w-5" strokeWidth={1.75} />
          </button>

          <button
            type="button"
            onClick={() => addToCart({ productId: product.id })}
            className="inline-flex h-12 min-h-12 min-w-0 flex-1 items-center justify-center gap-2 rounded-full bg-bh-sage/95 px-4 text-[0.9375rem] font-semibold leading-none text-bh-green shadow-[inset_0_1px_0_rgba(255,255,255,0.55)] bh-focus-ring"
          >
            <ShoppingBag className="h-[1.125rem] w-[1.125rem] shrink-0" aria-hidden />
            <span className="truncate">Add to Cart</span>
          </button>

          {SHOW_PRICES && CHECKOUT_ENABLED ? (
            <button
              type="button"
              onClick={async () => {
                await addToCart({ productId: product.id });
                router.push("/checkout");
              }}
              className="inline-flex h-12 min-h-12 min-w-0 flex-1 items-center justify-center gap-1.5 rounded-full bg-bh-green px-4 text-[0.9375rem] font-semibold leading-none text-white shadow-[0_8px_22px_rgba(27,61,47,0.22)] bh-focus-ring"
            >
              <span className="truncate">Buy now</span>
              <ArrowRight className="h-[1.125rem] w-[1.125rem] shrink-0" aria-hidden />
            </button>
          ) : (
            <button
              type="button"
              onClick={openProductQuote}
              className="inline-flex h-12 min-h-12 min-w-0 flex-1 items-center justify-center gap-1.5 rounded-full bg-bh-green px-4 text-[0.9375rem] font-semibold leading-none text-white shadow-[0_8px_22px_rgba(27,61,47,0.22)] bh-focus-ring"
            >
              <span className="truncate">Get Quote</span>
              <ArrowRight className="h-[1.125rem] w-[1.125rem] shrink-0" aria-hidden />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
