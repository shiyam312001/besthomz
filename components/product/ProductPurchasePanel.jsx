"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Heart, Minus, Plus, ShoppingBag } from "lucide-react";
import { useQuote } from "@/components/providers/QuoteProvider";
import { useCommerce } from "@/components/providers/CommerceProvider";
import { cn } from "@/lib/cn";
import {
  PDP_TRUST_MICRO,
  isMattressCategory,
} from "@/components/product/product-pdp-data";
import {
  ProductCategoryHelp,
  ProductCategoryDetails,
  ProductCategoryHighlights,
  ProductCategoryTrustIcons,
} from "@/components/product/ProductCategoryExperience";

export function ProductPurchasePanel({ product, category }) {
  const { openQuote } = useQuote();
  const { addToCart, toggleWishlist } = useCommerce();

  const isMattress = isMattressCategory(category);
  const isFixedSizeMattress =
    isMattress && /\b\d{2,3}\s*[x×]\s*\d{2,3}\b/i.test(`${product.name} ${product.sku || ""}`);

  const [qty, setQty] = useState(1);

  return (
    <div className="bh-ui flex flex-col xl:h-full">
      {category && (
        <Link href={`/furniture/${category.slug}`} className="text-xs font-semibold uppercase tracking-wide text-bh-green">
          {category.name}
        </Link>
      )}
      <h1 className={cn("bh-product-title", isMattress ? "mt-1" : "mt-2")}>{product.name}</h1>
      {product.short_description && (
        <p
          className={cn(
            "bh-type-body text-bh-muted",
            isMattress ? "mt-1 text-[0.65rem] leading-tight" : "mt-2",
          )}
        >
          {product.short_description}
        </p>
      )}

      <ProductCategoryDetails product={product} category={category} />
      <ProductCategoryHighlights product={product} category={category} />

      <div className={cn("flex flex-col gap-4", isMattress ? "mt-4" : "mt-8")}>
        {!isFixedSizeMattress && (
          <div className="inline-flex h-12 w-fit items-center self-center rounded-full px-1 bh-glass-panel lg:self-start">
            <button
              type="button"
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="flex h-10 w-10 items-center justify-center rounded-full text-bh-charcoal bh-focus-ring"
              aria-label="Decrease quantity"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="min-w-[2.5rem] text-center text-[length:var(--bh-text-body)] font-semibold text-bh-charcoal">
              {qty}
            </span>
            <button
              type="button"
              onClick={() => setQty((q) => Math.min(99, q + 1))}
              className="flex h-10 w-10 items-center justify-center rounded-full text-bh-charcoal bh-focus-ring"
              aria-label="Increase quantity"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        )}

        <div className="flex flex-col gap-3 max-lg:gap-3.5 sm:flex-row sm:items-stretch sm:gap-3">
          <button
            type="button"
            onClick={() => addToCart({ productId: product.id, quantity: qty })}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-bh-sage/95 px-6 font-semibold text-bh-green shadow-[inset_0_1px_0_rgba(255,255,255,0.6),0_8px_22px_rgba(27,61,47,0.08)] bh-focus-ring max-lg:h-14 max-lg:text-[0.9375rem] sm:flex-1 lg:h-10 lg:text-[length:var(--bh-text-body)]"
          >
            <ShoppingBag className="h-4 w-4 shrink-0 max-lg:h-[1.125rem] max-lg:w-[1.125rem]" aria-hidden />
            Add to Cart
          </button>
          <button
            type="button"
            onClick={() =>
              openQuote({
                productId: product.id,
                productName: product.name,
                quantity: qty,
              })
            }
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-bh-green px-6 font-semibold text-white shadow-[0_10px_28px_rgba(27,61,47,0.22)] bh-focus-ring max-lg:h-14 max-lg:text-[0.9375rem] sm:flex-1 lg:h-10 lg:text-[length:var(--bh-text-body)]"
          >
            Get Quote
            <ArrowRight className="h-4 w-4 shrink-0 max-lg:h-[1.125rem] max-lg:w-[1.125rem]" aria-hidden />
          </button>
        </div>
      </div>

      {!isFixedSizeMattress && (
        <button
          type="button"
          onClick={() => toggleWishlist({ productId: product.id, slug: product.slug })}
          className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-bh-muted bh-focus-ring hover:text-bh-green"
        >
          <Heart className="h-4 w-4" strokeWidth={1.75} aria-hidden />
          Save to wishlist
        </button>
      )}

      {product.is_customizable && !isFixedSizeMattress && (
        <p className="mt-4 text-sm text-bh-muted">
          Customization available —{" "}
          <Link href="/customize" className="font-semibold text-bh-green">configure your piece</Link>
        </p>
      )}

      {isMattress ? (
        <ProductCategoryTrustIcons category={category} />
      ) : (
        <div className="mt-8 grid gap-3 sm:grid-cols-2 xl:mt-auto">
          {PDP_TRUST_MICRO.map((item) => (
            <div key={item.title} className="flex items-center gap-3 rounded-2xl p-3 bh-glass-panel">
              <span className="bh-icon-badge-trust shrink-0">
                <Image src={item.icon} alt="" width={24} height={24} className="h-6 w-6 object-contain" />
              </span>
              <div>
                <p className="text-sm font-semibold text-bh-charcoal">{item.title}</p>
                <p className="text-xs text-bh-muted">{item.sub}</p>
              </div>
            </div>
          ))}
        </div>
      )}
      <ProductCategoryHelp product={product} category={category} className="xl:mt-auto" />
    </div>
  );
}
