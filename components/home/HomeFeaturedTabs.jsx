"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";
import { ProductGrid } from "@/components/product/ProductGrid";
import { HomeFeaturedMobileCarousel } from "@/components/home/HomeFeaturedMobileCarousel";
import { cn } from "@/lib/cn";

const TABS = ["All", "Wardrobe", "Bedroom", "Sofa", "Office", "Mattress", "New Arrivals"];
const TAB_TERMS = {
  Wardrobe: ["wardrobe"],
  Bedroom: ["bed", "dresser"],
  Sofa: ["sofa"],
  Office: ["office", "reception table", "visitor chair"],
  Mattress: ["mattress"],
};

function matchesTab(product, tab) {
  if (tab === "All" || tab === "New Arrivals") return true;
  const searchText = [
    product.categories?.name,
    product.category,
    product.category_name,
    product.name,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
  return (TAB_TERMS[tab] || [tab.toLowerCase()]).some((term) => searchText.includes(term));
}

function shuffleProducts(products) {
  const shuffled = [...products];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }
  return shuffled;
}

export function HomeFeaturedTabs({ products }) {
  const [active, setActive] = useState("All");
  const [newArrivalProducts, setNewArrivalProducts] = useState([]);
  const filtered = useMemo(() => {
    const source = active === "New Arrivals" ? newArrivalProducts : products || [];
    const list = source.filter((p) => matchesTab(p, active));
    return list.slice(0, 8);
  }, [products, active, newArrivalProducts]);
  const displayDesktop = filtered.slice(0, 5);

  function handleTabChange(tab) {
    setActive(tab);
    if (tab === "New Arrivals") {
      setNewArrivalProducts(shuffleProducts(products || []));
    }
  }

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

        <div
          className="mb-3 flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          role="group"
          aria-label="Featured product categories"
        >
          {TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => handleTabChange(tab)}
              aria-pressed={active === tab}
              className={cn(
                "shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold bh-focus-ring",
                active === tab
                  ? "bg-bh-green text-white"
                  : "bg-bh-sage/50 text-bh-muted hover:bg-bh-sage",
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        {filtered.length ? (
          <HomeFeaturedMobileCarousel products={filtered} />
        ) : (
          <p className="rounded-2xl p-6 text-center text-sm text-bh-muted bh-glass-panel">
            No products found for {active}.
          </p>
        )}
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
                  onClick={() => handleTabChange(tab)}
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

        {displayDesktop.length ? (
          <ProductGrid products={displayDesktop} className="lg:grid-cols-5" cardVariant="home" />
        ) : (
          <p className="rounded-2xl p-8 text-center text-sm text-bh-muted bh-glass-panel">
            No products found for {active}.
          </p>
        )}
      </div>
    </div>
  );
}
