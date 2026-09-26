import { createClientOptional } from "@/lib/supabase/server";
import * as productService from "@/lib/services/products";
import { importProductsToRecords, loadProductsImport } from "@/lib/catalog/load-import";
import { sortProducts } from "@/lib/utils/product-helpers";

function paginate(list, { limit = 24, offset = 0 } = {}) {
  return list.slice(offset, offset + limit);
}

function importRecordForSlug(slug) {
  return importProductsToRecords().find((p) => p.slug === slug);
}

/** Prefer enriched local catalog (4 gallery images, copy) when DB rows are stale. */
function mergeWithImportCatalog(dbProduct, importProduct) {
  if (!importProduct) return dbProduct;

  const dbImageCount = dbProduct.product_images?.length ?? 0;
  const importImageCount = importProduct.product_images?.length ?? 0;
  const useImportImages = importImageCount >= 4 || importImageCount > dbImageCount;

  return {
    ...dbProduct,
    name: importProduct.name || dbProduct.name,
    short_description: importProduct.short_description || dbProduct.short_description,
    description: importProduct.description || dbProduct.description,
    product_images: useImportImages ? importProduct.product_images : dbProduct.product_images,
    product_specifications:
      importProduct.product_specifications?.length > 0
        ? importProduct.product_specifications
        : dbProduct.product_specifications,
    material_summary: importProduct.material_summary ?? dbProduct.material_summary,
    warranty: importProduct.warranty ?? dbProduct.warranty,
    care_instructions: importProduct.care_instructions ?? dbProduct.care_instructions,
    dimensions: importProduct.dimensions ?? dbProduct.dimensions,
  };
}

export async function fetchActiveProducts(options = {}) {
  const supabase = await createClientOptional();
  if (supabase) {
    const { data, error } = await productService.getActiveProducts(supabase, options);
    if (!error && data?.length) return data;
  }
  return paginate(importProductsToRecords(), options);
}

export async function fetchProductBySlug(slug) {
  const importProduct = importRecordForSlug(slug);
  const supabase = await createClientOptional();
  if (supabase) {
    const { data, error } = await productService.getProductBySlug(supabase, slug);
    if (!error && data) return mergeWithImportCatalog(data, importProduct);
  }
  if (!importProduct) return null;
  return importProduct;
}

export async function fetchProductsByCategorySlug(categorySlug, options = {}) {
  const supabase = await createClientOptional();
  if (supabase) {
    const { data, error } = await productService.getProductsByCategorySlug(
      supabase,
      categorySlug,
      options,
    );
    if (!error && data?.length) return data;
  }
  const slugMap = {
    "dining-tables": "Dining Table",
    "dining-chairs": "Dining Chair",
    "dressing-tables": "Dressing Table",
    beds: "Bed",
    mattresses: "Mattress",
    sofas: "Sofa",
    "office-chairs": "Office Chair",
    "office-tables": "Office Table",
  };
  const catName = slugMap[categorySlug];
  const filtered = importProductsToRecords().filter(
    (p) => p.categories?.slug === categorySlug || p.category_name === catName,
  );
  return paginate(filtered, options);
}

export async function fetchFeaturedProducts(limit = 8) {
  const products = await fetchActiveProducts({ limit: 48 });
  const featured = products.filter((p) => p.is_featured);
  return (featured.length ? featured : products).slice(0, limit);
}

export async function searchProducts(query) {
  const q = (query || "").trim().toLowerCase();
  if (!q) return [];
  const products = await fetchActiveProducts({ limit: 200 });
  return products.filter(
    (p) =>
      p.name?.toLowerCase().includes(q) ||
      p.short_description?.toLowerCase().includes(q) ||
      p.categories?.name?.toLowerCase().includes(q) ||
      p.category_name?.toLowerCase().includes(q),
  );
}

export async function fetchRelatedProducts(product, limit = 4) {
  const categorySlug = product.categories?.slug;
  if (!categorySlug) return [];
  const siblings = await fetchProductsByCategorySlug(categorySlug, { limit: 12 });
  return siblings.filter((p) => p.slug !== product.slug).slice(0, limit);
}

export { sortProducts };
