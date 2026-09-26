"use client";

import Link from "next/link";
import { RotateCcw } from "lucide-react";
import { Checkbox } from "@/components/ui/Checkbox";
import { cn } from "@/lib/cn";
import {
  FILTER_COLOURS,
  FILTER_MATERIALS,
  FILTER_STYLES,
} from "@/components/furniture/category/category-data";

function FilterGroup({ title, defaultOpen = true, children }) {
  return (
    <details open={defaultOpen} className="group border-t border-black/[0.04] pt-4 first:border-t-0 first:pt-0">
      <summary
        className="flex cursor-pointer list-none items-center justify-between text-xs font-semibold uppercase tracking-wide text-bh-muted bh-focus-ring [&::-webkit-details-marker]:hidden"
      >
        {title}
        <span className="text-bh-muted/80 transition group-open:rotate-180">▾</span>
      </summary>
      <div className="mt-3">{children}</div>
    </details>
  );
}

export function CategoryFilterAside({
  currentSlug,
  categories = [],
  seatingFilters = [],
  seating,
  setSeating,
  styles,
  setStyles,
  materials,
  setMaterials,
  colour,
  setColour,
  onToggleList,
  onClear,
  productCount,
}) {
  const siblings = categories.filter((c) => c.slug !== currentSlug);

  return (
    <div className="sticky top-[calc(var(--bh-site-header-offset)+1rem)] space-y-4">
      <div className="rounded-2xl px-5 py-5 bh-glass-panel md:rounded-3xl md:px-6 md:py-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-bh-muted">Showing</p>
        <p className="mt-1 font-display text-2xl font-semibold text-bh-charcoal">{productCount}</p>
        <p className="text-sm text-bh-muted">products in this view</p>
      </div>

      <div className="rounded-2xl px-5 py-5 bh-glass-panel md:rounded-3xl md:px-6 md:py-6">
        <h3 className="font-display text-lg font-semibold text-bh-charcoal">Filter By</h3>

        <div className="mt-5 space-y-4">
          {categories.length > 0 && (
            <FilterGroup title="Category">
              <ul className="space-y-0.5">
                <li>
                  <Link
                    href="/furniture"
                    className="flex items-center justify-between rounded-xl px-2.5 py-2 text-sm font-medium text-bh-muted transition hover:bg-bh-sage-muted/55 hover:text-bh-charcoal bh-focus-ring"
                  >
                    All Furniture
                  </Link>
                </li>
                {categories.map((cat) => {
                  const active = cat.slug === currentSlug;
                  return (
                    <li key={cat.slug}>
                      <Link
                        href={`/furniture/${cat.slug}`}
                        className={cn(
                          "flex items-center justify-between rounded-xl px-2.5 py-2 text-sm font-medium transition bh-focus-ring",
                          active
                            ? "bg-bh-sage text-bh-green shadow-[0_4px_14px_rgba(27,61,47,0.08)]"
                            : "text-bh-muted hover:bg-bh-sage-muted/55 hover:text-bh-charcoal",
                        )}
                      >
                        <span>{cat.name}</span>
                        {active && <span className="text-xs opacity-80">•</span>}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </FilterGroup>
          )}

          {seatingFilters.length > 0 && (
            <FilterGroup title="Seating Capacity">
              <div className="space-y-0.5">
                {seatingFilters.map((label) => (
                  <Checkbox
                    key={label}
                    variant="filter"
                    id={`cat-seat-${label}`}
                    label={label}
                    checked={seating.includes(label)}
                    onChange={() => onToggleList(setSeating, label)}
                  />
                ))}
              </div>
            </FilterGroup>
          )}

          <FilterGroup title="Style">
            <div className="space-y-0.5">
              {FILTER_STYLES.map((s) => (
                <Checkbox
                  key={s}
                  variant="filter"
                  id={`cat-style-${s}`}
                  label={s}
                  checked={styles.includes(s)}
                  onChange={() => onToggleList(setStyles, s)}
                />
              ))}
            </div>
          </FilterGroup>

          <FilterGroup title="Material">
            <div className="space-y-0.5">
              {FILTER_MATERIALS.map((m) => (
                <Checkbox
                  key={m}
                  variant="filter"
                  id={`cat-mat-${m}`}
                  label={m}
                  checked={materials.includes(m)}
                  onChange={() => onToggleList(setMaterials, m)}
                />
              ))}
            </div>
          </FilterGroup>

          <FilterGroup title="Colour">
            <div className="flex flex-wrap gap-2.5">
              {FILTER_COLOURS.map((swatch) => (
                <button
                  key={swatch.label}
                  type="button"
                  onClick={() => setColour(colour === swatch.label ? null : swatch.label)}
                  className={cn(
                    "h-8 w-8 rounded-full shadow-[0_4px_12px_rgba(27,61,47,0.1)] bh-focus-ring",
                    colour === swatch.label && "ring-2 ring-bh-green/45 ring-offset-2 ring-offset-white/80",
                  )}
                  style={{ backgroundColor: swatch.hex }}
                  aria-label={swatch.label}
                />
              ))}
            </div>
          </FilterGroup>
        </div>

        <button
          type="button"
          onClick={onClear}
          className="mt-6 flex h-11 w-full items-center justify-center gap-2 rounded-full text-sm font-semibold text-bh-charcoal shadow-[0_6px_18px_rgba(27,61,47,0.07)] bh-glass-panel bh-focus-ring"
        >
          <RotateCcw className="h-4 w-4 text-bh-green" aria-hidden />
          Clear Filters
        </button>
      </div>
    </div>
  );
}
