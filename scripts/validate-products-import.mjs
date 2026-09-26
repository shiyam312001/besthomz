import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const file = path.join(ROOT, "data", "products-import.json");
const products = JSON.parse(fs.readFileSync(file, "utf8"));

const allowedCategories = new Set([
  "Dining Table",
  "Dining Chair",
  "Dressing Table",
  "Bed",
  "Mattress",
  "Sofa",
  "Office Chair",
  "Office Table",
]);

const slugs = new Set();
const errors = [];

for (const p of products) {
  if (p.mapping_confidence === "LOW") errors.push(`${p.slug}: LOW confidence`);
  if (!p.slug || slugs.has(p.slug)) errors.push(`Duplicate or missing slug: ${p.slug}`);
  slugs.add(p.slug);
  if (!allowedCategories.has(p.category)) errors.push(`${p.slug}: invalid category ${p.category}`);
  if (!p.source_url?.startsWith("https://besthomz.in/")) errors.push(`${p.slug}: invalid source_url`);
  if (!p.images?.length) errors.push(`${p.slug}: no images`);
  if (!p.images?.[0]?.image_url?.startsWith("/BestHomz/products/")) {
    errors.push(`${p.slug}: image path invalid`);
  }
}

if (errors.length) {
  console.error("Validation failed:\n", errors.join("\n"));
  process.exit(1);
}

console.log(`Validated ${products.length} products OK.`);
