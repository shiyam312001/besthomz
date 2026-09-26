/**
 * Apply marketing names, descriptions, specs, and besthomz.in gallery URLs.
 * Run: node scripts/enrich-products.mjs
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { enrichImportProduct } from "../lib/catalog/product-enrichment.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const importPath = path.join(ROOT, "data", "products-import.json");
const inventoryPath = path.join(ROOT, "data", "catalog-inventory.json");

const products = JSON.parse(fs.readFileSync(importPath, "utf8")).map(enrichImportProduct);

fs.writeFileSync(importPath, JSON.stringify(products, null, 2));

if (fs.existsSync(inventoryPath)) {
  const inv = JSON.parse(fs.readFileSync(inventoryPath, "utf8"));
  inv.generated_at = new Date().toISOString();
  inv.products = products;
  fs.writeFileSync(inventoryPath, JSON.stringify(inv, null, 2));
}

console.log(`Enriched ${products.length} products`);
