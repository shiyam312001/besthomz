import { cn } from "@/lib/cn";

function buildProductSpecRows(product, specs) {
  const rows = [];
  const add = (name, value) => {
    const text = String(value ?? "").trim();
    if (!text || rows.some((row) => row.name.toLowerCase() === name.toLowerCase())) return;
    rows.push({ name, value: text });
  };

  add("Product Type", product.categories?.name || product.category_name || product.category);
  add("Material", product.material_summary);
  add("Dimensions", product.dimensions);
  add("Warranty", product.warranty);
  add("Care Instructions", product.care_instructions);
  for (const spec of specs) add(spec.specification_name, spec.specification_value);
  add("SKU", product.sku);

  return rows;
}

export function ProductDescSpecs({ product, specs = [] }) {
  const specRows = buildProductSpecRows(product, specs);

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
