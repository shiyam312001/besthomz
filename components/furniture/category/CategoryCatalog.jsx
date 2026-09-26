"use client";

import { useMemo, useState } from "react";
import { Grid2x2, LayoutList } from "lucide-react";
import { PageContainer } from "@/components/layout/PageContainer";
import { ProductGrid } from "@/components/product/ProductGrid";
import { CategoryPromoBanner } from "@/components/furniture/category/CategoryPromoBanner";
import { CategoryFilterAside } from "@/components/furniture/category/CategoryFilterAside";
import { Select } from "@/components/ui/Select";
import { cn } from "@/lib/cn";
import { sortProducts } from "@/lib/utils/product-helpers";

const PAGE_SIZE = 12;

function productMatchesMaterial(product, selected) {
  if (!selected.length) return true;
  const hay = `${product.material_summary || ""} ${product.name || ""}`.toLowerCase();
  return selected.some((m) => hay.includes(m.toLowerCase()));
}

function productMatchesStyle(product, selected) {
  if (!selected.length) return true;
  const hay = `${product.short_description || ""} ${product.name || ""}`.toLowerCase();
  return selected.some((s) => hay.includes(s.toLowerCase()));
}

function productMatchesSeating(product, selected) {
  if (!selected.length) return true;
  const hay = `${product.name || ""} ${product.short_description || ""} ${product.dimensions || ""}`.toLowerCase();
  return selected.some((s) => hay.includes(s.toLowerCase().replace(" shape", "")));
}

export function CategoryCatalog({ category, products = [], categories = [], config }) {
  const [materials, setMaterials] = useState([]);
  const [styles, setStyles] = useState([]);
  const [seating, setSeating] = useState([]);
  const [colour, setColour] = useState(null);
  const [sort, setSort] = useState("featured");
  const [page, setPage] = useState(1);
  const [dense, setDense] = useState(false);

  const seatingFilters = config.seatingFilters || [];

  const filtered = useMemo(() => {
    let list = [...products];
    list = list.filter((p) => productMatchesMaterial(p, materials));
    list = list.filter((p) => productMatchesStyle(p, styles));
    list = list.filter((p) => productMatchesSeating(p, seating));
    if (colour) {
      const c = colour.toLowerCase();
      list = list.filter((p) => (p.material_summary || p.name || "").toLowerCase().includes(c));
    }
    return sortProducts(list, sort);
  }, [products, materials, styles, seating, colour, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pageItems = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  function toggleList(setter, value) {
    setter((prev) => (prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]));
    setPage(1);
  }

  function clearFilters() {
    setMaterials([]);
    setStyles([]);
    setSeating([]);
    setColour(null);
    setPage(1);
  }

  return (
    <section className="bg-bh-warm-white pb-14 md:pb-20">
      <PageContainer className="pt-2 mt-[40px]">
        <div className="grid gap-8 lg:grid-cols-[18rem_1fr] lg:gap-10">
          <aside className="hidden lg:block">
            <CategoryFilterAside
              currentSlug={category.slug}
              categories={categories}
              seatingFilters={seatingFilters}
              seating={seating}
              setSeating={setSeating}
              styles={styles}
              setStyles={setStyles}
              materials={materials}
              setMaterials={setMaterials}
              colour={colour}
              setColour={(v) => {
                setColour(v);
                setPage(1);
              }}
              onToggleList={toggleList}
              onClear={clearFilters}
              productCount={filtered.length}
            />
          </aside>

          <div className="min-w-0">
            <div className="mb-6 flex flex-col gap-3 rounded-2xl p-4 bh-glass-panel sm:flex-row sm:items-center sm:justify-between md:mb-7 md:rounded-3xl md:p-5 lg:hidden">
              <h2 className="font-display text-lg font-semibold text-bh-charcoal">
                {category.name}{" "}
                <span className="font-normal text-bh-muted">({filtered.length} Products)</span>
              </h2>
            </div>

            <div className="mb-6 hidden flex-col gap-3 sm:flex-row sm:items-center sm:justify-between lg:mb-7 lg:flex">
              <h2 className="font-display text-xl font-semibold text-bh-charcoal md:text-2xl">
                {category.name}{" "}
                <span className="font-normal text-bh-muted">({filtered.length} Products)</span>
              </h2>
              <div className="flex flex-wrap items-center gap-3">
                <label className="flex items-center gap-2 text-sm text-bh-muted">
                  Sort by:
                  <Select
                    id="category-sort"
                    value={sort}
                    onChange={(e) => {
                      setSort(e.target.value);
                      setPage(1);
                    }}
                    className="h-9 min-w-[9rem] rounded-full border-0 text-sm bh-glass-panel"
                  >
                    <option value="featured">Featured</option>
                    <option value="name">Name</option>
                  </Select>
                </label>
                <div className="flex gap-1 rounded-full p-1 bh-glass-panel">
                  <button
                    type="button"
                    onClick={() => setDense(false)}
                    className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-full bh-focus-ring",
                      !dense && "bg-bh-sage text-bh-green shadow-[0_4px_12px_rgba(27,61,47,0.08)]",
                    )}
                    aria-label="Grid view"
                  >
                    <Grid2x2 className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setDense(true)}
                    className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-full bh-focus-ring",
                      dense && "bg-bh-sage text-bh-green shadow-[0_4px_12px_rgba(27,61,47,0.08)]",
                    )}
                    aria-label="Compact grid"
                  >
                    <LayoutList className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {pageItems.length ? (
              <ProductGrid
                products={pageItems}
                cardVariant="category"
                className={cn("gap-4", dense ? "lg:grid-cols-3" : undefined)}
              />
            ) : (
              <p className="rounded-2xl p-10 text-center text-sm text-bh-muted bh-glass-panel md:rounded-3xl md:p-12">
                No products match your filters. Try clearing filters.
              </p>
            )}

            {totalPages > 1 && (
              <nav className="mt-10 flex justify-center gap-2" aria-label="Pagination">
                {Array.from({ length: totalPages }, (_, i) => i + 1).slice(0, 7).map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setPage(n)}
                    className={cn(
                      "flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold bh-focus-ring",
                      safePage === n
                        ? "bg-bh-green text-white shadow-[0_6px_16px_rgba(27,61,47,0.18)]"
                        : "bg-white/90 text-bh-charcoal shadow-[0_4px_12px_rgba(27,61,47,0.06)]",
                    )}
                  >
                    {n}
                  </button>
                ))}
              </nav>
            )}

            <CategoryPromoBanner promo={config.promo} />
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
