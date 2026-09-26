"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Heart } from "lucide-react";
import { cn } from "@/lib/cn";
import { useCommerce } from "@/components/providers/CommerceProvider";
import { getGuestWishlistSlugs } from "@/lib/commerce/client-storage";
import { SWATCH_COLORS } from "@/components/offers/offers-data";

export function OfferDealCard({ product, badge = "20% OFF" }) {
  const { toggleWishlist } = useCommerce();
  const slug = product.slug || product.href?.replace("/product/", "") || "";
  const saved = slug && getGuestWishlistSlugs().includes(slug);

  return (
    <article className="group flex h-full min-h-[19rem] flex-col overflow-hidden rounded-2xl bh-glass-card md:min-h-[20rem] md:rounded-3xl">
      <Link href={product.href} className="relative block h-[11rem] shrink-0 overflow-hidden bg-bh-cream/50 md:h-[11.5rem]">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width:640px) 45vw, 20vw"
          className="object-contain p-3 transition duration-500 group-hover:scale-[1.03] md:p-4"
        />
        <span className="absolute left-3 top-3 rounded-full bg-[#C62828] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white shadow-[0_4px_12px_rgba(198,40,40,0.35)]">
          {badge}
        </span>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist({ productId: product.id, slug, isSaved: saved });
          }}
          className="absolute right-2.5 top-2.5 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-bh-charcoal shadow-[0_4px_14px_rgba(27,61,47,0.08)] backdrop-blur-sm bh-focus-ring"
          aria-label={`Save ${product.name}`}
        >
          <Heart className={cn("h-3.5 w-3.5", saved && "fill-bh-green text-bh-green")} strokeWidth={1.75} />
        </button>
      </Link>
      <div className="flex flex-1 flex-col px-4 pb-4 pt-3">
        <Link href={product.href}>
          <h3 className="line-clamp-2 font-display text-sm font-semibold leading-snug text-bh-charcoal hover:text-bh-green md:text-[0.9375rem]">
            {product.name}
          </h3>
        </Link>
        {product.specLine && <p className="mt-1 line-clamp-1 text-xs text-bh-muted">{product.specLine}</p>}
        <div className="mt-3 flex gap-1.5" aria-hidden>
          {SWATCH_COLORS.map((color) => (
            <span
              key={color}
              className="h-3.5 w-3.5 rounded-full shadow-[0_2px_6px_rgba(27,61,47,0.12)]"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
        <div className="mt-auto pt-3">
          <Link
            href={product.href}
            className="inline-flex w-fit items-center gap-1.5 rounded-full bg-white/95 px-3.5 py-1.5 text-xs font-semibold text-bh-green shadow-[0_4px_14px_rgba(27,61,47,0.08)] backdrop-blur-sm transition hover:bg-bh-sage-muted bh-focus-ring"
          >
            View Offer
            <ArrowRight className="h-3.5 w-3.5" aria-hidden />
          </Link>
        </div>
      </div>
    </article>
  );
}
