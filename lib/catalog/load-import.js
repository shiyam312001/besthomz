import fs from "fs";
import path from "path";

let cache;
let cacheMtime = 0;

export function loadProductsImport() {
  const file = path.join(process.cwd(), "data", "products-import.json");
  const mtime = fs.statSync(file).mtimeMs;
  if (cache && mtime === cacheMtime) return cache;
  cache = JSON.parse(fs.readFileSync(file, "utf8"));
  cacheMtime = mtime;
  return cache;
}

export function importProductsToRecords() {
  return loadProductsImport().map((p, index) => ({
    id: `import-${p.slug}`,
    slug: p.slug,
    name: p.name,
    short_description: p.short_description,
    description: p.description,
    category_id: null,
    category_name: p.category,
    categories: { name: p.category, slug: categorySlugFromName(p.category) },
    is_featured: p.is_featured,
    is_new: p.is_new,
    is_bestseller: p.is_bestseller,
    is_customizable: p.is_customizable,
    is_quote_enabled: p.is_quote_enabled,
    status: p.status,
    product_images: (p.images || []).map((img, i) => ({
      image_url:
        typeof img.image_url === "string" && img.image_url.startsWith("/")
          ? img.image_url
          : img.image_url || img.remote_url,
      alt_text: p.name,
      is_primary: img.is_primary ?? i === 0,
      sort_order: img.sort_order ?? i + 1,
      image_type: img.image_type || (i === 0 ? "primary" : "gallery"),
    })),
    product_features: (p.features || []).map((f) => ({
      feature: f.feature || f.title,
      description: f.description,
    })),
    product_specifications: (p.specifications || []).map((s) => ({
      specification_name: s.specification_name,
      specification_value: s.specification_value,
    })),
    product_variants: [],
    material_summary: p.material_summary || null,
    warranty: p.warranty || null,
    care_instructions: p.care_instructions || null,
    dimensions: p.dimensions || null,
    _sortIndex: index,
  }));
}

function categorySlugFromName(name) {
  const map = {
    "Dining Table": "dining-tables",
    "Dining Chair": "dining-chairs",
    "Dressing Table": "dressing-tables",
    Bed: "beds",
    Mattress: "mattresses",
    Sofa: "sofas",
    "Office Chair": "office-chairs",
    "Office Table": "office-tables",
  };
  return map[name] || name.toLowerCase().replace(/\s+/g, "-");
}
