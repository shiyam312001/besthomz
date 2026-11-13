/**
 * Sync the CSV-driven catalog and categories into Supabase.
 * Requires NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createClient } from "@supabase/supabase-js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const BATCH_SIZE = 100;

function loadEnvLocal() {
  const envPath = path.join(ROOT, ".env.local");
  if (!fs.existsSync(envPath)) return {};
  const out = {};
  for (const line of fs.readFileSync(envPath, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const i = trimmed.indexOf("=");
    if (i === -1) continue;
    out[trimmed.slice(0, i).trim()] = trimmed.slice(i + 1).trim().replace(/^["']|["']$/g, "");
  }
  return out;
}

const env = { ...process.env, ...loadEnvLocal() };
const url = env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceKey) {
  console.error("Missing Supabase URL or service-role key; catalog sync was not run.");
  process.exit(1);
}

const supabase = createClient(url, serviceKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});
const products = JSON.parse(
  fs.readFileSync(path.join(ROOT, "data", "products-import.json"), "utf8"),
);

function batches(items, size = BATCH_SIZE) {
  const result = [];
  for (let i = 0; i < items.length; i += size) result.push(items.slice(i, i + size));
  return result;
}

function categoriesFromProducts() {
  const categories = new Map();
  for (const product of products) {
    if (!product.category || !product.category_slug) {
      throw new Error(`Missing category for product ${product.slug}`);
    }

    if (!categories.has(product.category_slug)) {
      categories.set(product.category_slug, {
        name: product.category,
        slug: product.category_slug,
        image_url: product.images?.find((image) => image.is_primary)?.image_url || null,
        is_active: true,
        sort_order: categories.size + 1,
      });
    }
  }
  return [...categories.values()];
}

async function upsertCategories() {
  const rows = categoriesFromProducts();
  const { data, error } = await supabase
    .from("categories")
    .upsert(rows, { onConflict: "slug" })
    .select("id, slug");
  if (error) throw error;
  return new Map(data.map((category) => [category.slug, category.id]));
}

async function getAllProducts() {
  const result = [];
  for (let offset = 0; ; offset += 500) {
    const { data, error } = await supabase
      .from("products")
      .select("id, slug, sku, status")
      .order("id", { ascending: true })
      .range(offset, offset + 499);
    if (error) throw error;
    result.push(...data);
    if (data.length < 500) return result;
  }
}

function buildProductPayloads(categoryMap, existingProducts) {
  const skuCounts = new Map();
  for (const product of products) {
    if (product.sku) skuCounts.set(product.sku, (skuCounts.get(product.sku) || 0) + 1);
  }

  const existingSkuOwner = new Map(
    existingProducts.filter((product) => product.sku).map((product) => [product.sku, product.slug]),
  );

  return products.map((product) => {
    const categoryId = categoryMap.get(product.category_slug);
    if (!categoryId) throw new Error(`Category sync did not return ${product.category_slug}`);

    const hasDuplicateSku = skuCounts.get(product.sku) > 1;
    const skuOwner = existingSkuOwner.get(product.sku);
    const skuConflictsWithOldSlug = skuOwner && skuOwner !== product.slug;
    const dimensions =
      typeof product.dimensions === "string" && product.dimensions.trim()
        ? { value: product.dimensions }
        : product.dimensions || null;

    return {
      slug: product.slug,
      name: product.name,
      short_description: product.short_description,
      description: product.description,
      seo_title: product.seo_title || null,
      seo_description: product.seo_description || null,
      category_id: categoryId,
      subcategory_id: null,
      brand: product.brand || "HTC Furniture",
      sku: hasDuplicateSku || skuConflictsWithOldSlug ? null : product.sku,
      status: product.mapping_confidence === "HIGH" ? "active" : "draft",
      is_featured: product.is_featured,
      is_new: product.is_new,
      is_bestseller: product.is_bestseller,
      is_customizable: product.is_customizable,
      is_quote_enabled: product.is_quote_enabled,
      warranty: product.warranty,
      care_instructions: product.care_instructions,
      dimensions,
      material_summary: product.material_summary,
      source_folder: product.source_folders?.join("; ") || null,
    };
  });
}

async function upsertProducts(payloads) {
  const idsBySlug = new Map();
  for (const chunk of batches(payloads)) {
    const { data, error } = await supabase
      .from("products")
      .upsert(chunk, { onConflict: "slug" })
      .select("id, slug");
    if (error) throw error;
    for (const product of data) idsBySlug.set(product.slug, product.id);
  }
  if (idsBySlug.size !== products.length) {
    throw new Error(`Synced ${idsBySlug.size} of ${products.length} products`);
  }
  return idsBySlug;
}

async function replaceChildRows(table, rows, productIds) {
  for (const ids of batches(productIds)) {
    const { error } = await supabase.from(table).delete().in("product_id", ids);
    if (error) throw error;
  }
  for (const chunk of batches(rows, 500)) {
    if (!chunk.length) continue;
    const { error } = await supabase.from(table).insert(chunk);
    if (error) throw error;
  }
}

async function replaceImages(idsBySlug) {
  const rows = [];
  for (const product of products) {
    const productId = idsBySlug.get(product.slug);
    for (const image of product.images || []) {
      rows.push({
        product_id: productId,
        image_url: image.image_url,
        alt_text: product.name,
        image_type: image.image_type || "gallery",
        sort_order: image.sort_order ?? 1,
        is_primary: image.is_primary ?? false,
      });
    }
  }
  await replaceChildRows("product_images", rows, [...idsBySlug.values()]);
}

async function replaceFeatures(idsBySlug) {
  const rows = [];
  for (const product of products) {
    for (const [index, feature] of (product.features || []).entries()) {
      rows.push({
        product_id: idsBySlug.get(product.slug),
        feature: feature.feature || feature.title,
        description: feature.description || null,
        sort_order: index + 1,
      });
    }
  }
  await replaceChildRows("product_features", rows, [...idsBySlug.values()]);
}

async function replaceSpecifications(idsBySlug) {
  const rows = [];
  for (const product of products) {
    for (const [index, specification] of (product.specifications || []).entries()) {
      rows.push({
        product_id: idsBySlug.get(product.slug),
        specification_name: specification.specification_name,
        specification_value: specification.specification_value,
        sort_order: index + 1,
      });
    }
  }
  await replaceChildRows("product_specifications", rows, [...idsBySlug.values()]);
}

async function deactivateObsoleteProducts(currentSlugs, existingProducts) {
  const obsoleteIds = existingProducts
    .filter((product) => product.status === "active" && !currentSlugs.has(product.slug))
    .map((product) => product.id);
  for (const ids of batches(obsoleteIds)) {
    const { error } = await supabase
      .from("products")
      .update({ status: "inactive" })
      .in("id", ids);
    if (error) throw error;
  }
  return obsoleteIds.length;
}

async function main() {
  if (!products.length) throw new Error("The generated catalog is empty; refusing to sync.");
  const existingProducts = await getAllProducts();
  const categoryMap = await upsertCategories();
  const payloads = buildProductPayloads(categoryMap, existingProducts);
  const idsBySlug = await upsertProducts(payloads);

  await replaceImages(idsBySlug);
  await replaceFeatures(idsBySlug);
  await replaceSpecifications(idsBySlug);

  const deactivated = await deactivateObsoleteProducts(
    new Set(products.map((product) => product.slug)),
    existingProducts,
  );

  console.log(
    `Synced ${idsBySlug.size} products and ${categoryMap.size} categories; deactivated ${deactivated} obsolete products.`,
  );
}

main().catch((error) => {
  console.error("Catalog sync failed:", error.message);
  process.exit(1);
});
