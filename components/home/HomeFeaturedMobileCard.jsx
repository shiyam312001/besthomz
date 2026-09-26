"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Heart } from "lucide-react";
import { useQuote } from "@/components/providers/QuoteProvider";
import { useCommerce } from "@/components/providers/CommerceProvider";
import { getGuestWishlistSlugs } from "@/lib/commerce/client-storage";
import { cn } from "@/lib/cn";

/** Mobile & tablet featured tile — matches homepage mock (lg+ uses ProductCard). */
export function HomeFeaturedMobileCard({
  id,
  name,
  image,
  href = "#",
  badge,
  className,
}) {
  const { openQuote } = useQuote();
  const { toggleWishlist } = useCommerce();
  const slug = href?.replace("/product/", "") || "";
  const saved = slug && getGuestWishlistSlugs().includes(slug);

  const showFeaturedBadge = badge === "featured" || badge === "new";

  return (
    <article
      className={cn(
        "flex h-full min-w-0 flex-col overflow-hidden rounded-2xl bg-white shadow-[0_10px_32px_rgba(27,61,47,0.09)]",
        className,
      )}
    >
      <Link
        href={href}
        className="relative block h-[7.75rem] shrink-0 overflow-hidden rounded-t-2xl bg-bh-cream/80 sm:h-[8.25rem]"
      >
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 1024px) 46vw, 20vw"
          className="object-contain p-2.5"
        />
        {showFeaturedBadge && (
          <span
            className={cn(
              "absolute left-2 top-2 rounded-md px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-white shadow-sm",
              badge === "new" ? "bg-sky-600" : "bg-[#e8923a]",
            )}
          >
            {badge === "new" ? "New" : "Featured"}
          </span>
        )}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist({ productId: id, slug, isSaved: saved });
          }}
          className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/95 text-bh-charcoal shadow-[0_4px_12px_rgba(27,61,47,0.1)] bh-focus-ring"
          aria-label={`Save ${name} to wishlist`}
        >
          <Heart className="h-3.5 w-3.5" strokeWidth={1.75} />
        </button>
      </Link>

      <div className="flex min-h-0 flex-1 flex-col px-2.5 pb-2.5 pt-2 sm:px-3 sm:pb-3">
        <Link href={href} className="block min-h-[2.5rem] flex-1">
          <h3 className="line-clamp-2 font-sans text-[length:var(--bh-text-body)] font-semibold leading-snug text-bh-charcoal">
            {name}
          </h3>
        </Link>
        <button
          type="button"
          className="mt-2 inline-flex h-9 w-full items-center justify-center gap-1 rounded-full bg-bh-sage/90 px-2 text-[length:var(--bh-text-small)] font-semibold text-bh-green shadow-[inset_0_1px_0_rgba(255,255,255,0.5)] bh-focus-ring"
          onClick={() => openQuote({ productId: id, productName: name })}
        >
          Get Quote
          <ArrowRight className="h-3.5 w-3.5 shrink-0" aria-hidden />
        </button>
      </div>
    </article>
  );
}
