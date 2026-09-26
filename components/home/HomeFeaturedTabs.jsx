"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";
import { ProductGrid } from "@/components/product/ProductGrid";
import { HomeFeaturedMobileCarousel } from "@/components/home/HomeFeaturedMobileCarousel";
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
    return list.slice(0, 8);
  }, [products, active]);
  const display = filtered.length ? filtered : (products || []).slice(0, 8);
  const displayDesktop = display.slice(0, 5);

  return (
    <div>
      {/* Mobile & tablet — mock layout */}
      <div className="lg:hidden">
        <div className="mb-3 flex items-center justify-between gap-3">
          <h2 className="min-w-0 font-sans text-[length:var(--bh-text-h2)] font-semibold leading-tight text-bh-charcoal">
            Featured Products
          </h2>
          <Link
            href="/furniture"
            className="inline-flex shrink-0 items-center gap-0.5 bh-type-body font-semibold text-bh-green bh-focus-ring"
          >
            View All
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>

        <HomeFeaturedMobileCarousel products={display} />
      </div>

      {/* Desktop — unchanged */}
      <div className="hidden lg:block">
        <div className="mb-6 grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-end gap-4">
          <div className="col-start-1">
            <h2 className="bh-type-h2">Featured Products</h2>
            <p className="mt-1 bh-type-body text-bh-muted">Handpicked designs for modern living.</p>
          </div>

          <div className="col-start-2 justify-self-center">
            <div className="flex gap-5 pb-1">
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

          <div className="justify-self-end">
            <Link
              href="/furniture"
              className="inline-flex items-center gap-1 text-sm font-semibold text-bh-green bh-focus-ring"
            >
              View All Products
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>

        <ProductGrid products={displayDesktop} className="lg:grid-cols-5" cardVariant="home" />
      </div>
    </div>
  );
}
