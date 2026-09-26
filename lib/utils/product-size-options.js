import { PDP_SIZES } from "@/components/product/product-pdp-data";

const BY_CATEGORY_SLUG = {
  sofas: PDP_SIZES,
  beds: ["Single", "Queen", "King", "Custom Size"],
  mattresses: ["Single", "Queen", "King", "Custom Size"],
  "dining-tables": ["4 Seater", "6 Seater", "8 Seater", "Custom Size"],
  "dining-chairs": ["Standard", "Armchair", "Counter Height", "Custom"],
  "dressing-tables": ["Standard", "Wide", "With Mirror", "Custom"],
  "office-chairs": ["Standard", "High Back", "Ergonomic", "Custom"],
  "office-tables": ["120 cm", "140 cm", "160 cm", "Custom Size"],
};

function categorySlugFromProduct(product, category) {
  if (category?.slug) return category.slug;
  const name = (category?.name || product?.category_name || product?.categories?.name || "").toLowerCase();
  if (name.includes("sofa")) return "sofas";
  if (name.includes("mattress")) return "mattresses";
  if (name.includes("dining table")) return "dining-tables";
  if (name.includes("dining chair")) return "dining-chairs";
  if (name.includes("dressing")) return "dressing-tables";
  if (name.includes("office chair")) return "office-chairs";
  if (name.includes("office table")) return "office-tables";
  if (name.includes("bed")) return "beds";
  return null;
}

export function getProductSizeOptions(product, category) {
  const slug = categorySlugFromProduct(product, category);
  if (slug && BY_CATEGORY_SLUG[slug]) return BY_CATEGORY_SLUG[slug];

  const name = `${product?.name || ""} ${product?.material_summary || ""}`.toLowerCase();
  if (/sofa|seater|l\s*shape|u\s*shape|recliner/.test(name)) return PDP_SIZES;
  if (/mattress/.test(name)) return BY_CATEGORY_SLUG.mattresses;
  if (/dining table|seater dining/.test(name)) return BY_CATEGORY_SLUG["dining-tables"];
  if (/chair/.test(name)) return BY_CATEGORY_SLUG["dining-chairs"];
  if (/desk|office table/.test(name)) return BY_CATEGORY_SLUG["office-tables"];

  return ["Standard", "Medium", "Large", "Custom"];
}

export function getDefaultProductSize(product, options) {
  if (!options?.length) return "Standard";
  const hay = (product?.name || "").toLowerCase();

  const patterns = [
    { re: /l\s*[- ]?shape/, pick: (opts) => opts.find((o) => /l shape/i.test(o)) },
    { re: /u\s*[- ]?shape/, pick: (opts) => opts.find((o) => /u shape/i.test(o)) },
    { re: /(\d+)\s*seater/, pick: (opts, m) => opts.find((o) => o.toLowerCase().includes(`${m[1]} seater`)) },
    { re: /\bking\b/, pick: (opts) => opts.find((o) => /king/i.test(o)) },
    { re: /\bqueen\b/, pick: (opts) => opts.find((o) => /queen/i.test(o)) },
    { re: /\bsingle\b/, pick: (opts) => opts.find((o) => /single/i.test(o)) },
    { re: /\b6\s*seater|\bsix\b/, pick: (opts) => opts.find((o) => /6 seater/i.test(o)) },
    { re: /\b4\s*seater|\bfour\b/, pick: (opts) => opts.find((o) => /4 seater/i.test(o)) },
  ];

  for (const { re, pick } of patterns) {
    const m = hay.match(re);
    if (m) {
      const found = pick(options, m);
      if (found) return found;
    }
  }

  return options[1] ?? options[0];
}
