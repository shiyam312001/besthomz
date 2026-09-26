import { cn } from "@/lib/cn";

function buildDefaultSpecs(product) {
  const rows = [];
  if (product.categories?.name) rows.push({ name: "Product Type", value: product.categories.name });
  if (product.material_summary) rows.push({ name: "Material", value: product.material_summary });
  if (product.dimensions) rows.push({ name: "Dimensions", value: product.dimensions });
  if (product.warranty) rows.push({ name: "Warranty", value: product.warranty });
  if (product.care_instructions) rows.push({ name: "Care Instructions", value: product.care_instructions });
  rows.push({ name: "Style", value: "Modern" });
  rows.push({ name: "Colour Options", value: "Multiple finishes available" });
  return rows;
}

export function ProductDescSpecs({ product, specs = [] }) {
  const specRows =
    specs.length > 0
      ? specs.map((s) => ({ name: s.specification_name, value: s.specification_value }))
      : buildDefaultSpecs(product);

  const raw = product.description || product.short_description || "";
  const paragraphs = raw
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <section className="mt-12 grid gap-8 lg:grid-cols-2 lg:gap-10 md:mt-16">
      <div className="rounded-2xl p-6 bh-glass-panel md:rounded-3xl md:p-8">
        <h2 className="font-display text-2xl font-semibold text-bh-charcoal">Product Description</h2>
        {paragraphs.length > 0 ? (
          <div className="mt-4 space-y-4 text-sm leading-relaxed text-bh-muted md:text-base">
            {paragraphs.map((para) => (
              <p key={para.slice(0, 48)}>{para}</p>
            ))}
          </div>
        ) : (
          <p className="mt-4 text-sm text-bh-muted">Contact our team for full product details and customization options.</p>
        )}
      </div>
      <div className="rounded-2xl p-6 bh-glass-panel md:rounded-3xl md:p-8">
        <h2 className="font-display text-2xl font-semibold text-bh-charcoal">Product Specifications</h2>
        <dl className="mt-4 overflow-hidden rounded-2xl">
          {specRows.map((row, i) => (
            <div
              key={row.name}
              className={cn(
                "grid grid-cols-2 gap-4 px-4 py-3 text-sm",
                i % 2 === 0 ? "bg-bh-sage-muted/45" : "bg-white/50",
              )}
            >
              <dt className="font-medium text-bh-charcoal">{row.name}</dt>
              <dd className="text-bh-muted">{row.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
