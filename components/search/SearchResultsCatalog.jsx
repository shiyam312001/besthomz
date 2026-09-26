"use client";

import { useMemo, useState } from "react";
import { PageContainer } from "@/components/layout/PageContainer";
import { ProductGrid } from "@/components/product/ProductGrid";
import { SearchHelpBanner } from "@/components/search/SearchHelpBanner";
import { EmptyState } from "@/components/ui/EmptyState";
import { FILTER_MATERIALS, FILTER_STYLES } from "@/components/search/search-data";
import { Checkbox } from "@/components/ui/Checkbox";
import { Select } from "@/components/ui/Select";
import { cn } from "@/lib/cn";
import { sortProducts } from "@/lib/utils/product-helpers";

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

export function SearchResultsCatalog({ query, products = [] }) {
  const [categoryFilters, setCategoryFilters] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [styles, setStyles] = useState([]);
  const [featuredOnly, setFeaturedOnly] = useState(false);
  const [newOnly, setNewOnly] = useState(false);
  const [sort, setSort] = useState("featured");

  const categoryCounts = useMemo(() => {
    const map = new Map();
    for (const p of products) {
      const name = p.categories?.name || p.category_name || "Other";
      map.set(name, (map.get(name) || 0) + 1);
    }
    return [...map.entries()].sort((a, b) => a[0].localeCompare(b[0]));
  }, [products]);

  const filtered = useMemo(() => {
    let list = [...products];
    if (categoryFilters.length) {
      list = list.filter((p) => categoryFilters.includes(p.categories?.name || p.category_name));
    }
    if (featuredOnly) list = list.filter((p) => p.is_featured);
    if (newOnly) list = list.filter((p) => p.is_new);
    list = list.filter((p) => productMatchesMaterial(p, materials));
    list = list.filter((p) => productMatchesStyle(p, styles));
    return sortProducts(list, sort);
  }, [products, categoryFilters, featuredOnly, newOnly, materials, styles, sort]);

  function toggleCategory(name) {
    setCategoryFilters((prev) => (prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]));
  }

  function clearFilters() {
    setCategoryFilters([]);
    setMaterials([]);
    setStyles([]);
    setFeaturedOnly(false);
    setNewOnly(false);
  }

  if (!query) {
    return (
      <section className="bg-bh-warm-white pb-14 md:pb-16">
        <PageContainer className="-mt-2 pt-4 md:-mt-4">
          <p className="rounded-2xl p-10 text-center text-sm text-bh-muted bh-glass-panel md:rounded-3xl md:p-12">
            Enter a product name or category above to see results.
          </p>
        </PageContainer>
      </section>
    );
  }

  return (
    <section className="bg-bh-warm-white pb-14 md:pb-16">
      <PageContainer className="-mt-2 pt-4 mt-[40px]">
        <div className="grid gap-8 lg:grid-cols-[17.5rem_1fr]">
          <aside className="hidden lg:block">
            <div className="sticky top-[calc(var(--bh-site-header-offset)+1rem)] space-y-4">
              <div className="rounded-2xl p-5 bh-glass-panel md:rounded-3xl md:p-6">
                <p className="text-xs font-semibold uppercase tracking-wide text-bh-muted">Search Results</p>
                <p className="mt-2 font-display text-xl font-semibold text-bh-charcoal">&ldquo;{query}&rdquo;</p>
                <p className="mt-1 text-sm text-bh-muted">
                  {filtered.length} Product{filtered.length === 1 ? "" : "s"}
                </p>
              </div>

              <div className="rounded-2xl p-5 bh-glass-panel md:rounded-3xl md:p-6">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-display text-lg font-semibold text-bh-charcoal">Filters</h3>
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="text-xs font-semibold text-bh-green bh-focus-ring"
                  >
                    Clear All
                  </button>
                </div>

                {categoryCounts.length > 0 && (
                  <div className="mt-5">
                    <p className="text-xs font-semibold uppercase tracking-wide text-bh-muted">Category</p>
                    <div className="mt-2 space-y-0.5">
                      {categoryCounts.map(([name, count]) => (
                        <Checkbox
                          key={name}
                          variant="filter"
                          id={`search-cat-${name}`}
                          label={`${name} (${count})`}
                          checked={categoryFilters.includes(name)}
                          onChange={() => toggleCategory(name)}
                        />
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-6">
                  <p className="text-xs font-semibold uppercase tracking-wide text-bh-muted">Availability</p>
                  <div className="mt-2 space-y-0.5">
                    <Checkbox
                      variant="filter"
                      id="search-featured"
                      label="Featured"
                      checked={featuredOnly}
                      onChange={(e) => setFeaturedOnly(e.target.checked)}
                    />
                    <Checkbox
                      variant="filter"
                      id="search-new"
                      label="New arrivals"
                      checked={newOnly}
                      onChange={(e) => setNewOnly(e.target.checked)}
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <p className="text-xs font-semibold uppercase tracking-wide text-bh-muted">Style</p>
                  <div className="mt-2 space-y-0.5">
                    {FILTER_STYLES.map((s) => (
                      <Checkbox
                        key={s}
                        variant="filter"
                        id={`search-style-${s}`}
                        label={s}
                        checked={styles.includes(s)}
                        onChange={() =>
                          setStyles((prev) => (prev.includes(s) ? prev.filter((v) => v !== s) : [...prev, s]))
                        }
                      />
                    ))}
                  </div>
                </div>

                <div className="mt-6">
                  <p className="text-xs font-semibold uppercase tracking-wide text-bh-muted">Material</p>
                  <div className="mt-2 space-y-0.5">
                    {FILTER_MATERIALS.map((m) => (
                      <Checkbox
                        key={m}
                        variant="filter"
                        id={`search-mat-${m}`}
                        label={m}
                        checked={materials.includes(m)}
                        onChange={() =>
                          setMaterials((prev) => (prev.includes(m) ? prev.filter((v) => v !== m) : [...prev, m]))
                        }
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </aside>

          <div>
            <div className="mb-5 rounded-2xl p-4 bh-glass-panel lg:hidden md:rounded-3xl">
              <p className="text-xs font-semibold uppercase tracking-wide text-bh-muted">Search Results</p>
              <p className="mt-1 font-display text-lg font-semibold text-bh-charcoal">&ldquo;{query}&rdquo;</p>
              <p className="text-sm text-bh-muted">{filtered.length} products</p>
            </div>

            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between lg:mb-6">
              <p className="text-sm text-bh-charcoal md:text-base">
                <span className="font-semibold">{filtered.length} results</span>
                <span className="text-bh-muted"> for &ldquo;{query}&rdquo;</span>
              </p>
              <label className="flex items-center gap-2 text-sm text-bh-muted">
                Sort by:
                <Select
                  id="search-sort"
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="h-9 min-w-[8.5rem] rounded-full border-0 text-sm bh-glass-panel"
                >
                  <option value="featured">Featured</option>
                  <option value="name">Name</option>
                </Select>
              </label>
            </div>

            {filtered.length === 0 ? (
              <EmptyState
                title="No results"
                description={`No products match "${query}" with the current filters.`}
                actionHref="/furniture"
                actionLabel="Browse furniture"
              />
            ) : (
              <ProductGrid products={filtered} cardVariant="search" />
            )}

            {filtered.length > 0 && <SearchHelpBanner />}
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
