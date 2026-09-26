"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchProductsBySlugs } from "@/app/actions/products";
import { getCompareProducts, removeCompareProduct } from "@/lib/commerce/client-storage";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";

function featureSummary(p) {
  const feats = p.product_features || p.features;
  if (!feats?.length) return null;
  return feats.map((f) => f.feature || f).join(", ");
}

function specSummary(p) {
  const specs = p.product_specifications || p.specifications;
  if (!specs?.length) return null;
  return specs.map((s) => `${s.specification_name}: ${s.specification_value}`).join("; ");
}

const FIELDS = [
  { key: "name", label: "Product" },
  { key: "category", label: "Category" },
  { key: "description", label: "Description" },
  { key: "features", label: "Features", get: featureSummary },
  { key: "specifications", label: "Specifications", get: specSummary },
  { key: "material_summary", label: "Material", get: (p) => p.material_summary },
  { key: "is_customizable", label: "Customization", get: (p) => (p.is_customizable ? "Available" : null) },
];

export function CompareView() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const slugs = getCompareProducts().map((p) => p.slug);
    if (!slugs.length) return;
    fetchProductsBySlugs(slugs).then(setProducts);
  }, []);

  if (!products.length) {
    return (
      <EmptyState
        title="Nothing to compare"
        description="Add up to 4 products from product pages to compare specifications side by side."
        actionHref="/furniture"
        actionLabel="Browse furniture"
      />
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse text-sm">
        <thead>
          <tr>
            <th className="border-b border-bh-border p-3 text-left">Field</th>
            {products.map((p) => (
              <th key={p.slug} className="border-b border-bh-border p-3 text-left font-display">
                <Link href={p.href} className="text-bh-green underline">{p.name}</Link>
                <Button
                  size="sm"
                  variant="outline"
                  className="mt-2"
                  onClick={() => {
                    removeCompareProduct(p.slug);
                    setProducts((prev) => prev.filter((x) => x.slug !== p.slug));
                  }}
                >
                  Remove
                </Button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {FIELDS.map((field) => (
            <tr key={field.key}>
              <td className="border-b border-bh-border/60 p-3 font-medium">{field.label}</td>
              {products.map((p) => {
                const val = field.get ? field.get(p) : p[field.key];
                return (
                  <td key={p.slug} className="border-b border-bh-border/60 p-3 text-bh-muted">
                    {val || "Not specified"}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
