"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageContainer } from "@/components/layout/PageContainer";
import { OfferDealCard } from "@/components/offers/OfferDealCard";
import { DEFAULT_DEAL_BADGES } from "@/components/offers/offers-data";
import { useOffersFilter } from "@/components/offers/OffersFilterContext";

function matchesFilter(product, filter) {
  if (filter === "all") return true;
  const hay = `${product.category || ""} ${product.name || ""} ${product.slug || ""}`.toLowerCase();
  const map = {
    sofa: ["sofa"],
    bed: ["bed", "bedroom"],
    "dining-table": ["dining table", "dining"],
    "dining-chair": ["chair", "dining chair"],
    mattress: ["mattress"],
    "office-chair": ["office chair"],
    "office-table": ["office table", "desk"],
  };
  const terms = map[filter] || [filter.replace("-", " ")];
  return terms.some((t) => hay.includes(t));
}

export function OffersTopDeals({ products = [] }) {
  const { filter } = useOffersFilter();
  const filtered = products.filter((p) => matchesFilter(p, filter)).slice(0, 5);
  const list = filtered.length ? filtered : products.slice(0, 5);

  return (
    <section id="top-deals" className="bg-bh-sage-muted/35 py-12 md:py-16">
      <PageContainer>
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between md:mb-8">
          <div>
            <h2 className="font-display text-2xl font-semibold text-bh-charcoal md:text-3xl">Top Deals</h2>
            <p className="mt-2 text-sm text-bh-muted">Hand-picked offers on our most-loved pieces.</p>
          </div>
          <Link href="/furniture" className="inline-flex items-center gap-1 text-sm font-semibold text-bh-green bh-focus-ring">
            View All Offers
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
        {list.length === 0 ? (
          <p className="rounded-2xl bh-glass-panel p-8 text-center text-sm text-bh-muted">
            No products match this category yet. Browse all furniture for current promotions.
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5 lg:gap-4">
            {list.map((product, i) => (
              <OfferDealCard key={product.id || product.slug} product={product} badge={DEFAULT_DEAL_BADGES[i % DEFAULT_DEAL_BADGES.length]} />
            ))}
          </div>
        )}
      </PageContainer>
    </section>
  );
}
