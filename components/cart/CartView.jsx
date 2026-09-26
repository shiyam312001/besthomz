"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useTransition } from "react";
import { PageContainer } from "@/components/layout/PageContainer";
import {
  ArrowLeft,
  ArrowRight,
  Heart,
  Minus,
  Plus,
  Tag,
  Trash2,
} from "lucide-react";
import { clearCart, removeFromCart, setCartItemQuantity } from "@/app/actions/cart";
import { EmptyState } from "@/components/ui/EmptyState";
import { useQuote } from "@/components/providers/QuoteProvider";
import { useCommerce } from "@/components/providers/CommerceProvider";
import { CHECKOUT_ENABLED } from "@/config/pricing";
import { pickPrimaryImage, mapProductForCard } from "@/lib/utils/product-helpers";
import { getGuestWishlistSlugs } from "@/lib/commerce/client-storage";
import { CartRecommendations } from "@/components/cart/CartRecommendations";
import { CommerceBottomCta } from "@/components/commerce/CommerceBottomCta";
import { cn } from "@/lib/cn";

function specLineForProduct(product) {
  if (!product) return "";
  return mapProductForCard(product).specLine;
}

export function CartView({ cart, onChanged }) {
  const [pending, startTransition] = useTransition();
  const [coupon, setCoupon] = useState("");
  const [couponNote, setCouponNote] = useState("");
  const [selected, setSelected] = useState(() => new Set());
  const { openQuote } = useQuote();
  const { toggleWishlist } = useCommerce();
  const items = cart?.cart_items || [];

  const totalQty = items.reduce((sum, line) => sum + (line.quantity || 0), 0);
  const itemCount = items.length;

  useEffect(() => {
    if (!items.length) {
      setSelected(new Set());
      return;
    }
    setSelected(new Set(items.map((line) => line.id)));
  }, [items.map((l) => l.id).join(",")]);

  if (!items.length) {
    return (
      <>
        <PageContainer>
        <div className="rounded-3xl px-6 py-12 bh-glass-panel md:px-10 md:py-14">
          <EmptyState
            className="border-0 bg-transparent py-8"
            title="Your cart is empty"
            description="Browse our furniture collection and add pieces to request a quote."
            actionHref="/furniture"
            actionLabel="Continue shopping"
          />
        </div>
        </PageContainer>
        <CartRecommendations />
        <CommerceBottomCta />
      </>
    );
  }

  const allSelected = selected.size === items.length;

  const quoteLines = items.filter((line) => selected.has(line.id));

  const quoteItemsPayload = quoteLines.map((line) => ({
    id: line.id,
    product_id: line.product_id,
    variant_id: line.variant_id,
    quantity: line.quantity,
    product_name: line.products?.name,
  }));

  const excludeSlugs = items.map((l) => l.products?.slug).filter(Boolean);

  function toggleSelect(id) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function toggleSelectAll() {
    if (allSelected) setSelected(new Set());
    else setSelected(new Set(items.map((l) => l.id)));
  }

  return (
    <>
      <PageContainer>
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,22rem)] lg:items-start lg:gap-10">
        <div>
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3 md:mb-6">
            <h2 className="font-display text-lg font-semibold text-bh-charcoal md:text-xl">
              Cart Items ({itemCount})
            </h2>
            <button
              type="button"
              disabled={pending}
              onClick={() =>
                startTransition(async () => {
                  await clearCart();
                  setSelected(new Set());
                  onChanged?.();
                })
              }
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium text-red-600/90 bh-glass-subtle bh-focus-ring disabled:opacity-60"
            >
              <Trash2 className="h-4 w-4" aria-hidden />
              Clear Cart
            </button>
          </div>

          <ul className="space-y-4 md:space-y-5">
            {items.map((line) => {
              const product = line.products;
              const image = pickPrimaryImage({ product_images: product?.product_images });
              const slug = product?.slug || "";
              const saved = slug && getGuestWishlistSlugs().includes(slug);
              const spec = specLineForProduct(product);
              const variantName = line.product_variants?.name;
              const isChecked = selected.has(line.id);

              return (
                <li
                  key={line.id}
                  className="flex gap-3 rounded-2xl p-4 bh-glass-panel md:gap-4 md:rounded-3xl md:p-5"
                >
                  <label className="flex shrink-0 items-start pt-1">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleSelect(line.id)}
                      className="h-4 w-4 rounded border-0 bg-white shadow-[0_2px_8px_rgba(27,61,47,0.12)] accent-bh-green bh-focus-ring"
                      aria-label={`Include ${product?.name || "item"} in quote`}
                    />
                  </label>
                  <Link
                    href={product?.slug ? `/product/${product.slug}` : "#"}
                    className="relative h-[5.5rem] w-[5.5rem] shrink-0 overflow-hidden rounded-2xl bg-bh-cream/80 shadow-[0_6px_18px_rgba(27,61,47,0.08)] md:h-28 md:w-28"
                  >
                    {image && (
                      <Image src={image} alt={product?.name || "Product"} fill className="object-cover" sizes="112px" />
                    )}
                  </Link>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="min-w-0">
                      <Link
                        href={product?.slug ? `/product/${product.slug}` : "#"}
                        className="font-display text-[0.9375rem] font-semibold leading-snug text-bh-charcoal hover:text-bh-green md:text-lg lg:text-lg"
                      >
                        {product?.name}
                      </Link>
                      {(spec || variantName) && (
                        <p className="mt-1 text-[0.8125rem] text-bh-muted md:text-sm">
                          {[spec, variantName].filter(Boolean).join(" · ")}
                        </p>
                      )}
                      <span className="mt-2 inline-flex rounded-full bg-bh-sage/70 px-2.5 py-0.5 text-xs font-semibold text-bh-green">
                        In Stock
                      </span>
                    </div>
                    <div className="mt-3 flex items-center justify-between gap-2 md:mt-4">
                      <div className="flex flex-wrap items-center gap-3 text-[0.8125rem] font-medium md:gap-4 md:text-sm">
                        <button
                          type="button"
                          disabled={pending}
                          className="inline-flex items-center gap-1.5 text-bh-muted transition hover:text-red-600 bh-focus-ring"
                          onClick={() =>
                            startTransition(async () => {
                              await removeFromCart(line.id);
                              onChanged?.();
                            })
                          }
                        >
                          <Trash2 className="h-3.5 w-3.5" aria-hidden />
                          Remove
                        </button>
                        <button
                          type="button"
                          className="inline-flex items-center gap-1.5 text-bh-muted transition hover:text-bh-green bh-focus-ring"
                          onClick={() => {
                            if (product?.id || slug) {
                              toggleWishlist({
                                productId: product?.id,
                                slug,
                                isSaved: saved,
                              });
                            }
                          }}
                        >
                          <Heart className={cn("h-3.5 w-3.5", saved && "fill-bh-green text-bh-green")} aria-hidden />
                          Save for Later
                        </button>
                      </div>
                      <div className="flex shrink-0 items-center gap-1 rounded-full p-1 bh-glass-subtle">
                        <button
                          type="button"
                          disabled={pending}
                          className="flex h-8 w-8 items-center justify-center rounded-full text-bh-charcoal bh-focus-ring disabled:opacity-50"
                          aria-label="Decrease quantity"
                          onClick={() =>
                            startTransition(async () => {
                              await setCartItemQuantity(line.id, line.quantity - 1);
                              onChanged?.();
                            })
                          }
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="min-w-[1.75rem] text-center text-sm font-semibold text-bh-charcoal">
                          {line.quantity}
                        </span>
                        <button
                          type="button"
                          disabled={pending}
                          className="flex h-8 w-8 items-center justify-center rounded-full text-bh-charcoal bh-focus-ring disabled:opacity-50"
                          aria-label="Increase quantity"
                          onClick={() =>
                            startTransition(async () => {
                              await setCartItemQuantity(line.id, line.quantity + 1);
                              onChanged?.();
                            })
                          }
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="mt-6 flex flex-col gap-3 rounded-2xl p-4 bh-glass-panel sm:flex-row sm:items-center md:mt-8 md:rounded-3xl md:p-5">
            <div className="flex items-center gap-2 text-sm font-medium text-bh-charcoal">
              <Tag className="h-4 w-4 text-bh-green" aria-hidden />
              Have a Coupon Code?
            </div>
            <div className="flex flex-1 flex-col gap-2 sm:flex-row sm:items-center">
              <input
                type="text"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                placeholder="Enter code"
                className="bh-input-glass h-11 flex-1 rounded-2xl border-0 px-4 text-sm shadow-[0_6px_20px_rgba(27,61,47,0.06)]"
                aria-label="Coupon code"
              />
              <button
                type="button"
                onClick={() =>
                  setCouponNote(
                    coupon.trim()
                      ? "Thanks — we will validate your code when we prepare your quote."
                      : "Enter a code to apply at quote stage.",
                  )
                }
                className="inline-flex h-11 shrink-0 items-center justify-center rounded-full bg-bh-green px-6 text-sm font-semibold text-white shadow-[0_8px_22px_rgba(27,61,47,0.2)] bh-focus-ring"
              >
                Apply
              </button>
            </div>
            {couponNote && <p className="text-xs text-bh-muted sm:basis-full">{couponNote}</p>}
          </div>

          <button
            type="button"
            onClick={toggleSelectAll}
            className="mt-4 text-xs font-medium text-bh-muted underline-offset-2 hover:text-bh-green hover:underline bh-focus-ring"
          >
            {allSelected ? "Deselect all" : "Select all for quote"}
          </button>
        </div>

        <aside className="rounded-2xl p-6 bh-glass-panel lg:sticky lg:top-24 lg:rounded-3xl lg:p-7">
          <h2 className="font-display text-lg font-semibold text-bh-charcoal md:text-xl">Order Summary</h2>
          <dl className="mt-5 space-y-3 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-bh-muted">Total Items</dt>
              <dd className="font-medium text-bh-charcoal">
                {totalQty} {totalQty === 1 ? "Item" : "Items"}
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-bh-muted">Delivery Charges</dt>
              <dd className="font-semibold text-bh-green">Free</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-bh-muted">Discount</dt>
              <dd className="text-bh-muted">—</dd>
            </div>
          </dl>
          <div className="my-5 h-px bg-gradient-to-r from-transparent via-bh-sage/50 to-transparent" />
          <div className="flex justify-between gap-4 text-sm">
            <span className="font-medium text-bh-charcoal">Estimated Total</span>
            <span className="font-display text-lg font-semibold text-bh-charcoal">Quote</span>
          </div>
          <p className="mt-2 text-xs leading-relaxed text-bh-muted">
            Final price will be shared in your personalised quote — no payment required now.
          </p>
          <button
            type="button"
            disabled={pending || quoteItemsPayload.length === 0}
            onClick={() =>
              openQuote({
                cartItems: quoteItemsPayload,
                furnitureRequirement: "Cart quote request",
              })
            }
            className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-bh-green text-sm font-semibold text-white shadow-[0_10px_28px_rgba(27,61,47,0.22)] transition hover:bg-bh-green-light disabled:opacity-60 bh-focus-ring"
          >
            Request a Quote
            <ArrowRight className="h-4 w-4" aria-hidden />
          </button>
          {CHECKOUT_ENABLED && (
            <Link
              href="/checkout"
              className="mt-3 inline-flex h-11 w-full items-center justify-center rounded-full text-sm font-semibold text-bh-green bh-glass-subtle bh-focus-ring"
            >
              Proceed to checkout
            </Link>
          )}
          <Link
            href="/furniture"
            className="mt-3 inline-flex h-11 w-full items-center justify-center gap-2 rounded-full text-sm font-semibold text-bh-green bh-glass-subtle bh-focus-ring"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Continue Shopping
          </Link>
          <div className="mt-5 rounded-2xl px-4 py-3 text-xs leading-relaxed text-bh-muted bh-glass-subtle">
            No payment is required at this stage. Our team will review your cart and share a detailed quote.
          </div>
        </aside>
      </div>
      </PageContainer>

      <CartRecommendations excludeSlugs={excludeSlugs} />
      <CommerceBottomCta />
    </>
  );
}
