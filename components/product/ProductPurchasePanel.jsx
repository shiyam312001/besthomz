"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Heart, Minus, Plus, ShoppingBag } from "lucide-react";
import { useQuote } from "@/components/providers/QuoteProvider";
import { useCommerce } from "@/components/providers/CommerceProvider";
import { cn } from "@/lib/cn";
import {
  PDP_COLOURS,
  PDP_FEATURE_ICONS,
  PDP_TRUST_MICRO,
} from "@/components/product/product-pdp-data";
import { getDefaultProductSize, getProductSizeOptions } from "@/lib/utils/product-size-options";

export function ProductPurchasePanel({ product, category }) {
  const { openQuote } = useQuote();
  const { addToCart, toggleWishlist } = useCommerce();

  const sizes = useMemo(() => getProductSizeOptions(product, category), [product, category]);

  const [colour, setColour] = useState(PDP_COLOURS[0]);
  const [size, setSize] = useState(() => getDefaultProductSize(product, sizes));
  const [qty, setQty] = useState(1);

  useEffect(() => {
    const opts = getProductSizeOptions(product, category);
    setSize(getDefaultProductSize(product, opts));
  }, [product.slug, category?.slug, product.name, category]);

  return (
    <div className="bh-ui pb-20 md:pb-0">
      {category && (
        <Link href={`/furniture/${category.slug}`} className="text-xs font-semibold uppercase tracking-wide text-bh-green">
          {category.name}
        </Link>
      )}
      <h1 className="bh-product-title mt-2">{product.name}</h1>
      {product.short_description && (
        <p className="mt-3 bh-type-body text-bh-muted">{product.short_description}</p>
      )}

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {PDP_FEATURE_ICONS.map((item) => (
          <div key={item.label} className="flex flex-col items-center gap-2 rounded-2xl px-2 py-3 text-center bh-glass-panel">
            <span className="bh-icon-badge-trust">
              <Image src={item.icon} alt="" width={28} height={28} className="h-7 w-7 object-contain" />
            </span>
            <span className="text-[10px] font-medium leading-tight text-bh-charcoal md:text-[11px]">{item.label}</span>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-bh-muted">Select Colour</p>
        <p className="mt-1 text-sm font-medium text-bh-charcoal">{colour.label}</p>
        <div className="mt-3 flex flex-wrap gap-3">
          {PDP_COLOURS.map((swatch) => (
            <button
              key={swatch.id}
              type="button"
              onClick={() => setColour(swatch)}
              className={cn(
                "h-9 w-9 rounded-full shadow-[0_4px_12px_rgba(27,61,47,0.12)] bh-focus-ring",
                colour.id === swatch.id && "ring-2 ring-bh-green/50 ring-offset-2 ring-offset-bh-warm-white",
              )}
              style={{ backgroundColor: swatch.hex }}
              aria-label={swatch.label}
            />
          ))}
        </div>
      </div>

      {sizes.length > 0 && (
        <div className="mt-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-bh-muted">Select Size</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {sizes.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => setSize(opt)}
                className={cn(
                  "rounded-full px-4 py-2 text-xs font-semibold transition bh-focus-ring md:text-sm",
                  size === opt
                    ? "bg-bh-green text-white shadow-[0_6px_16px_rgba(27,61,47,0.2)]"
                    : "bg-white/90 text-bh-charcoal shadow-[0_4px_14px_rgba(27,61,47,0.08)] hover:bg-bh-sage-muted",
                )}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="mt-8 flex flex-col gap-4">
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

        <div className="flex flex-col gap-3 max-lg:gap-3.5 sm:flex-row sm:items-stretch sm:gap-3">
          <button
            type="button"
            onClick={() => addToCart({ productId: product.id, quantity: qty })}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-bh-sage/95 px-6 font-semibold text-bh-green shadow-[inset_0_1px_0_rgba(255,255,255,0.6),0_8px_22px_rgba(27,61,47,0.08)] bh-focus-ring max-lg:h-14 max-lg:text-[0.9375rem] sm:flex-1 lg:h-12 lg:text-[length:var(--bh-text-body)]"
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
                customizationRequirement: `Colour: ${colour.label} · Size: ${size}`,
              })
            }
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-bh-green px-6 font-semibold text-white shadow-[0_10px_28px_rgba(27,61,47,0.22)] bh-focus-ring max-lg:h-14 max-lg:text-[0.9375rem] sm:flex-1 lg:h-12 lg:text-[length:var(--bh-text-body)]"
          >
            Get Quote
            <ArrowRight className="h-4 w-4 shrink-0 max-lg:h-[1.125rem] max-lg:w-[1.125rem]" aria-hidden />
          </button>
        </div>
      </div>

      <button
        type="button"
        onClick={() => toggleWishlist({ productId: product.id, slug: product.slug })}
        className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-bh-muted bh-focus-ring hover:text-bh-green"
      >
        <Heart className="h-4 w-4" strokeWidth={1.75} aria-hidden />
        Save to wishlist
      </button>

      {product.is_customizable && (
        <p className="mt-4 text-sm text-bh-muted">
          Customization available —{" "}
          <Link href="/customize" className="font-semibold text-bh-green">configure your piece</Link>
        </p>
      )}

      <div className="mt-8 grid gap-3 sm:grid-cols-2">
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
    </div>
  );
}
