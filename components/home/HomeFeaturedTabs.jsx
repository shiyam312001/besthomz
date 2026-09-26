"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";
import { ProductGrid } from "@/components/product/ProductGrid";
import { cn } from "@/lib/cn";

const TABS = ["All", "Dining", "Bedroom", "Sofa", "Office", "Mattress", "New Arrivals"];

function matchesTab(product, tab) {
  if (tab === "All") return true;
  if (tab === "New Arrivals") return Boolean(product.is_new);
  const cat = (product.categories?.name || product.category || "").toLowerCase();
  const name = (product.name || "").toLowerCase();
  const key = tab.toLowerCase();
  if (key === "sofa") return cat.includes("sofa") || name.includes("sofa");
  if (key === "mattress") return cat.includes("mattress") || name.includes("mattress");
  return cat.includes(key) || name.includes(key);
}

export function HomeFeaturedTabs({ products }) {
  const [active, setActive] = useState("All");
  const filtered = useMemo(() => {
    const list = (products || []).filter((p) => matchesTab(p, active));
    return list.slice(0, 5);
  }, [products, active]);
  const display = filtered.length ? filtered : (products || []).slice(0, 5);

  return (
    <div>
      <div className="mb-5 grid gap-4 lg:mb-6 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:items-end">
        <div className="lg:col-start-1">
          <h2 className="font-display text-2xl font-semibold text-bh-charcoal md:text-[1.75rem]">
            Featured Products
          </h2>
          <p className="mt-1 text-sm text-bh-muted">Handpicked designs for modern living.</p>
        </div>

        <div className="lg:col-start-2 lg:justify-self-center">
          <div className="flex gap-4 overflow-x-auto border-b border-bh-border pb-0 md:gap-5 lg:border-0 lg:pb-1">
            {TABS.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActive(tab)}
                className={cn(
                  "relative shrink-0 pb-3 text-sm bh-focus-ring transition",
                  active === tab
                    ? "font-semibold text-bh-green after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:rounded-full after:bg-bh-green"
                    : "font-medium text-bh-muted hover:text-bh-charcoal",
                )}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="hidden justify-self-end lg:block">
          <Link
            href="/furniture"
            className="inline-flex items-center gap-1 text-sm font-semibold text-bh-green bh-focus-ring"
          >
            View All Products
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </div>

      <Link
        href="/furniture"
        className="mb-4 inline-flex items-center gap-1 text-sm font-semibold text-bh-green bh-focus-ring lg:hidden"
      >
        View All Products
        <ArrowRight className="h-4 w-4" aria-hidden />
      </Link>

      <ProductGrid
        products={display}
        className="md:grid-cols-3 lg:grid-cols-5"
        cardVariant="home"
      />
    </div>
  );
}