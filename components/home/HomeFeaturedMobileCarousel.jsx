"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { HomeFeaturedMobileCard } from "@/components/home/HomeFeaturedMobileCard";
import { mapProductForCard } from "@/lib/utils/product-helpers";
import { cn } from "@/lib/cn";

const PER_SLIDE = 2;
const MAX_PRODUCTS = 8;

export function HomeFeaturedMobileCarousel({ products }) {
  const scrollRef = useRef(null);
  const [activePage, setActivePage] = useState(0);

  const slides = useMemo(() => {
    const cards = (products || []).slice(0, MAX_PRODUCTS).map(mapProductForCard);
    const chunks = [];
    for (let i = 0; i < cards.length; i += PER_SLIDE) {
      chunks.push(cards.slice(i, i + PER_SLIDE));
    }
    return chunks.length ? chunks : [[]];
  }, [products]);

  const syncPageFromScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el || el.clientWidth <= 0) return;
    const next = Math.round(el.scrollLeft / el.clientWidth);
    setActivePage(Math.min(next, slides.length - 1));
  }, [slides.length]);

  const goToPage = (index) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ left: index * el.clientWidth, behavior: "smooth" });
    setActivePage(index);
  };

  return (
    <div>
      <div
        ref={scrollRef}
        onScroll={syncPageFromScroll}
        className="-mx-1 flex snap-x snap-mandatory overflow-x-auto px-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {slides.map((pair, slideIndex) => (
          <div
            key={slideIndex}
            className="grid min-w-full shrink-0 snap-start grid-cols-2 gap-2.5 sm:gap-3"
          >
            {pair.map((card) => (
              <HomeFeaturedMobileCard key={card.slug} {...card} />
            ))}
          </div>
        ))}
      </div>

      {slides.length > 1 && (
        <div
          className="mt-4 flex items-center justify-center gap-2"
          role="tablist"
          aria-label="Featured products slides"
        >
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === activePage}
              aria-label={`Slide ${i + 1}`}
              onClick={() => goToPage(i)}
              className={cn(
                "h-2 w-2 rounded-full transition-colors bh-focus-ring",
                i === activePage ? "bg-bh-green" : "bg-bh-green/20",
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
