"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";
import { cn } from "@/lib/cn";
import { useCommerce } from "@/components/providers/CommerceProvider";
import { getGuestWishlistSlugs } from "@/lib/commerce/client-storage";
import { buildProductGallerySlides } from "@/lib/utils/product-gallery";

export function ProductGallery({ product, productName, isNew, productId, slug, images }) {
  const { toggleWishlist } = useCommerce();
  const slides = useMemo(
    () =>
      product
        ? buildProductGallerySlides(product)
        : buildProductGallerySlides({ name: productName, product_images: images }),
    [product, productName, images],
  );

  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(0);
  }, [product?.slug, slides.map((s) => s.image_url).join("|")]);

  const safeIndex = slides.length ? Math.min(index, slides.length - 1) : 0;
  const current = slides[safeIndex];
  const saved = slug && getGuestWishlistSlugs().includes(slug);

  if (!current) {
    return <div className="aspect-[4/3] rounded-3xl bg-bh-cream bh-glass-card" aria-label="No product images" />;
  }

  const go = (dir) => {
    if (slides.length <= 1) return;
    setIndex((i) => {
      const next = i + dir;
      if (next < 0) return slides.length - 1;
      if (next >= slides.length) return 0;
      return next;
    });
  };

  return (
    <div>
      <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-bh-cream/60 bh-glass-card bh-shadow-soft">
        <Image
          src={current.image_url}
          alt={current.alt_text || productName}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
        {isNew && (
          <span className="absolute left-4 top-4 rounded-full bg-bh-green px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white shadow-[0_6px_16px_rgba(27,61,47,0.2)]">
            New Arrival
          </span>
        )}
        {slug && (
          <button
            type="button"
            onClick={() => toggleWishlist({ productId, slug, isSaved: saved })}
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-bh-charcoal shadow-[0_6px_18px_rgba(27,61,47,0.12)] backdrop-blur-sm bh-focus-ring"
            aria-label="Add to wishlist"
          >
            <Heart className={cn("h-4 w-4", saved && "fill-bh-green text-bh-green")} strokeWidth={1.75} />
          </button>
        )}
        {slides.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full p-2.5 bh-glass-panel bh-focus-ring"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-5 w-5 text-bh-charcoal" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-2.5 bh-glass-panel bh-focus-ring"
              aria-label="Next image"
            >
              <ChevronRight className="h-5 w-5 text-bh-charcoal" />
            </button>
          </>
        )}
      </div>

      {slides.length > 0 && (
        <div
          className={cn(
            "mt-4 grid gap-3",
            slides.length === 1 && "grid-cols-1 max-w-[5.5rem]",
            slides.length === 2 && "grid-cols-2 max-w-[11.5rem]",
            slides.length === 3 && "grid-cols-3 max-w-[17.5rem]",
            slides.length >= 4 && "grid-cols-4",
          )}
        >
          {slides.map((img, i) => (
            <button
              key={img.image_url}
              type="button"
              onClick={() => setIndex(i)}
              className={cn(
                "relative aspect-square w-full overflow-hidden rounded-xl bh-focus-ring",
                safeIndex === i
                  ? "shadow-[0_6px_18px_rgba(27,61,47,0.16)] ring-2 ring-bh-green/40 ring-offset-2 ring-offset-bh-warm-white"
                  : "shadow-[0_4px_12px_rgba(27,61,47,0.08)]",
              )}
              aria-label={`View image ${i + 1}`}
              aria-current={safeIndex === i}
            >
              <Image src={img.image_url} alt="" fill className="object-cover" sizes="(max-width:768px) 22vw, 120px" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
