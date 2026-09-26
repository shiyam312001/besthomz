"use client";

import { useMemo, useState } from "react";
import { Grid2x2, LayoutList } from "lucide-react";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { PageContainer } from "@/components/layout/PageContainer";
import { ProductGrid } from "@/components/product/ProductGrid";
import { FurniturePromoBanner } from "@/components/furniture/FurniturePromoBanner";
import {
  FILTER_COLOURS,
  FILTER_MATERIALS,
  FILTER_STYLES,
} from "@/components/furniture/furniture-data";
import { Checkbox } from "@/components/ui/Checkbox";
import { Select } from "@/components/ui/Select";
import { cn } from "@/lib/cn";
import { sortProducts } from "@/lib/utils/product-helpers";

const PAGE_SIZE = 12;

function getProductCategorySlug(product) {
  return product.categories?.slug || product.category_slug || null;
}

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

export function FurnitureCatalog({ products = [], categories = [] }) {
  const [categorySlug, setCategorySlug] = useState("all");
  const [materials, setMaterials] = useState([]);
  const [styles, setStyles] = useState([]);
  const [colour, setColour] = useState(null);
  const [featuredOnly, setFeaturedOnly] = useState(false);
  const [sort, setSort] = useState("featured");
  const [page, setPage] = useState(1);
  const [dense, setDense] = useState(false);

  const countBySlug = useMemo(() => {
    const counts = {};
    for (const p of products) {
      const slug = getProductCategorySlug(p);
      if (slug) counts[slug] = (counts[slug] || 0) + 1;
    }
    return counts;
  }, [products]);

  const filtered = useMemo(() => {
    let list = [...products];

    if (categorySlug !== "all") {
      list = list.filter((p) => getProductCategorySlug(p) === categorySlug);
    }
    if (featuredOnly) list = list.filter((p) => p.is_featured);
    list = list.filter((p) => productMatchesMaterial(p, materials));
    list = list.filter((p) => productMatchesStyle(p, styles));
    if (colour) {
      const c = colour.toLowerCase();
      list = list.filter((p) => (p.material_summary || p.name || "").toLowerCase().includes(c));
    }

    return sortProducts(list, sort);
  }, [products, categorySlug, featuredOnly, materials, styles, colour, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pageItems = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);
  const start = filtered.length ? (safePage - 1) * PAGE_SIZE + 1 : 0;
  const end = Math.min(safePage * PAGE_SIZE, filtered.length);

  function toggleMaterial(value) {
    setMaterials((prev) => (prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]));
    setPage(1);
  }

  function toggleStyle(value) {
    setStyles((prev) => (prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]));
    setPage(1);
  }

  function clearFilters() {
    setCategorySlug("all");
    setMaterials([]);
    setStyles([]);
    setColour(null);
    setFeaturedOnly(false);
    setPage(1);
  }

  return (
    <section className="bg-bh-warm-white pb-12 md:pb-16">
      <PageContainer className="pt-2">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Furniture" }]} className="mb-4" />
        <div className="mb-8">
          <h2 className="font-display text-2xl font-semibold text-bh-charcoal md:text-3xl">All Furniture</h2>
          <p className="mt-2 text-sm text-bh-muted md:text-base">
            Discover our complete range of furniture for every corner of your home.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[17.5rem_1fr]">
          <aside className="hidden lg:block">
            <div className="sticky top-[calc(var(--bh-site-header-offset)+1rem)] rounded-2xl p-5 bh-glass-panel md:rounded-3xl md:p-6">
              <h3 className="font-display text-lg font-semibold text-bh-charcoal">Filters</h3>

              <div className="mt-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-bh-muted">Categories</p>
                <ul className="mt-2 space-y-1">
                  <li>
                    <button
                      type="button"
                      onClick={() => {
                        setCategorySlug("all");
                        setPage(1);
                      }}
                      className={cn(
                        "flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm font-medium transition bh-focus-ring",
                        categorySlug === "all"
                          ? "bg-bh-green text-white shadow-[0_6px_16px_rgba(27,61,47,0.18)]"
                          : "text-bh-muted hover:bg-bh-sage-muted/80 hover:text-bh-charcoal",
                      )}
                    >
                      <span>All Furniture</span>
                      <span className="text-xs opacity-80">({products.length})</span>
                    </button>
                  </li>
                  {categories.map((cat) => (
                    <li key={cat.slug}>
                      <button
                        type="button"
                        onClick={() => {
                          setCategorySlug(cat.slug);
                          setPage(1);
                        }}
                        className={cn(
                          "flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm font-medium transition bh-focus-ring",
                          categorySlug === cat.slug
                            ? "bg-bh-sage text-bh-green shadow-[0_4px_14px_rgba(27,61,47,0.08)]"
                            : "text-bh-muted hover:bg-bh-sage-muted/80 hover:text-bh-charcoal",
                        )}
                      >
                        <span>{cat.name}</span>
                        <span className="text-xs opacity-70">({countBySlug[cat.slug] ?? 0})</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6">
                <p className="text-xs font-semibold uppercase tracking-wide text-bh-muted">Material</p>
                <div className="mt-2 space-y-0.5">
                  {FILTER_MATERIALS.map((m) => (
                    <Checkbox
                      key={m}
                      variant="filter"
                      id={`furn-mat-${m}`}
                      label={m}
                      checked={materials.includes(m)}
                      onChange={() => toggleMaterial(m)}
                    />
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <p className="text-xs font-semibold uppercase tracking-wide text-bh-muted">Colour</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {FILTER_COLOURS.map((swatch) => (
                    <button
                      key={swatch.label}
                      type="button"
                      onClick={() => {
                        setColour(colour === swatch.label ? null : swatch.label);
                        setPage(1);
                      }}
                      className={cn(
                        "h-8 w-8 rounded-full shadow-[0_4px_12px_rgba(27,61,47,0.1)] bh-focus-ring",
                        colour === swatch.label && "ring-2 ring-bh-green/45 ring-offset-2",
                      )}
                      style={{ backgroundColor: swatch.hex }}
                      aria-label={swatch.label}
                    />
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <p className="text-xs font-semibold uppercase tracking-wide text-bh-muted">Style</p>
                <div className="mt-2 space-y-0.5">
                  {FILTER_STYLES.map((s) => (
                    <Checkbox
                      key={s}
                      variant="filter"
                      id={`furn-style-${s}`}
                      label={s}
                      checked={styles.includes(s)}
                      onChange={() => toggleStyle(s)}
                    />
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <p className="text-xs font-semibold uppercase tracking-wide text-bh-muted">Availability</p>
                <div className="mt-2">
                  <Checkbox
                    variant="filter"
                    id="furn-featured"
                    label="Featured only"
                    checked={featuredOnly}
                    onChange={(e) => {
                      setFeaturedOnly(e.target.checked);
                      setPage(1);
                    }}
                  />
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-2">
                <button
                  type="button"
                  className="h-10 rounded-full bg-bh-green text-sm font-semibold text-white shadow-[0_8px_22px_rgba(27,61,47,0.2)] bh-focus-ring"
                  onClick={() => setPage(1)}
                >
                  Apply Filters
                </button>
                <button type="button" onClick={clearFilters} className="text-sm font-medium text-bh-muted bh-focus-ring">
                  Clear All
                </button>
              </div>
            </div>
          </aside>

          <div>
            <FurniturePromoBanner />

            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-bh-muted">
                Showing {start} – {end} of {filtered.length} products
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <label className="flex items-center gap-2 text-sm text-bh-muted">
                  Sort by:
                  <Select
                    id="furniture-sort"
                    value={sort}
                    onChange={(e) => {
                      setSort(e.target.value);
                      setPage(1);
                    }}
                    className="h-9 min-w-[8.5rem] rounded-full text-sm"
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
                      !dense && "bg-bh-sage text-bh-green",
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
                      dense && "bg-bh-sage text-bh-green",
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
                cardVariant="home"
                className={dense ? "lg:grid-cols-3" : undefined}
              />
            ) : (
              <p className="rounded-2xl p-10 text-center text-sm text-bh-muted bh-glass-panel md:rounded-3xl">
                No products match your filters. Try clearing filters or browse all furniture.
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
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
