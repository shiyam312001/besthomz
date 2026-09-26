"use client";

import { useEffect, useState } from "react";
import { getRecentProducts, pruneRecentProducts } from "@/lib/commerce/client-storage";
import { fetchProductsBySlugs } from "@/app/actions/products";
import { ProductGrid } from "@/components/product/ProductGrid";

export function RecentlyViewed({ excludeSlug }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const slugs = getRecentProducts()
      .map((p) => p.slug)
      .filter((s) => s !== excludeSlug);
    if (!slugs.length) return;
    fetchProductsBySlugs(slugs).then((found) => {
      const valid = found.map((p) => p.slug);
      pruneRecentProducts(valid);
      setProducts(found);
    });
  }, [excludeSlug]);

  if (!products.length) return null;

  return (
    <section className="mt-12 md:mt-16">
      <h2 className="mb-6 font-display text-2xl font-semibold text-bh-charcoal md:text-3xl">Recently Viewed</h2>
      <ProductGrid products={products} cardVariant="home" />
    </section>
  );
}
