"use client";

import { useEffect, useState } from "react";
import { PageContainer } from "@/components/layout/PageContainer";
import { ProductGrid } from "@/components/product/ProductGrid";
import { fetchSuggestedProducts } from "@/app/actions/products";

export function CartRecommendations({ excludeSlugs = [] }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchSuggestedProducts({ excludeSlugs, limit: 5 }).then(setProducts);
  }, [excludeSlugs.join(",")]);

  if (!products.length) return null;

  return (
    <section className="border-t border-transparent bg-bh-sage-muted/20 py-12 md:py-16">
      <PageContainer>
        <h2 className="font-display text-xl font-semibold text-bh-charcoal md:text-2xl">You May Also Like</h2>
        <p className="mt-1 text-sm text-bh-muted">Handpicked pieces to complete your home.</p>
        <ProductGrid products={products} className="mt-8" cardVariant="category" />
      </PageContainer>
    </section>
  );
}
