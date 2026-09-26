"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Heart, ShoppingBag } from "lucide-react";
import { SHOW_PRICES } from "@/config/pricing";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { useQuote } from "@/components/providers/QuoteProvider";
import { useCommerce } from "@/components/providers/CommerceProvider";
import { getGuestWishlistSlugs } from "@/lib/commerce/client-storage";
import { cn } from "@/lib/cn";

const badgeTone = {
  new: "new",
  popular: "popular",
  bestseller: "bestseller",
  featured: "featured",
};

export function ProductCard({
  id,
  name,
  category,
  description,
  specLine,
  image,
  href = "#",
  badge,
  colors = [],
  className,
  variant = "default",
  onAddToCart,
  onGetQuote,
}) {
  const isHome = variant === "home";
  const isCollection = variant === "collection";
  const isCategory = variant === "category";
  const isSearch = variant === "search";
  const isGlassCard = isHome || isCollection || isCategory || isSearch;
  const { openQuote } = useQuote();
  const { addToCart, toggleWishlist } = useCommerce();
  const slug = href?.replace("/product/", "") || "";
  const saved = slug && getGuestWishlistSlugs().includes(slug);

  const handleWishlist = (e) => {
    e.preventDefault();
    toggleWishlist({ productId: id, slug, isSaved: saved });
  };

  const handleCart = (e) => {
    e.preventDefault();
    if (onAddToCart) onAddToCart();
    else addToCart({ productId: id });
  };

  return (
    <article
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-2xl transition duration-300",
        isGlassCard
          ? cn(
              "bh-glass-card hover:-translate-y-0.5 max-lg:hover:translate-y-0",
              isSearch
                ? "min-h-[17.5rem] sm:min-h-[18.5rem] lg:min-h-[21rem]"
                : "min-h-[16.25rem] sm:min-h-[17.5rem] lg:min-h-[19.5rem]",
            )
          : "border border-bh-border/40 bg-white shadow-[0_4px_24px_rgba(27,61,47,0.07)] hover:-translate-y-0.5 hover:shadow-[0_12px_36px_rgba(27,61,47,0.12)]",
        className,
      )}
    >
      <Link
        href={href}
        className={cn(
          "relative block shrink-0 overflow-hidden bg-bh-cream/70",
          isGlassCard
            ? "h-[9.25rem] sm:h-[10.5rem] md:h-[11.25rem]"
            : "aspect-[4/3]",
        )}
      >
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
          className={cn(
            "transition duration-500 group-hover:scale-[1.03]",
            isGlassCard ? "object-contain p-3 md:p-4" : "object-cover",
          )}
        />
        {badge && !isHome && (
          <Badge tone={badgeTone[badge] ?? "default"} className="absolute left-3 top-3">
            {badge === "bestseller"
              ? "Best Seller"
              : badge === "featured"
                ? "Featured"
                : badge.charAt(0).toUpperCase() + badge.slice(1)}
          </Badge>
        )}
        <button
          type="button"
          onClick={handleWishlist}
          className={cn(
            "absolute right-2.5 top-2.5 flex items-center justify-center rounded-full text-bh-charcoal bh-focus-ring",
            isGlassCard
              ? "h-9 w-9 bg-white/85 shadow-[0_4px_14px_rgba(27,61,47,0.08)] backdrop-blur-sm lg:h-8 lg:w-8"
              : "h-9 w-9 bg-white/90 shadow-sm",
          )}
          aria-label={`Save ${name} to wishlist`}
        >
          <Heart className={cn(isHome ? "h-3.5 w-3.5" : "h-4 w-4")} strokeWidth={1.75} />
        </button>
      </Link>
      <div
        className={cn(
          "flex flex-1 flex-col",
          isGlassCard ? "px-3 pb-3 pt-2.5 sm:px-3.5 lg:px-4 lg:pb-4 lg:pt-3" : "p-3 sm:p-4",
          isSearch && "items-center text-center",
        )}
      >
        {category && !isHome && !isCollection && !isCategory && !isSearch && (
          <p className="text-[11px] font-medium uppercase tracking-wide text-bh-muted">{category}</p>
        )}
        {(isCollection || isCategory || isSearch) && category ? (
          <p
            className={cn(
              "text-[11px] font-semibold uppercase tracking-wider text-bh-muted max-lg:text-xs lg:text-[10px]",
              isSearch && "mt-0.5",
            )}
          >
            {category}
          </p>
        ) : null}
        <Link href={href} className={cn("block min-h-[2.35rem] lg:min-h-[2.5rem]", isSearch && "w-full")}>
          <h3
            className={cn(
              "line-clamp-2 font-sans font-semibold leading-snug text-bh-charcoal hover:text-bh-green",
              isGlassCard ? "text-[length:var(--bh-text-body)]" : "mt-1 text-[length:var(--bh-text-body)]",
              (isCollection || isCategory || isSearch) && "mt-1",
            )}
          >
            {name}
          </h3>
        </Link>
        {isSearch && (description || specLine) ? (
          <p className="mt-2 line-clamp-2 text-[0.8125rem] leading-relaxed text-bh-muted lg:text-xs">{description || specLine}</p>
        ) : null}
        {isGlassCard && !isSearch && specLine ? (
          <p className="mt-1 line-clamp-1 text-[0.8125rem] text-bh-muted lg:text-xs">{specLine}</p>
        ) : null}
        {!isGlassCard && description ? (
          <p className="mt-1 text-[11px] text-bh-muted md:text-xs">{description}</p>
        ) : null}
        {colors.length > 0 && (isCategory || isSearch || isHome) && (
          <div
            className={cn("mt-3 flex gap-1.5", (isCategory || isSearch) && "justify-center")}
            aria-label="Available colours"
          >
            {colors.map((color) => (
              <span
                key={color}
                className="h-3.5 w-3.5 rounded-full shadow-[0_2px_6px_rgba(27,61,47,0.12)] ring-1 ring-white/80"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        )}
        {SHOW_PRICES ? (
          <p className="mt-3 text-sm font-semibold text-bh-charcoal">Price placeholder</p>
        ) : null}

        <div className={cn("mt-auto pt-3", isSearch && "w-full")}>
          {isSearch ? (
            <div className="flex flex-col gap-2">
              <button
                type="button"
                className="inline-flex min-h-[2.75rem] w-full items-center justify-center gap-1.5 rounded-full bg-white/90 px-3 py-2 text-[0.8125rem] font-semibold text-bh-charcoal shadow-[0_4px_14px_rgba(27,61,47,0.08)] backdrop-blur-sm transition hover:bg-bh-sage-muted/80 bh-focus-ring sm:text-xs"
                onClick={(e) => {
                  e.preventDefault();
                  if (onGetQuote) onGetQuote();
                  else openQuote({ productId: id, productName: name });
                }}
              >
                Get Quote
                <ArrowRight className="h-3.5 w-3.5" aria-hidden />
              </button>
              <button
                type="button"
                onClick={handleCart}
                className="inline-flex min-h-[2.75rem] w-full items-center justify-center gap-1.5 rounded-full bg-bh-green px-3 py-2 text-[0.8125rem] font-semibold text-white shadow-[0_6px_16px_rgba(27,61,47,0.2)] bh-focus-ring sm:text-xs"
              >
                <ShoppingBag className="h-3.5 w-3.5" aria-hidden />
                Add to Cart
              </button>
            </div>
          ) : isCategory ? (
            <div className="flex flex-col gap-2 lg:flex-row">
              <Link
                href={href}
                className="inline-flex min-h-[2.75rem] flex-1 items-center justify-center gap-1.5 rounded-full bg-white/95 px-2.5 py-2 text-[0.8125rem] font-semibold leading-tight text-bh-charcoal shadow-[0_4px_14px_rgba(27,61,47,0.08)] backdrop-blur-sm transition hover:bg-bh-sage-muted/80 bh-focus-ring sm:px-3 sm:text-xs lg:min-h-0"
              >
                View Details
              </Link>
              <button
                type="button"
                onClick={handleCart}
                className="inline-flex min-h-[2.75rem] flex-1 items-center justify-center gap-1.5 rounded-full bg-bh-green px-2.5 py-2 text-[0.8125rem] font-semibold leading-tight text-white shadow-[0_6px_16px_rgba(27,61,47,0.2)] bh-focus-ring sm:px-3 sm:text-xs lg:min-h-0"
              >
                <ShoppingBag className="h-3.5 w-3.5 shrink-0" aria-hidden />
                <span className="truncate">Add to Cart</span>
              </button>
            </div>
          ) : isCollection ? (
            <Link
              href={href}
              className="inline-flex w-fit items-center gap-1.5 rounded-full bg-white/95 px-3.5 py-1.5 text-xs font-semibold text-bh-green shadow-[0_4px_14px_rgba(0,0,0,0.04)] backdrop-blur-sm transition hover:bg-bh-sage-muted bh-focus-ring"
            >
              View Details
              <ArrowRight className="h-3.5 w-3.5" aria-hidden />
            </Link>
          ) : isHome ? (
            <button
              type="button"
              className="inline-flex min-h-[2.75rem] w-full items-center justify-center gap-1.5 rounded-full border border-white/70 bg-white/85 px-3.5 py-2 text-[0.8125rem] font-semibold text-bh-charcoal shadow-[0_6px_18px_rgba(27,61,47,0.08)] backdrop-blur-sm transition hover:bg-white bh-focus-ring max-lg:text-bh-charcoal sm:text-xs lg:w-fit lg:min-h-0 lg:justify-start lg:border-0 lg:bg-white/95 lg:py-1.5 lg:text-bh-green"
              onClick={(e) => {
                e.preventDefault();
                if (onGetQuote) onGetQuote();
                else openQuote({ productId: id, productName: name });
              }}
            >
              Get Quote
              <ArrowRight className="h-3.5 w-3.5" aria-hidden />
            </button>
          ) : (
            <div className="flex flex-col gap-2 sm:flex-row">
              <Button
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={(e) => {
                  e.preventDefault();
                  if (onGetQuote) onGetQuote();
                  else openQuote({ productId: id, productName: name });
                }}
                icon={<ArrowRight className="h-3.5 w-3.5" />}
                iconPosition="right"
              >
                Get Quote
              </Button>
              <Button
                variant="primary"
                size="sm"
                className="flex-1"
                onClick={handleCart}
                icon={<ShoppingBag className="h-3.5 w-3.5" />}
              >
                Add to Cart
              </Button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
