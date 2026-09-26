/**
 * Import verified products from data/products-import.json into Supabase.
 * Requires .env.local with NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY
 *
 * Run: node scripts/import-products.js
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createClient } from "@supabase/supabase-js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");

function loadEnvLocal() {
  const envPath = path.join(ROOT, ".env.local");
  if (!fs.existsSync(envPath)) return {};
  const out = {};
  for (const line of fs.readFileSync(envPath, "utf8").split("\n")) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const i = t.indexOf("=");
    if (i === -1) continue;
    out[t.slice(0, i).trim()] = t.slice(i + 1).trim().replace(/^["']|["']$/g, "");
  }
  return out;
}

const env = { ...process.env, ...loadEnvLocal() };
const url = env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceKey) {
  console.error(
    "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local — import skipped.",
  );
  process.exit(0);
}

const supabase = createClient(url, serviceKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});

const products = JSON.parse(
  fs.readFileSync(path.join(ROOT, "data", "products-import.json"), "utf8"),
);

async function getCategoryMap() {
  const { data, error } = await supabase.from("categories").select("id, name, slug");
  if (error) throw error;
  const byName = new Map(data.map((c) => [c.name, c.id]));
  return byName;
}

async function upsertProduct(row, categoryId) {
  const payload = {
    slug: row.slug,
    name: row.name,
    short_description: row.short_description,
    description: row.description,
    category_id: categoryId,
    subcategory_id: null,
    brand: "BEST HOMZ",
    status: row.status || "active",
    is_featured: row.is_featured,
    is_new: row.is_new,
    is_bestseller: row.is_bestseller,
    is_customizable: row.is_customizable,
    is_quote_enabled: row.is_quote_enabled,
    warranty: null,
    care_instructions: null,
    dimensions: null,
    material_summary: null,
  };

  const { data, error } = await supabase
    .from("products")
    .upsert(payload, { onConflict: "slug" })
    .select("id, slug")
    .single();

  if (error) throw error;
  return data;
}

async function replaceImages(productId, images) {
  await supabase.from("product_images").delete().eq("product_id", productId);

  const rows = images.map((img) => ({
    product_id: productId,
    image_url: img.image_url,
    alt_text: null,
    image_type: img.image_type || "primary",
    sort_order: img.sort_order ?? 1,
    is_primary: img.is_primary ?? false,
  }));

  const { error } = await supabase.from("product_images").insert(rows);
  if (error) throw error;
}

async function main() {
  const categoryMap = await getCategoryMap();
  let imported = 0;

  for (const row of products) {
    if (row.mapping_confidence !== "HIGH") continue;

    const categoryId = categoryMap.get(row.category);
    if (!categoryId) {
      console.warn(`Skip ${row.slug}: unknown category ${row.category}`);
      continue;
    }

    const product = await upsertProduct(row, categoryId);
    await replaceImages(product.id, row.images);
    imported += 1;
  }

  console.log(`Imported ${imported} products into Supabase.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
